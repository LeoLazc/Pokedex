import React from "react";
import Dashboard from '../Layout/Dashboard';


function NavBar() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark navbar-fixed-left">
          <div>
          <a className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center" href="">Pokedex</a>
          </div>
          <Dashboard/>
        </nav>
      </div>
    );
}

export default NavBar;
