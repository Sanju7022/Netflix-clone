import React from "react";
import logo from "../../logo.png";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";

const Header = () => {
  return (
    <nav className="header">
      <img src={logo} alt="logo" />
      <div>
        <Link to="/tvshows">TV Shows</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/recent">Recently added</Link>
        <Link to="/mylist">My list</Link>
      </div>
      <BiSearch/>
    </nav>
  );
};

export default Header;
