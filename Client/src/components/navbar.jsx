import React from "react";
import { Link } from "react-router-dom";
import { User } from "phosphor-react";
import { Bell } from "phosphor-react";
import { House } from "phosphor-react";
import { FirstAidKit } from "phosphor-react";
import { Robot } from "phosphor-react";
import {MagnifyingGlass} from "phosphor-react";
import "./navbar.css";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
export const Navbar = () => {

  const { user } = useContext(UserContext)
  console.log("User context value:", user);

  if(user){
    return(
      
      <div className="navbar">
      <div className="links">
        
      {user && user.isDoctor == true && <Link to="/doctor">Doctor</Link>}
        <Link to="/">
          <House size={32} />
        </Link>
        <Link to="/notify">
          <Bell size={32} />
        </Link>
        <Link to="/account">
          <User size={32} />
        </Link>
        <Link to="/appointments">
          <FirstAidKit size={32} />
        </Link>
        <Link to="/AI">
          <Robot size={32} />
        </Link>
        <Link to="/search">
        <MagnifyingGlass size={32} />
        </Link>
        <Link to="/logout">Logout</Link>
        
      </div>
      
    </div>
)
}
if(!user){
  return (
    <div className="navbar">
      <div className="links">
        <Link to="/">
          <House size={32} />
        </Link>
        <Link to="/notify">
          <Bell size={32} />
        </Link>
        <Link to="/account">
          <User size={32} />
        </Link>
        <Link to="/appointments">
          <FirstAidKit size={32} />
        </Link>
        <Link to="/AI">
          <Robot size={32} />
        </Link>
        <Link to="/search">
        <MagnifyingGlass size={32} />
        </Link>
        <Link to="/login">Login</Link>
        
      </div>
      
    </div>
  );
}
};
