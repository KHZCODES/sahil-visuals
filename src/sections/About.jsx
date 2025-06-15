import { Element } from "react-scroll";
import { Link as LinkScroll } from "react-scroll";

const stats = [
  { label: "Years Experience", value: "4+" },
  { label: "Projects Completed", value: "100+" },
  { label: "Happy Clients", value: "50+" },
  { label: "Awards Won", value: "5+" },
];

const skills = [
  { name: "After Effects", level: 95 },
  { name: "Premiere Pro", level: 90 },
  { name: "Blender", level: 85 },
  { name: "DaVinci Resolve", level: 80 },
];

const About = () => {
  return (
    <Element name="about">
      <section className="py-24 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="/images/sahilllogo.webp"
                  alt="Sahil Visuals Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-pink/20 rounded-full blur-3xl" />
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl" />
            </div>

            {/* Right Column - Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                About Me
              </h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                I'm a passionate video editor and motion graphics specialist with
                over 4 years of experience in creating compelling visual content.
                My journey in the creative industry has equipped me with the
                skills to transform ideas into engaging stories that resonate with
                audiences.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-pink mb-2">
                      {stat.value}
                    </div>
                    <div className="text-white/70 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-medium">{skill.name}</span>
                      <span className="text-white/70">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-pink rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <LinkScroll
                  to="contact"
                  smooth={true}
                  duration={600}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-pink rounded-full shadow-[0_0_20px_rgba(255,78,205,0.4)] transition-all hover:brightness-110 hover:scale-105 cursor-pointer"
                >
                  Let's Work Together
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
          </div>
        </div>
      </section>
    </Element>
  );
};

export default About; 