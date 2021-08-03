import React, { Component } from "react";
import { Link } from "react-router-dom";
import avatar from "../images/avatar.png";

class ProfileTabs extends Component {
  render() {
    const { following, followers, posts } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <h3 className="text-primary">Followers</h3>
            <hr />
            {followers.map((person) => (
              <div key={person._id}>
                <Link
                  className="d-inline-flex"
                  style={{ textDecoration: "none" }}
                  to={`/user/${person._id}`}
                >
                  <img
                    style={{
                      borderRadius: "50%",
                      border: "1px solid black",
                    }}
                    className="float-left me-2"
                    height="30px"
                    onError={(e) => (e.target.src = `${avatar}`)}
                    src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                    alt={person.name}
                  />
                  <div>
                    <p className="lead">{person.name}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <h3 className="text-primary">Following</h3>
            <hr />
            {following.map((person) => (
              <div key={person._id}>
                <Link
                  className="d-inline-flex"
                  style={{ textDecoration: "none" }}
                  to={`/user/${person._id}`}
                >
                  <img
                    style={{
                      borderRadius: "50%",
                      border: "1px solid black",
                    }}
                    className="float-left me-2"
                    height="30px"
                    onError={(e) => (e.target.src = `${avatar}`)}
                    src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                    alt={person.name}
                  />
                  <div>
                    <p className="lead">{person.name}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <h3 className="text-primary">Posts</h3>
            <hr />
            {posts.map((post, i) => (
              <div key={i}>
                <div>
                  <Link to={`/post/${post._id}`}>
                    <div>
                      <p className="lead text-truncate">{post.title}</p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileTabs;
