import React from 'react';
import img1 from '../Img/KnowledgeOceean.jpg'; // Replace this with your preferred image
import FeaturedContent from './FeaturedContent';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      <div className="home-content welcome-section d-flex flex-column flex-md-row align-items-center justify-content-between">
        <div className="text-column me-md-4">
          <h2 className="section-heading fw-bold mb-4 text-dark">Welcome to Knowledge</h2>

          <p
            className="paragraph fade-in mb-3"
            style={{ color: '#212529', animationDelay: '0.2s' }}
          >
            Knowledge is the foundation of progress. Sharing knowledge empowers others, creates new perspectives,
            and drives innovation. Whether it's about science, technology, or life experiences, every piece of
            knowledge matters.
          </p>

          <p
            className="paragraph fade-in mb-3"
            style={{ color: '#212529', animationDelay: '0.4s' }}
          >
            Our platform is dedicated to bringing you <strong>important and trending articles</strong> from diverse fields.
            Stay informed, stay ahead. We regularly update our content to make sure you're always in touch with the latest insights.
          </p>

          <p
            className="paragraph fade-in mb-3"
            style={{ color: '#212529', animationDelay: '0.6s' }}
          >
            Dive into our digital ocean of curated articles that cover a wide range of subjects — from emerging tech
            to timeless philosophy. Whether you're a student, a professional, or a curious explorer, this place is for you.
          </p>
        </div>

        <div className="image-column fade-in mt-4 mt-md-0">
          <img
            src={img1}
            alt="Illustration of knowledge sharing"
            className="img-fluid rounded shadow"
          />
        </div>
      </div>

      <FeaturedContent />
    </div>
  );
}

export default Home;
