# AGENTS.md

- Service requests: `src/components/ServiceRequestForm.tsx` posts to `public/odoo-bridge.php` (ships in the Vite build, runs on the client's Hostinger PHP hosting) which creates a `crm.lead` in Odoo via JSON-RPC; if the bridge is missing/unconfigured/failing, the form falls back to opening WhatsApp automatically so no request is lost. Why: client wants website requests filtered in their Odoo CRM; site is static on Hostinger, so the bridge must be plain PHP with config constants at the top of the file.
