import React, { useEffect, useState } from 'react';
import { AxioWithtoken } from '../AxioWithToken';

function AdminAuthorList() {
  const [authorList, setAuthorList] = useState([]);

  // Fetch authors from the backend
  async function getAuthorsAdmin() {
    try {
      const res = await AxioWithtoken.get('http://localhost:4000/admin-api/authorsList');
      if (res.data.payload) {
        setAuthorList(res.data.payload);
      }
    } catch (err) {
      console.error("Error fetching authors:", err);
    }
  }

  useEffect(() => {
    getAuthorsAdmin();
  }, []);

  // Handle block/unblock action
  const handleAction = async (author) => {
    const info = {
      username: author.username,
      userType: 'author',
    };

    try {
      const res = await AxioWithtoken.put('http://localhost:4000/admin-api/userauthorblock', info);
      console.log("Backend response:", res.data.message, "Status:", res.data.status);

      // Update author status locally
      setAuthorList((prevList) =>
        prevList.map((a) =>
          a.username === author.username ? { ...a, status: res.data.status } : a
        )
      );
    } catch (err) {
      console.error("Error updating author status:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Authors List</h3>
      <table className="table table-bordered table-hover text-center align-middle">
        <thead className="table-dark">
          <tr>
            <th>S.no</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {authorList.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-muted">No authors found</td>
            </tr>
          ) : (
            authorList.map((author, index) => (
              <tr key={author._id}>
                <td>{index + 1}</td>
                <td>{author.username}</td>
                <td>{author.email}</td>
                <td>
                  {author.status === true ? (
                    <span className="badge bg-success">Active</span>
                  ) : (
                    <span className="badge bg-danger">Blocked</span>
                  )}
                </td>
                <td>
                  <button
                    className={`btn btn-sm ${author.status ? 'btn-danger' : 'btn-success'}`}
                    onClick={() => handleAction(author)}
                  >
                    {author.status ? 'Block' : 'Unblock'}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminAuthorList;
