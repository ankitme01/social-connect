import { Link,withRouter } from "react-router-dom";
import { isauthenticated,signout } from "../auth/index";



const isActive=(history,path)=>{
    if (history.location.pathname === path) return { color: '#000' };
    else return {};
}

const Menu=({history})=>(
   <div className="navbar navbar-expand-lg navbar-light bg-primary">
  <div className="container-fluid">
    <div className="navbar-brand" >AppIcon</div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <Link className="nav-link" style={isActive(history,"/")} to="/">Home</Link>
        </li>
         {!isauthenticated()&&(
             <>
               <li className="nav-item">
        <Link className="nav-link" style={isActive(history,"/signin")} to="/signin">Signin</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" style={isActive(history,"/signup")} to= "/signup">Signup</Link>
        </li>
             </>
         )}
        {isauthenticated()&&(
            <>
        <li className="nav-item">
        <a className="nav-link" style={isActive(history,"/signup"),{cursor:"pointer"}} 
        onClick={()=>signout(()=>history.push('/'))}>Signout</a>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to={`/user/${isauthenticated().user._id}`} >{`${isauthenticated().user.name}'s profile`}</Link>
        </li>
        </>
        )}
        
        </ul>
    </div>
  </div>
    </div>
);
    
export default withRouter(Menu);