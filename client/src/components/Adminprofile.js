import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function Adminprofile() {
  return (
    <div className="d-flex justify-content-between p-4" style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Sidebar Navigation */}
      <div
        className="p-3 bg-light rounded shadow"
        style={{ width: '20%', minHeight: '100%', borderRight: '2px solid #e3e3e3' }}
      >
        <h5 className="text-center mb-4 fw-bold text-uppercase" style={{ letterSpacing: '0.5px' }}>
          Admin Panel
        </h5>
        <nav className="nav flex-column gap-2">
          <NavLink
            to="adminuserlist"
            className={({ isActive }) =>
              `nav-link px-3 py-2 rounded fw-semibold ${
                isActive ? 'active bg-primary text-white' : 'text-dark'
              }`
            }
            style={{ transition: 'all 0.2s ease-in-out' }}
          >
            Users
          </NavLink>

          <NavLink
            to="adminauthorlist"
            className={({ isActive }) =>
              `nav-link px-3 py-2 rounded fw-semibold ${
                isActive ? 'active bg-primary text-white' : 'text-dark'
              }`
            }
            style={{ transition: 'all 0.2s ease-in-out' }}
          >
            Authors
          </NavLink>

          <NavLink
            to="adminarticles"
            className={({ isActive }) =>
              `nav-link px-3 py-2 rounded fw-semibold ${
                isActive ? 'active bg-primary text-white' : 'text-dark'
              }`
            }
            style={{ transition: 'all 0.2s ease-in-out' }}
          >
            Articles List
          </NavLink>
        </nav>
      </div>

      {/* Main Content Area */}
      <div
        className="p-4 bg-white rounded shadow w-75"
        style={{ animation: 'fadeIn 0.4s ease-in-out' }}
      >
        {/* Nested Route Component Will Render Here */}
        <Outlet />
      </div>
    </div>
  );
}

export default Adminprofile;
