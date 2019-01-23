import React from 'react';
import { Link } from 'react-router-dom';


const ProfileActions = () => {
     return (
          <div className="btn-group mb-4" role="group">

               <Link to="/edit-profile" className="btn btn-light">
                    <i className="fas fa-user-circle text-info mr-1"></i>
                    Edit Profile</Link>

               <Link to="/add-experience" className="btn btn-light">
                    <i className="fab fa-black-tie text-info mr-1"></i>
                    Add Experience</Link>

               <Link to="/add-background" className="btn btn-light">
           <i className="fa fa-briefcase text-info mr-1"></i>
                    Add Background</Link>
          </div>
     )
}

export default ProfileActions;
