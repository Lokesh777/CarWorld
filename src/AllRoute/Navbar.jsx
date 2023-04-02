import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import React, { useState, useRef, useEffect } from "react";

const links = [
  { path: "/cardata", title: "All Data" },
  { path: "/userlist", title: "Users List" },
  { path: "/carage", title: "Car Age by Year" },
  { path: "/barchart", title: "Country Bar Chart" },
  { path: "/carmodel", title: "Car Model Pie Chart" },
];

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    togglePopup();
  };

  const handleLinkClick = () => {
    setShowMenu(false);
    togglePopup();
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={styles.navbar}>
      <button className={styles.hamburger} onClick={toggleMenu}>
       {
        showMenu ? (
          <div>❌</div>
        )
        :(<>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </>
        )
       }
     
      </button>
      
          <NavLink
              className={styles.navLink}
              activeClassName={styles.active}
              to='/'
            ><h2 className={styles.logoImg}>
               Car World
              </h2>
            </NavLink>
      
      <ul className={styles.navLinks}>
        {links.map((item) => (
          <li key={item.path}>
            <NavLink
              className={styles.navLink}
              activeClassName={styles.active}
              to={item.path}
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>

      {isOpen && (
          <div className={styles.dropPopPup}>
               <ul >
                {links.map((item) => (
                  <p key={item.path} 
                  className={styles.dropdownItem}
                  onClick={handleLinkClick}>
                    <NavLink
                      className={styles.dropdownLink}
                      activeClassName={styles.active}
                      to={item.path}
                    >
                      {item.title}
                    </NavLink>
                  </p>
                ))}
                </ul>
           </div>
        )}

    </nav>
  );
}
