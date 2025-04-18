import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [err, setErr] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    if (isRegistered) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev === 1) {
            clearInterval(timer);
            navigate('/signin');
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [isRegistered, navigate]);

  // Auto-clear error after 3s
  useEffect(() => {
    if (err.length > 0) {
      const timer = setTimeout(() => setErr(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [err]);

  const onSubmit = async (userobj) => {
    userobj.status=true;
    let res;
    try {
      if (userobj.userType === 'user') {
        res = await axios.post('http://localhost:4000/user-api/user', userobj);
      } else if (userobj.userType === 'author') {
        res = await axios.post('http://localhost:4000/author-api/user', userobj);
      }

      if (res.data.message === 'user created') {
        setErr(''); // Clear previous error
        setIsRegistered(true);
      } else {
        setErr(res.data.message); // Show error like "user already exists"
      }
    } catch (error) {
      setErr('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5" style={{ minHeight: '80vh' } }>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          maxWidth: '400px',
          width: '100%',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0px 4px 15px rgba(0,0,0,0.2)',
          background: '#fdfdfd',
          animation: 'fadeIn 0.8s ease-in-out',
        
        }}
      >
        <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#343a40' }}>
          Sign Up
        </h2>

        {/* Error Message */}
        {err && (
          <div className="alert alert-danger text-center py-2" role="alert">
            {err}
          </div>
        )}

        {/* Success Message */}
        {isRegistered && (
          <div className="alert alert-success text-center py-2" role="alert">
            Successfully Registered! Redirecting to Sign In in {countdown}...
          </div>
        )}

        {/* Account Type */}
        <div className="mb-3">
          <label className="form-label">Select Account Type</label>
          <div>
            <label htmlFor="user" className="me-3">
              <input
                type="radio"
                id="user"
                value="user"
                disabled={isRegistered}
                {...register('userType', { required: 'Please select an account type' })}
              /> User
            </label>
            <label htmlFor="author">
              <input
                type="radio"
                id="author"
                value="author"
                disabled={isRegistered}
                {...register('userType', { required: 'Please select an account type' })}
              /> Author
            </label>
          </div>
          {errors.userType && <p className="text-danger mt-1">{errors.userType.message}</p>}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            disabled={isRegistered}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email format'
              }
            })}
          />
          {errors.email && <p className="text-danger mt-1">{errors.email.message}</p>}
        </div>

        {/* Username */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            disabled={isRegistered}
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <p className="text-danger mt-1">{errors.username.message}</p>}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            disabled={isRegistered}
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p className="text-danger mt-1">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isRegistered}
            style={{
              fontWeight: 'bold',
              fontSize: '16px',
              padding: '10px',
              transition: '0.3s ease',
              backgroundColor: isRegistered ? '#6c757d' : '#007bff',
              cursor: isRegistered ? 'not-allowed' : 'pointer'
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Link to Sign In */}
        <div className="text-center mt-3">
          <p style={{ fontSize: '15px', color: '#555' }}>
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
