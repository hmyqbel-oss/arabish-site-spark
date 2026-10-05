<?php
/**
 * =====================================================================
 *  odoo-bridge.php — وسيط طلبات الخدمة | أسس السلامة والعمارة (OSAEC)
 *  يستقبل الطلبات من الموقع وينشئها كفرص بيع (Leads) في Odoo CRM
 *
 *  مكان الرفع: المجلد الرئيسي للموقع على استضافة هوستنجر (بجانب index.html).
 *
 *  المطلوب من مبرمج أودو: تعبئة الإعدادات الأربعة أدناه فقط.
 *  ملاحظة: أثناء فراغ الإعدادات يرجع الوسيط code = not_configured
 *  والموقع يفتح واتساب تلقائياً كخطوة احتياطية — لن تضيع أي طلبات.
 * =====================================================================
 */

declare(strict_types=1);

/* ==================== الإعدادات — يملؤها مبرمج أودو ==================== */

// رابط أودو بدون شرطة مائلة في النهاية. مثال: https://mycompany.odoo.com
const ODOO_URL      = '';

// اسم قاعدة البيانات
const ODOO_DB       = '';

// مستخدم مخصص للربط (ليس حساباً شخصياً) — له صلاحية إنشاء سجلات في CRM فقط
const ODOO_USERNAME = '';

// مفتاح API الخاص بالمستخدم (أودو ← إعدادات الحساب ← الأمان ← مفتاح API جديد)
const ODOO_API_KEY  = '';

// قيمة "مصدر الطلب" في أودو للفلترة (تُنشأ تلقائياً إن لم تكن موجودة)
const ODOO_SOURCE_NAME = 'الموقع الإلكتروني';

// اسم فريق المبيعات (CRM Teams) لتحويل الطلبات إليه — اتركه فارغاً للتعطيل
const ODOO_TEAM_NAME   = '';

// بريد لإشعار فريق المبيعات عند كل طلب جديد — اتركه فارغاً للتعطيل
const NOTIFY_EMAIL     = '';

/* ==================== ثوابت النظام ==================== */

const LOG_DIR        = __DIR__ . '/odoo-logs';
const MAX_BODY_BYTES = 10000;
const RATE_LIMIT_MAX = 5;    // أقصى عدد طلبات من نفس الزائر
const RATE_WINDOW    = 900;  // خلال 15 دقيقة (بالثواني)

/* ==================== أدوات مساعدة ==================== */

function send_json(array $data, int $http = 200): void {
    http_response_code($http);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function ensure_log_dir(): void {
    if (!is_dir(LOG_DIR)) {
        @mkdir(LOG_DIR, 0750, true);
        // منع الوصول لملفات السجلات من المتصفح
        @file_put_contents(LOG_DIR . '/.htaccess', "Require all denied\nOrder allow,deny\nDeny from all\n");
        @file_put_contents(LOG_DIR . '/index.html', '');
    }
}

function append_log(string $file, array $data): void {
    ensure_log_dir();
    @file_put_contents(
        LOG_DIR . '/' . $file,
        json_encode($data, JSON_UNESCAPED_UNICODE) . "\n",
        FILE_APPEND | LOCK_EX
    );
}

function client_ip(): string {
    return $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}

function rate_limited(): bool {
    ensure_log_dir();
    $file = LOG_DIR . '/rate-' . md5(client_ip()) . '.json';
    $now = time();
    $stamps = [];
    if (is_file($file)) {
        $stamps = json_decode((string) @file_get_contents($file), true) ?: [];
    }
    $stamps = array_values(array_filter($stamps, static fn($t) => ($now - (int) $t) < RATE_WINDOW));
    if (count($stamps) >= RATE_LIMIT_MAX) return true;
    $stamps[] = $now;
    @file_put_contents($file, json_encode($stamps), LOCK_EX);
    return false;
}

/** استدعاء JSON-RPC لأودو — يعمل مع Odoo Online و Odoo.sh والسيرفر الخاص */
function odoo_call(string $service, string $method, array $args) {
    $ch = curl_init(rtrim(ODOO_URL, '/') . '/jsonrpc');
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => json_encode([
            'jsonrpc' => '2.0',
            'method'  => 'call',
            'params'  => ['service' => $service, 'method' => $method, 'args' => $args],
            'id'      => 1,
        ], JSON_UNESCAPED_UNICODE),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_TIMEOUT        => 25,
        CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
    ]);
    $raw  = curl_exec($ch);
    $err  = curl_error($ch);
    $http = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);

    if ($raw === false) throw new RuntimeException('تعذر الاتصال بأودو: ' . $err);
    $json = json_decode((string) $raw, true);
    if (!is_array($json)) throw new RuntimeException('رد غير صالح من أودو (HTTP ' . $http . ')');
    if (isset($json['error'])) {
        $msg = $json['error']['data']['message'] ?? json_encode($json['error'], JSON_UNESCAPED_UNICODE);
        throw new RuntimeException('خطأ من أودو: ' . $msg);
    }
    return $json['result'] ?? null;
}

