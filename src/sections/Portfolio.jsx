import { Element } from "react-scroll";
import { Link as LinkScroll } from "react-scroll";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import { Video } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";

const categories = ["all", "video", "image", "3d", "motion"];

const projects = [
  {
    id: 1,
    title: "Sample Video E",
    description: "A sample video.",
    type: "video",
    mediaUrl: "/server/uploads/videos/samplee.mp4",
  },
  {
    id: 2,
    title: "Short Video",
    description: "A short clip.",
    type: "video",
    mediaUrl: "/server/uploads/videos/SHORT.mp4",
  },
  {
    id: 3,
    title: "Sample Video 3",
    description: "Another sample video.",
    type: "video",
    mediaUrl: "/server/uploads/videos/sample 3.mp4",
  },
  {
    id: 4,
    title: "Sample Video 1",
    description: "Yet another sample video.",
    type: "video",
    mediaUrl: "/server/uploads/videos/sample1.mp4",
  },
  {
    id: 5,
    title: "Image 1",
    description: "A sample thumbnail.",
    type: "image",
    mediaUrl: "/server/uploads/videos/1.png",
  },
  {
    id: 6,
    title: "Sample Video",
    description: "Generic sample video.",
    type: "video",
    mediaUrl: "/server/uploads/videos/sample.mp4",
  },
  {
    id: 7,
    title: "Vid",
    description: "A sample video.",
    type: "video",
    mediaUrl: "/server/uploads/videos/vid.mp4",
  },
  {
    id: 8,
    title: "Money Video",
    description: "A video about money.",
    type: "video",
    mediaUrl: "/server/uploads/videos/money.mp4",
  },
  {
    id: 9,
    title: "REV Video",
    description: "A review video.",
    type: "video",
    mediaUrl: "/server/uploads/videos/REV.mp4",
  },
  {
    id: 10,
    title: "Blender Project",
    description: "A Blender rendered video.",
    type: "video",
    mediaUrl: "/server/uploads/videos/blender.mp4",
  },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxSlides, setLightboxSlides] = useState([]);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.type.toLowerCase() === activeCategory);

  const openLightbox = (projectToOpen) => {
    const index = filteredProjects.findIndex(p => p.id === projectToOpen.id);
    if (index === -1) return; // Should not happen

    const slides = filteredProjects.map((project) => {
      if (project.type === "video") {
        return {
          type: "video",
          sources: [{ src: project.mediaUrl, type: "video/mp4" }],
        };
      } else {
        return { src: project.mediaUrl };
      }
    });

    setLightboxSlides(slides);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <Element name="portfolio">
      <section className="py-24 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Portfolio
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Explore our latest video projects and see how we've helped clients achieve
              their creative vision.
            </p>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <p className="text-center text-white/70 text-lg">No projects found in this category.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <div className="aspect-video overflow-hidden">
                    {project.type === "video" ? (
                      <video
                        src={project.mediaUrl}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        controls
                      />
                    ) : (
                      <img
                        src={project.mediaUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-white/70 text-sm mb-4">
                        {project.description}
                      </p>
                      <button
                        className="text-pink text-sm font-medium hover:text-white transition-colors"
                        onClick={() => openLightbox(project)}
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            index={lightboxIndex}
            slides={lightboxSlides}
            plugins={[Video]}
            on={{ view: ({ index: currentIndex }) => setLightboxIndex(currentIndex) }}
          />

          <div className="mt-16 text-center">
            <LinkScroll
              to="contact"
              smooth={true}
              duration={600}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-pink rounded-full shadow-[0_0_20px_rgba(255,78,205,0.4)] transition-all hover:brightness-110 hover:scale-105 cursor-pointer"
            >
              Start Your Project
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </LinkScroll>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Portfolio; 