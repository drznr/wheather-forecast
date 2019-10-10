import React from 'react';
import { useEffect } from 'react';
import {  withRouter, Link } from 'react-router-dom';

function Navbar(props) {
  let homeLink = React.createRef(),
   favsLink = React.createRef();
   useEffect(() => {
    if (props.location.pathname === "/favorites") {
      homeLink.current.classList.remove('active');
      favsLink.current.classList.add('active');
    } else {
      homeLink.current.classList.add('active');
      favsLink.current.classList.remove('active');
    }
  });
  
  function togggleTheme() {
    document.querySelector('body').classList.toggle('bright');
    document.querySelector('.app').classList.toggle('bright');
    document.querySelector('.navbar').classList.toggle('bright');
    for (let i = 0; i < document.querySelectorAll('.favorites_city').length; i++) {
      document.querySelectorAll('.favorites_city')[i].classList.toggle('bright');
    }
    for (let i = 0; i < document.querySelectorAll('.forecast_content_day').length; i++) {
      document.querySelectorAll('.forecast_content_day')[i].classList.toggle('bright');
    }
  }
  return (
    <nav className="navbar">
      <h2>herolo wheather task</h2>
      <button className="navbar_theme" onClick={togggleTheme}>theme</button>
      <ul className="navbar_nav">
        <li className="navbar_nav_item"><Link ref={homeLink} className="navbar_nav_item_link active" to="/home">home</Link></li>
        <li className="navbar_nav_item"><Link ref={favsLink} className="navbar_nav_item_link" to="/favorites">favorites</Link></li>
      </ul>
    </nav>
  );
}

export default withRouter(Navbar);