import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated, signout } from '../auth';
import {remove} from './apiUser';

class DeleteUser extends Component {
     state={
         redirectToHome:false
     }

    deleteconfirmed=()=>{
        const token=isAuthenticated().token;
        const userId=this.props.userId;
           remove(userId,token)
           .then(data=>{
               if(data.error)
               {
                   console.log(data.error);
               }
               else{
                  signout(()=>{console.log("user is deleted!")});
                   this.setState({redirectToHome:true});
               }
           }
           )
    }
    confirmDelete=()=>{
        const answer=window.confirm("Are you sure you want to delete your account?");
        if(answer)
        {
           this.deleteconfirmed();
        }
    }
    render() {
        if(this.state.redirectToHome)
        {
        return <Redirect to='/'/>
        }
        return (
            <button
            onClick={this.confirmDelete}
            className="btn btn-danger"
          >
            DELETE PROFILE
          </button>
        );
    }
}

export default DeleteUser;
