import { Element } from "react-scroll";
import { FaInstagram, FaXTwitter, FaBehance } from "react-icons/fa6";

const Contact = () => {
  return (
    <Element name="contact">
      <section className="py-24 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Ready to start your project? Let's discuss how we can bring your
              vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-16 mx-auto">
            {/* Message through Socials */}

            {/* Contact Information */}
            <div className="space-y-8 max-w-md mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-semibold text-white mb-6 text-center">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 mx-auto max-w-xs">
                    <div className="text-pink mt-1">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Email</h4>
                      <a
                        href="mailto:contact@sahilvisuals.com"
                        className="text-white/70 hover:text-white transition-colors"
                      >
                        sahilksp01@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 mx-auto max-w-xs">
                    <div className="text-pink mt-1">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Phone</h4>
                      <a
                        href="tel: - "
                        className="text-white/70 hover:text-white transition-colors"
                      >
                        -
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 mx-auto max-w-xs">
                    <div className="text-pink mt-1">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Location</h4>
                      <p className="text-white/70">
                        Delhi, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-semibold text-white mb-6 text-center">
                  Follow Us
                </h3>
                <div className="flex space-x-4 justify-center">
                  {/* Instagram */}
                  <a
                    href="https://instagram.com/sxh4l.fx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-pink hover:text-white transition-all"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="w-6 h-6" />
                  </a>
                  {/* X (Twitter) */}
                  <a
                    href="https://x.com/sxh4l"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-pink hover:text-white transition-all"
                    aria-label="X"
                  >
                    <FaXTwitter className="w-6 h-6" />
                  </a>
                  {/* Behance */}
                  <a
                    href="https://www.behance.net/sahilkashyap30"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-pink hover:text-white transition-all"
                    aria-label="Behance"
                  >
                    <FaBehance className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Contact; 