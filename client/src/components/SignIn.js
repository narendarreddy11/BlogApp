import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthorLoginThunk } from '../Redux/Slices/UserAuthorSlice';

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userTypeRef = useRef('');
  const { loginUserStatus, errOccured, errMsg } = useSelector(state => state.userAuthorLoginReducer);

  const onSubmit = (usercredobj) => {
    userTypeRef.current = usercredobj.userType;
    dispatch(userAuthorLoginThunk(usercredobj));
  };

  useEffect(() => {
    if (loginUserStatus === true) {
      if (userTypeRef.current === 'user') {
        navigate('/user-profile');
      } else {
        navigate('/author-profile');
      }
    }
  }, [loginUserStatus, navigate]);

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          maxWidth: '400px',
          width: '100%',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0px 4px 15px rgba(0,0,0,0.2)',
          background: '#fdfdfd',
          animation: 'fadeIn 0.8s ease-in-out'
        }}
      >
        <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#343a40' }}>
          Sign In
        </h2>

        {/* Account Type */}
        <div className="mb-3">
          <label className="form-label">Select Account Type</label>
          <div>
            <label htmlFor="user" className="me-3">
              <input
                type="radio"
                id="user"
                value="user"
                {...register('userType', { required: 'Please select an account type' })}
              /> User
            </label>
            <label htmlFor="author">
              <input
                type="radio"
                id="author"
                value="author"
                {...register('userType', { required: 'Please select an account type' })}
              /> Author
            </label>
          </div>
          {errors.userType && <p className="text-danger mt-1">{errors.userType.message}</p>}
        </div>

        {/* Username */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Enter your username"
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
            placeholder="Enter your password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p className="text-danger mt-1">{errors.password.message}</p>}
        </div>

        {/* Error from Redux */}
        {errOccured && (
          <div className="mb-3 text-center">
            <p className="text-danger">{errMsg}</p>
          </div>
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
              transition: '0.3s ease'
            }}
          >
            Sign In
          </button>
        </div>

        {/* Link to Sign Up */}
        <div className="text-center mt-3">
          <p style={{ fontSize: '15px', color: '#555' }}>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
