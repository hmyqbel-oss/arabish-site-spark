import { Maximize2, MapPin, Ruler } from "lucide-react";

interface Project {
  image: string;
  title: string;
  category: string;
  area?: string;
  location?: string;
}

const projects: Project[] = [
  {
    image: "/gallery/project-villa-modern.jpg",
    title: "تصميم فيلا خاصة بطراز مودرن",
    category: "سكني",
    area: "480م²",
    location: "الرياض - المهدية",
  },
  { image: "/gallery/project-4.jpg", title: "فيلا سكنية فاخرة", category: "سكني" },
  { image: "/gallery/project-7.jpg", title: "مبنى تجاري", category: "تجاري" },
  { image: "/gallery/project-2.jpg", title: "تصميم معماري حديث", category: "تصميم" },
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
            <div key={project.title} className="group relative rounded-2xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-accent/40 transition-all duration-500">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                width={800}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5">
                <div className="w-full">
                  <span className="text-xs bg-accent text-accent-foreground px-3 py-1 rounded-md mb-2 inline-block font-medium">
                    {project.category}
                  </span>
                  <h3 className="text-primary-foreground font-bold text-base mb-1">{project.title}</h3>
                  {(project.area || project.location) && (
                    <div className="flex items-center gap-3 mt-2 text-primary-foreground/70 text-xs">
                      {project.area && (
                        <span className="flex items-center gap-1">
                          <Maximize2 className="w-3 h-3" />
                          {project.area}
                        </span>
                      )}
                      {project.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {project.location}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="/gallery"
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
