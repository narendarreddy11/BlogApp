// RoutingError.js

import React from 'react';
import { useRouteError } from 'react-router-dom';
import { Link } from 'react-router-dom';
const RoutingError = () => {
  const error = useRouteError();
  console.error(error); // optional: for debugging

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Oops! 🚧</h1>
      <p>Something went wrong.</p>
      {error?.status && <p>Error Code: {error.status}</p>}
      {error?.statusText && <p>{error.statusText}</p>}
      <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>Go back to Home</Link>
    </div>
  );
};

export default RoutingError;
