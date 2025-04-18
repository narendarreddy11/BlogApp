import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetstate, verifyToken } from '../Redux/Slices/UserAuthorSlice';

const Navbar = () => {
  const { loginUserStatus, currentUser } = useSelector(
    (state) => state.userAuthorLoginReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function signout() {
    localStorage.removeItem('token');
    dispatch(resetstate());
    navigate('/signin');
  }

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      dispatch(verifyToken(token))
        .unwrap()
        .then(() => {})
        .catch(() => {
          localStorage.removeItem('token');
          dispatch(resetstate());
          navigate('/signin');
        });
    } else {
      navigate('/');
    }
  }, [dispatch, navigate]);

  return (
    <nav
      className="navbar navbar-expand-md navbar-dark bg-dark shadow-sm px-4 py-2"
     
    >
      <Link
        className="navbar-brand fw-bold fs-3"
        to="/"
        style={{ color: '#00d4ff' }}
      >
        MyLogo
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto align-items-center gap-3">
          {loginUserStatus === false ? (
            <>
              <li className="nav-item">
                <Link className="nav-link text-light fw-medium" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light fw-medium" to="/signin">
                  Sign In
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light fw-medium" to="/signup">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light fw-medium" to="/adminsignin">
                  Admin
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item d-flex align-items-center">
              <span
                className="me-3"
                style={{
                  fontFamily: 'Cursive, sans-serif',
                  color: '#f8c146',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                }}
              >
                Welcome, {currentUser?.username || 'Guest'} ({currentUser?.userType || 'User'})
              </span>
              <Link
                className="nav-link text-danger fw-bold"
                to="/signin"
                onClick={signout}
              >
                Sign Out
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
