import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const projects = [
  { image: project1, title: "فيلا سكنية", category: "سكني" },
  { image: project2, title: "مبنى تجاري", category: "تجاري" },
  { image: project3, title: "مشروع تعليمي", category: "تعليمي" },
  { image: project4, title: "مجمع سكني", category: "سكني" },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-16 md:py-24 section-dark">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">نحوّل أحلامكم إلى واقع</h2>
          <p className="text-primary-foreground/60 text-sm md:text-base">نماذج من أعمالنا ومشاريعنا المنفذة</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((project) => (
            <div key={project.title} className="group relative rounded-lg overflow-hidden cursor-pointer">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                width={800}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <div>
                  <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded mb-2 inline-block">
                    {project.category}
                  </span>
                  <h3 className="text-primary-foreground font-bold text-base">{project.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="#projects"
            className="inline-block border border-primary-foreground/30 text-primary-foreground/80 px-8 py-3 rounded-md hover:bg-primary-foreground/10 transition-colors text-sm font-medium"
          >
            معرض أعمالنا
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
