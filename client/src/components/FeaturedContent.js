import React from 'react';
import img1 from '../Img/Join.jpg'; // Same image as in Home.js
import img2 from '../Img/BOOK.jpg';
import './Home.css';
import { Link } from 'react-router-dom';
function FeaturedContent() {
  return (
    <div className="featured-content">
      {/* Trending Technology Articles Section */}
      <div className="home-content trending-section d-flex flex-column flex-md-row align-items-center justify-content-between">
        <div className="image-column fade-in mb-4 mb-md-0">
          <img src={img2} alt="Illustration of trending technology" className="img-fluid rounded shadow" />
        </div>
        <div className="text-column ms-md-4">
          <h2 className="section-heading text-dark fw-bold mb-3">Trending Technology Articles</h2>
          <p
            className="paragraph fade-in mb-3"
            style={{ animationDelay: '0.2s', color: '#212529' }}
          >
            Stay ahead of the curve with our curated selection of articles on cutting-edge technologies. From artificial intelligence
            to quantum computing, explore the innovations shaping the future. Our articles break down complex topics into
            easy-to-understand insights for enthusiasts and professionals alike.
          </p>
          <Link
            to="/signin"
            className="btn btn-outline-primary fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            Start Reading
          </Link>
        </div>
      </div>

      {/* Why to Join Section */}
      <div className="home-content community-section d-flex flex-column-reverse flex-md-row align-items-center justify-content-between mt-5">
        <div className="text-column me-md-4">
          <h2 className="section-heading text-dark fw-bold mb-3">Why to Join</h2>
          <p
            className="paragraph fade-in mb-3"
            style={{ animationDelay: '0.2s', color: '#212529' }}
          >
            Joining our community means becoming part of a vibrant network of learners and thinkers. Engage with like-minded
            individuals, share your insights, and access exclusive content. Our platform fosters discussion and collaboration,
            helping you grow through the power of shared knowledge.
          </p>
          <Link
            to="/signin"
            className="btn btn-outline-success fade-in"
            style={{ animationDelay: '0.4s' }}
    Link     >
            Join Our Community
          </Link>
        </div>
        <div className="image-column fade-in mb-4 mb-md-0">
          <img src={img1} alt="Illustration of community collaboration" className="img-fluid rounded shadow" />
        </div>
      </div>
    </div>
  );
}

export default FeaturedContent;
