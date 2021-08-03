import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/index";
import appicon from "../images/appIcon.png";
const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#fff" };
  else return {};
};

const Menu = ({ history }) => (
  <div className="navbar sticky-top navbar-expand-md navbar navbar-dark bg-dark">
    <div className="container-fluid">
      <Link class="navbar-brand" to="/">
        <img
          src={appicon}
          alt="Connected"
          width="30"
          height="24"
          class="d-inline-block align-text-top"
        />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="navbar-nav">
            <Link className="nav-link" style={isActive(history, "/")} to="/">
              Home
            </Link>
            <Link
              className="nav-link"
              style={isActive(history, "/users")}
              to="/users"
            >
              Users
            </Link>
            <Link
              to="post/create"
              style={isActive(history, "post/create")}
              className="nav-link"
            >
              Create Post
            </Link>
          </div>
          {!isAuthenticated() && (
            <div className="navbar-nav ms-auto">
                <Link
                  className="nav-link"
                  style={isActive(history, "/signin")}
                  to="/signin"
                >
                  Signin
                </Link>
                <Link
                  className="nav-link"
                  style={isActive(history, "/signup")}
                  to="/signup"
                >
                  Signup
                </Link>
            </div>
          )}
          {isAuthenticated() && (
            <>
            <div className="navbar-nav">
             <Link
                  className="nav-link"
                  style={isActive(history, "/findpeople")}
                  to="/findpeople"
                >
                  Find People
                </Link>
            
             
                <Link
                  className="nav-link"
                  style={isActive(
                    history,
                    `/user/${isAuthenticated().user._id}`
                  )}
                  to={`/user/${isAuthenticated().user._id}`}
                >{`${isAuthenticated().user.name}'s profile`}</Link>
              </div>
              <div className="navbar-nav ms-auto">
                <span
                  className="nav-link"
                  style={(isActive(history, "/signup"), { cursor: "pointer" })}
                  onClick={() => signout(() => history.push("/"))}
                >
                  Signout
                </span>
              </div>
            </>
          )}
        
      </div>
    </div>
  </div>
);

export default withRouter(Menu);
