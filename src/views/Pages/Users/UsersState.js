import React, { useState, useEffect } from "react";
import axios from "axios";
// Import components
import Button from "./components/Button";
import User from "./components/User";

const Users = (props) => {
  const [initialUsers, setInitiaUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      fetchUsers();
    }, 100);
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:4000/users");
      setInitiaUsers(res.data);
      setVisibleUsers(res.data);
    };
  }, []);

  const _handleUpdate = (id) => {
    console.log("update", id);
  };

  const _handleView = (id) => {
    props.history.push(`/detail-user/${id}`)
  };

  const _handleDelete = (id) => {
    const removeArr = visibleUsers.filter(item => item.id !== id)
    setVisibleUsers(removeArr)
  };
  // console.log('initialUsers', initialUsers)
  const _handleSearchValue = (event) => {
    const { value } = event.target;
    
    const keywords = value.toLowerCase()
    const filterUser = initialUsers.filter(
      user => user.name.toLowerCase().indexOf(keywords) !== -1
    );
    setVisibleUsers(filterUser)
  };
  return (
    <div className="user-page-wrapper">
      <header className="user-header">
        <h3>Member</h3>
        <div className="input-group">
          <button type="button" className="btn search-btn">
            <i className="icon-magnifier"></i>
          </button>
          <input
            type="text"
            className="form-control input-search"
            placeholder="Please input keywords of name"
            onChange={_handleSearchValue}
          />
        </div>
      </header>
      <section className="user-body">
        <table className="user-table">
          <thead>
            <th>No.</th>
            <th>Avatar</th>
            <th>Name</th>
            <th>Role</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Action</th>
          </thead>
          <tbody>
            {visibleUsers.length ? (
              visibleUsers.map((user, idx) => {
                return (
                  <tr key={Math.random()} className="userItem">
                    <User
                      idx={idx}
                      name={user.name}
                      avatar={user.avatar}
                      role={user.role}
                      gender={user.gender}
                      email={user.email}
                      handleUpdate={() => _handleUpdate(user.id)}
                      handleView={() => _handleView(user.id)}
                      handleDelete={() => _handleDelete(user.id)}
                    />
                  </tr>
                );
              })
            ) : (
              <div>loading...</div>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Users;