/* ==================== التحقق من المدخلات ==================== */

function validate(array $in): array {
    $errors = [];

    $name = trim((string) ($in['name'] ?? ''));
    if ($name === '')        $errors['name'] = 'الاسم مطلوب';
    elseif (mb_strlen($name) < 3)  $errors['name'] = 'الاسم قصير جداً';
    elseif (mb_strlen($name) > 100) $errors['name'] = 'الاسم طويل جداً';

    $mobile = preg_replace('/\D/', '', (string) ($in['mobile'] ?? ''));
    if ($mobile === '' || !preg_match('/^05\d{8}$/', $mobile)) {
        $errors['mobile'] = 'رقم الجوال يجب أن يكون 10 أرقام ويبدأ بـ 05';
    }

    // البريد اختياري — يُتحقق منه فقط إن أُرسل
    $email = trim((string) ($in['email'] ?? ''));
    if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'صيغة البريد الإلكتروني غير صحيحة';
    }

    $message = trim((string) ($in['message'] ?? ''));
    if ($message === '')        $errors['message'] = 'وصف الطلب مطلوب';
    elseif (mb_strlen($message) > 1000) $errors['message'] = 'وصف الطلب طويل جداً';

    return [$errors, $name, $mobile, $email, $message];
}

/* ==================== التنفيذ ==================== */

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        send_json(['ok' => false, 'code' => 'method', 'message' => 'طريقة الطلب غير مدعومة'], 405);
    }

    if (rate_limited()) {
        send_json(['ok' => false, 'code' => 'rate_limited',
            'message' => 'تم إرسال عدة طلبات من جهازك — حاول مرة أخرى بعد قليل']);
    }

    $raw = file_get_contents('php://input');
    if (strlen((string) $raw) > MAX_BODY_BYTES) {
        send_json(['ok' => false, 'code' => 'too_large', 'message' => 'حجم الطلب كبير جداً'], 413);
    }
    $in = json_decode((string) $raw, true);
    if (!is_array($in)) $in = $_POST;

    // حقل الفخ ضد الروبوتات: يُملأ من الروبوتات فقط — نتظاهر بالنجاح ونتجاهل الطلب
    if (!empty($in['website'] ?? '')) {
        send_json(['ok' => true]);
    }

    [$errors, $name, $mobile, $email, $message] = validate(is_array($in) ? $in : []);
    if ($errors) {
        send_json(['ok' => false, 'code' => 'invalid', 'errors' => $errors,
            'message' => 'تحقق من البيانات المدخلة']);
    }

    $serviceName = trim((string) ($in['service_name'] ?? ''));
    $page        = trim((string) ($in['page'] ?? ''));

    // الوسيط غير مهيأ بعد → الموقع يتحول تلقائياً لواتساب
    if (ODOO_URL === '' || ODOO_DB === '' || ODOO_USERNAME === '' || ODOO_API_KEY === '') {
        append_log('submissions.jsonl', [
            'at' => date('c'), 'ip' => client_ip(), 'status' => 'not_configured',
            'name' => $name, 'mobile' => $mobile, 'email' => $email,
            'service' => $serviceName, 'page' => $page, 'message' => $message,
        ]);
        send_json(['ok' => false, 'code' => 'not_configured',
            'message' => 'لم يتم ربط أودو بعد']);
    }

    // 1) تسجيل الدخول إلى أودو
    $uid = odoo_call('common', 'login', [ODOO_DB, ODOO_USERNAME, ODOO_API_KEY]);
    if (!$uid) throw new RuntimeException('فشل تسجيل الدخول إلى أودو — تحقق من المستخدم والمفتاح');

    $execute = fn(string $model, string $method, array $args) =>
        odoo_call('object', 'execute_kw',
            array_merge([ODOO_DB, $uid, ODOO_API_KEY, $model, $method], [$args]));

    // 2) مصدر الطلب للفلترة (يُنشأ تلقائياً إن لم يوجد) — فشله لا يوقف الطلب
    $sourceId = null;
    try {
        $found = $execute('utm.source', 'search_read',
            [[['name', '=', ODOO_SOURCE_NAME]], ['fields' => ['id'], 'limit' => 1]]);
        $sourceId = $found ? (int) $found[0]['id']
            : (int) $execute('utm.source', 'create', [['name' => ODOO_SOURCE_NAME]]);
    } catch (Throwable $e) {
        append_log('warnings.jsonl', ['at' => date('c'), 'step' => 'source', 'error' => $e->getMessage()]);
    }

    // 3) فريق المبيعات (اختياري)
    $teamId = null;
    if (ODOO_TEAM_NAME !== '') {
        try {
            $teams = $execute('crm.team', 'search_read',
                [[['name', '=', ODOO_TEAM_NAME]], ['fields' => ['id'], 'limit' => 1]]);
            $teamId = $teams ? (int) $teams[0]['id'] : null;
        } catch (Throwable $e) {
            append_log('warnings.jsonl', ['at' => date('c'), 'step' => 'team', 'error' => $e->getMessage()]);
        }
    }

    // 4) إنشاء الفرصة في CRM
    $title = 'طلب خدمة من الموقع' . ($serviceName !== '' ? ' – ' . $serviceName : '');
    $description = "الاسم: {$name}\nالجوال: {$mobile}\n"
        . ($email !== '' ? "البريد: {$email}\n" : '')
        . ($serviceName !== '' ? "الخدمة المطلوبة: {$serviceName}\n" : '')
        . ($page !== '' ? "الصفحة: {$page}\n" : '')
        . "وصف الطلب:\n{$message}";

    $vals = [
        'name'         => $title,
        'contact_name' => $name,
        'phone'        => $mobile,
        'description'  => $description,
    ];
    if ($email !== '') $vals['email_from'] = $email;
    if ($sourceId) $vals['source_id'] = $sourceId;
    if ($teamId)   $vals['team_id']   = $teamId;

    $leadId = (int) $execute('crm.lead', 'create', [$vals]);

    // 5) سجل + إشعار اختياري
    append_log('submissions.jsonl', [
        'at' => date('c'), 'ip' => client_ip(), 'status' => 'ok', 'lead_id' => $leadId,
        'name' => $name, 'mobile' => $mobile, 'email' => $email,
        'service' => $serviceName, 'page' => $page, 'message' => $message,
    ]);

    if (NOTIFY_EMAIL !== '') {
        @mail(NOTIFY_EMAIL, 'طلب خدمة جديد من الموقع #' . $leadId, $description,
            'From: no-reply@' . ($_SERVER['HTTP_HOST'] ?? 'localhost') . "\r\nContent-Type: text/plain; charset=UTF-8\r\n");
    }

    send_json(['ok' => true, 'lead_id' => $leadId,
        'message' => 'تم إرسال طلبك بنجاح']);
} catch (Throwable $e) {
    append_log('errors.jsonl', ['at' => date('c'), 'ip' => client_ip(), 'error' => $e->getMessage()]);
    send_json(['ok' => false, 'code' => 'odoo_error',
        'message' => 'تعذر إرسال الطلب حالياً — حاول مرة أخرى']);
}
