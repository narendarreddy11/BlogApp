import React from 'react';

const Footer = () => {
  return (
    <>
      <footer className="bg-dark text-white pt-5 pb-4 mt-auto">
        <div className="container text-center text-md-left">
          
          {/* Row 1: App Info */}
          <div className="row text-center text-md-left">
            <div className="col-md-6 col-lg-6 col-xl-6 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 font-weight-bold text-warning">BloApp</h5>
              <p>
                BloApp is a modern blogging platform where authors can share articles on various topics like technology, lifestyle, science, and more.
              </p>
            </div>

            {/* Row 2: Quick Links */}
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Quick Links</h5>
              <p><a href="/articles" className="text-white text-decoration-none">Articles</a></p>
              <p><a href="/authors" className="text-white text-decoration-none">Authors</a></p>
              <p><a href="/login" className="text-white text-decoration-none">Login</a></p>
              <p><a href="/signup" className="text-white text-decoration-none">Sign Up</a></p>
            </div>

            {/* Row 3: Contact */}
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Contact</h5>
              <p><i className="fas fa-envelope me-2"></i> support@bloapp.com</p>
              <p><i className="fas fa-phone me-2"></i> +91 9876543210</p>
              <p><i className="fas fa-map-marker-alt me-2"></i> Hyderabad, India</p>
            </div>
          </div>

          <hr className="mb-4" />

          {/* Row 4: Socials and Copyright */}
          <div className="row align-items-center">
            <div className="col-md-7 col-lg-8">
              <p className="text-center text-md-left">© 2025 <strong>BloApp</strong> — All Rights Reserved</p>
            </div>

            <div className="col-md-5 col-lg-4">
              <div className="text-center text-md-right">
                <a href="https://twitter.com" className="text-white me-3"><i className="fab fa-twitter"></i></a>
                <a href="https://linkedin.com" className="text-white me-3"><i className="fab fa-linkedin"></i></a>
                <a href="https://github.com" className="text-white me-3"><i className="fab fa-github"></i></a>
                <a href="https://instagram.com" className="text-white"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Inline Footer Styling */}
      <style>{`
        footer a:hover {
          color: #ffc107 !important;
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default Footer;
