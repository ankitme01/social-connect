import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import Menu from "./core/Menu";
import Users from "./user/Users";
import PrivateRoute from "./auth/PrivateRoute";
import Editprofile from "./user/Editprofile";
import FindPeople from "./user/FindPeople";
import NewPost from "./post/NewPost";
import SinglePost from "./post/SinglePost";
import EditPost from "./post/EditPost";
const MainRouter = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
      <PrivateRoute exact path="/user/:userId" component={Profile} />
      <Route exact path="/users" component={Users} />
      <PrivateRoute exact path="/post/edit/:postId" component={EditPost} />
      <PrivateRoute exact path="/user/edit/:userId" component={Editprofile} />
      <PrivateRoute exact path="/post/create" component={NewPost} />
      <Route exact path="/post/:postId" component={SinglePost} />
      <PrivateRoute exact path="/findpeople" component={FindPeople} />
    </Switch>
  </div>
);
export default MainRouter;
