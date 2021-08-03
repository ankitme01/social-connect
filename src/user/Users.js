import React, { Component } from "react";
import { Link } from "react-router-dom";
import { list } from "./apiUser";
import avatar from "../images/avatar.png";
class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }
  componentDidMount() {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ users: data });
      }
    });
  }
  allUsers = (users) => (
    <div className="row">
      {users.map((user) => (
        <div key={user._id} className="col-sm-4 mb-3">
          <div key={user._id} className="card">
            <img
              className="img-thumbnail"
              style={{ width: "auto", height: "200px" }}
              src={
                user._id
                  ? `${process.env.REACT_APP_API_URL}/user/photo/${
                      user._id
                    }?${new Date().getTime()}`
                  : avatar
              }
              onError={(i) => (i.target.src = avatar)}
              alt={user.name}
            />
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text">{user.email}</p>
              <Link
                className="btn btn-primary btn-raised btn-sm"
                to={`/user/${user._id}`}
              >
                VIEW PROFILE
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  render() {
    const { users } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Users</h2>
        {this.allUsers(users)}
      </div>
    );
  }
}

export default Users;
