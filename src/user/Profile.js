import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isauthenticated } from "../auth";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      redirectToSignin: false,
    };
  }
  componentDidMount() {
    const userId = this.props.match.params.userId;
    fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
        Authorization: `Bearer ${isauthenticated().token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          this.setState({ redirectToSignin: true });
        } else {
          this.setState({ user: data });
        }
      });
  }

  render() {
    const { redirectToSignin, user } = this.state;
    if (redirectToSignin) return <Redirect to="/Signin" />;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Profile</h2>
        <hr />
        <p>name:{isauthenticated().user.name}</p>
        <p>email:{isauthenticated().user.email}</p>
        <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
      </div>
    );
  }
}

export default Profile;
