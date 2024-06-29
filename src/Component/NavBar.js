import React from "react";
import "./CSS/NavBar.css"

const NavBar = () => {
  return (
    <div>
      <nav className="navbar fixed-top">
        <div className="container-fluid d-flex justify-content-start">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-start"
            // tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Yelow OWL
              </h5>
            </div>
            <p>Admin</p>
          </div>
          <a className="navbar-brand" href="/">
            Students
          </a>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
