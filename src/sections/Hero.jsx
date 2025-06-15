import { Element, Link as LinkScroll } from "react-scroll";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Element name="hero">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center px-4">
            <div className="flex flex-col items-center gap-4 mb-6">
              <ContainerTextFlip
                words={[
                  "Will help you to boost your engagement by 25%",
                  "Your Story, Reimagined. Engagement Follows.",
                  "Powerful Motion. Measurable Growth."
                ]}
                className="mb-6"
                textClassName="text-white/90 text-sm font-medium tracking-wider uppercase"
                animationDuration={700}
                interval={3000}
              />
              <LinkScroll
                to="contact"
                smooth={true}
                duration={600}
                className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-pink rounded-full shadow-[0_0_20px_rgba(255,78,205,0.4)] transition-all hover:brightness-110 hover:scale-105 mt-2"
              >
                Start Your Project
              </LinkScroll>
            </div>
            
            <h1 className="mb-8 text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
              Bringing Stories 
              <span className="text-pink block mt-2">to Life</span>
            </h1>
            
            <p className="mb-12 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              I'm a Video Editor & Motion Graphics Specialist with over 4 years
              of experience crafting visual stories that captivate and inspire.
              From documentaries to 3D animations, I blend creativity and
              precision using After Effects, Premiere Pro, and Blender.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LinkScroll
                to="portfolio"
                smooth={true}
                duration={600}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-pink rounded-full shadow-[0_0_20px_rgba(255,78,205,0.4)] transition-all hover:brightness-110 hover:scale-105"
              >
                View Portfolio
              </LinkScroll>
              
              <LinkScroll
                to="contact"
                smooth={true}
                duration={600}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 backdrop-blur-md rounded-full transition-all hover:bg-white/20"
              >
                Get in Touch
              </LinkScroll>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </Element>
    </section>
  );
};

export default Hero;
