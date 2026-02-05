import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary py-16 md:py-20">
      <div className="container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="font-display text-xl tracking-wide">
              KA_ATELIER<span className="text-champagne">_082</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Where Tradition Meets Contemporary Design
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="label-text text-foreground">Navigation</h4>
            <ul className="space-y-2">
              {["Portfolio", "Services", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="label-text text-foreground">Get in Touch</h4>
            <a
              href="mailto:contact@demo-studio.com"
              className="text-sm text-muted-foreground hover:text-champagne transition-colors duration-300 block"
            >
              contact@demo-studio.com
            </a>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 label-text text-champagne hover:text-foreground transition-colors duration-300"
              >
                Start a Project
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © {currentYear} KA_ATELIER_082. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Designed with intention. Crafted with care.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
