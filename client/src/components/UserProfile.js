import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function UserProfile() {
  return (
    <div className="d-flex justify-content-between p-4" style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Sidebar Navigation */}
      <div
        className="p-3 bg-light rounded shadow"
        style={{ width: '20%', minHeight: '100%', borderRight: '2px solid #e3e3e3' }}
      >
        <h5 className="text-center mb-4 fw-bold text-uppercase" style={{ letterSpacing: '0.5px' }}>
          User Panel
        </h5>
        <nav className="nav flex-column gap-2">
          <NavLink
            to="articles"
            className={({ isActive }) =>
              `nav-link px-3 py-2 rounded fw-semibold ${
                isActive ? 'active bg-primary text-white' : 'text-dark'
              }`
            }
            style={{ transition: 'all 0.2s ease-in-out' }}
          >
            📄 Articles
          </NavLink>
          {/* You can add more links here later */}
        </nav>
      </div>

      {/* Main Content Area */}
      <div
        className="p-4 bg-white rounded shadow w-75"
        style={{ animation: 'fadeIn 0.4s ease-in-out' }}
      >
        {/* This renders the nested route component like <Articles /> or <AddArticle /> */}
        <Outlet />
      </div>
    </div>
  );
}

export default UserProfile;
