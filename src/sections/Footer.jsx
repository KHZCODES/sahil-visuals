import { Link as LinkScroll } from "react-scroll";
import { Link } from "react-router-dom";
import { FaInstagram, FaXTwitter, FaBehance } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-black/90 backdrop-blur-md">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <span className="font-extrabold text-2xl md:text-3xl text-pink tracking-wide select-none mb-6 block">Sahil Visuals</span>
            <p className="text-white/70 text-sm leading-relaxed max-w-md">
              Creating compelling visual stories through expert video editing and motion graphics. 
              Transforming ideas into engaging content that captivates audiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <LinkScroll
                  to="portfolio"
                  spy
                  smooth
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  Portfolio
                </LinkScroll>
              </li>
              <li>
                <LinkScroll
                  to="services"
                  spy
                  smooth
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  Services
                </LinkScroll>
              </li>
              <li>
                <LinkScroll
                  to="about"
                  spy
                  smooth
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  About
                </LinkScroll>
              </li>
              <li>
                <LinkScroll
                  to="contact"
                  spy
                  smooth
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  Contact
                </LinkScroll>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:Sahilksp01@gmail.com" className="text-white/70 hover:text-white text-sm transition-colors">
                  sahilksp01@gmail.com
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-8">
              <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://instagram.com/sxh4l.fx" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a href="https://x.com/sxh4l" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                  <FaXTwitter className="w-5 h-5" />
                </a>
                <a href="https://www.behance.net/sahilkashyap30" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                  <FaBehance className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} Sahil Visuals. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-white/50 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-white/50 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
