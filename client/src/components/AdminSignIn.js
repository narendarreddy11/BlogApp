import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthorLoginThunk } from '../Redux/Slices/UserAuthorSlice';

function AdminSignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userTypeRef = useRef('');

  const { loginUserStatus, errOccured, errMsg } = useSelector(
    (state) => state.userAuthorLoginReducer
  );

  const onSubmit = (adminData) => {
    userTypeRef.current = adminData.userType;
    dispatch(userAuthorLoginThunk(adminData));
  };

  useEffect(() => {
    if (loginUserStatus === true && userTypeRef.current === 'admin') {
      navigate('/Admin-profile');
    }
  }, [loginUserStatus, navigate]);

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{
        minHeight: '80vh',
        backgroundColor: '#f5f7fa',
      }}
    >
    

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          maxWidth: '400px',
          width: '100%',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
          background: '#fdfdfd',
          animation: 'fadeIn 0.8s ease-in-out',
        }}
      >
        <h2
          className="text-center mb-4"
          style={{ fontWeight: 'bold', color: '#343a40' }}
        >
          Admin Sign In
        </h2>

        {/* Username */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Enter admin username"
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && (
            <p className="text-danger mt-1">{errors.username.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <p className="text-danger mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Hidden Admin Type */}
        <input type="hidden" value="admin" {...register('userType')} />

        {/* Error Message */}
        {errOccured && (
          <p className="text-danger text-center mt-2">
            {errMsg || 'Something went wrong. Please try again.'}
          </p>
        )}

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{
              fontWeight: 'bold',
              fontSize: '16px',
              padding: '10px',
              transition: '0.3s ease',
            }}
          >
            Sign In as Admin
          </button>
        </div>

        {/* Link to SignIn */}
        <div className="text-center mt-3">
          <p style={{ fontSize: '15px', color: '#555' }}>
            Want to sign in as User/Author? <Link to="/signin">Go Back</Link>
          </p>
        </div>
      </form>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

export default AdminSignIn;
