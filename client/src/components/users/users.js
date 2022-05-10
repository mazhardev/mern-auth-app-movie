import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const Dashboard = () => {
  const [userList, setUserList] = useState([]);

  useEffect(async () => {
    try {
      const res = await api.get('/auth/get-all-users');
      setUserList(
        res.data
      )

    } catch (err) {
      console.log(err);
    }
  }, [setUserList]);


  console.log(userList)

  const handleDelete = async (id) => {
    console.log(id)
    try {
      const res = await api.delete(`/auth/delete-user/${id}`);


      setUserList(
        userList.filter(
          (movie) => movie._id !== id
        )
      )

    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Registered Users</h1>
      <table className="table" width={'100%'}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 &&
            userList.map((user, i) => (
              <tr key={i}>
                <td> {user.email}</td>
                <td> {user.role}</td>
                <td>

                  <Link
                    className="btn btn-danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete User
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default (
  Dashboard
);
