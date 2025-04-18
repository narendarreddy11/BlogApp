import React, { useEffect, useState } from 'react';
import { AxioWithtoken } from '../AxioWithToken';
import { API } from './config';

function AdminUsersList() {
  const [userlist, setuserlist] = useState([]);

  // Fetch users from the backend
  async function getusersadmin() {
    try {
      const res = await AxioWithtoken.get(`${API}/admin-api/usersList`);
      if (res.data.payload) {
        setuserlist(res.data.payload);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }

  useEffect(() => {
    getusersadmin();
  }, []);

  // Handle block/unblock user
  const handleAction = async (user) => {
    const info = {
      username: user.username,
      userType: user.userType,
    };

    try {
      const res = await AxioWithtoken.put(`${API}/admin-api/userauthorblock`, info);

      // Update the user status locally in the state
      setuserlist((prevList) =>
        prevList.map((u) =>
          u.username === user.username ? { ...u, status: res.data.status } : u
        )
      );
    } catch (err) {
      console.error("Error updating user status:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Users List</h3>
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
          {userlist.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-muted">No users found</td>
            </tr>
          ) : (
            userlist.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {user.status === true ? (
                    <span className="badge bg-success">Active</span>
                  ) : (
                    <span className="badge bg-danger">Blocked</span>
                  )}
                </td>
                <td>
                  <button
                    className={`btn btn-sm ${user.status ? 'btn-danger' : 'btn-success'}`}
                    onClick={() => handleAction(user)}
                  >
                    {user.status ? 'Block' : 'Unblock'}
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

export default AdminUsersList;
