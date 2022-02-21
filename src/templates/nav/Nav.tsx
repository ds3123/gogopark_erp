import React from "react" ;
import Logo from "templates/nav/Logo"
import Nav_Options from "templates/nav/Nav_Options";

const Nav = () => {

    return <nav className="navbar is-transparent is-hidden-mobile">

              <Logo />
              <Nav_Options />

           </nav> ;

} ;

export default Nav ;