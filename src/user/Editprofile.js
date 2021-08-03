import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated,updateUser } from "../auth";
import { read, update } from "./apiUser";
import avatar from "../images/avatar.png";
class Editprofile extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      email: "",
      password: "",
      error: "",
      redirectToProfile: false,
      loading: false,
      fileSize: 0,
      about:""
    };
  }
  init = (userId) => {
    const token = isAuthenticated().token;
    read(userId, token).then((data) => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({ id: data._id, name: data.name, email: data.email,about:data.about });
      }
    });
  };
  componentDidMount() {
    this.userData = new FormData();
    const userId = this.props.match.params.userId;
    this.init(userId);
  }
  isValid = () => {
    const { name, email, password, fileSize } = this.state;
    if (fileSize > 100000) {
      this.setState({ error: "File size should be less than 100 kb" });
      return false;
    }
    if (name.length === 0) {
      this.setState({ error: "Name is required" });
      return false;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({ error: "A valid Email is required" });
      return false;
    }
    if (password.length >= 1 && password.length <= 5) {
      this.setState({
        error: "Password must be at least 6 characters long",
      });
      return false;
    }
    if (password.length >= 1 && !/\d/.test(password)) {
      this.setState({
        error: "Password must contain atleast 1 digit",
      });
      return false;
    }
    return true;
  };
  clickSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ loading: true });
      const token = isAuthenticated().token;
      const userId = this.props.match.params.userId;
      update(token, userId, this.userData).then((data) => {
        if (data.error) this.setState({ error: data.error });
        else {
          updateUser(data, () => {
            this.setState({
                redirectToProfile: true
            });
        });
        }
      });
    }
  };
  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.userData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  signupForm = (name, email, password,about) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Profile Photo</label>
        <input
          onChange={this.handleChange("photo")}
          type="file"
          accept="image/*"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={this.handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={this.handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">About</label>
        <textarea
          onChange={this.handleChange("about")}
          type="text"
          className="form-control"
          value={about}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={this.handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        update
      </button>
    </form>
  );

  render() {
    const { id, name, email, password, redirectToProfile, error, loading,about } =
      this.state;
    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />;
    }
    const photoUrl = id
      ? `${
          process.env.REACT_APP_API_URL
        }/user/photo/${id}?${new Date().getTime()}`
      : avatar;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Edit profile</h2>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        {loading ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          ""
        )}
        <img className="img-thumbnail" onError={i=>i.target.src=avatar} style={{width:"auto",height:"200px"}} src={photoUrl} alt={name} />
        {isAuthenticated().user._id === id &&
        this.signupForm(name, email, password, about)}
      </div>
    );
  }
}

export default Editprofile;
