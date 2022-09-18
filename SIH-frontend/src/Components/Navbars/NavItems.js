import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseurl } from "Components/baseUrl";

// reactstrap components
import {Nav, NavItem, NavLink} from "reactstrap";

import React from 'react';
import styles from './nav.module.css';

const NavItems = ({role, togglelogin, removerole, userId}) => {

    const nav = useNavigate();
  
    const handlelogout = () => {
      axios
        .get(baseurl+"/user/logout")
        .then((res)=>{
          console.log(res);
          alert("Logout Successfull");
          removerole();
          localStorage.removeItem('role');
          localStorage.removeItem('userid');
          nav("/homepage");
        }
        );
    }
  
    switch(role){
      case "college":
        return(
          <>
          <NavItem>
          <NavLink onClick={()=>nav('/upload-record')}>
          <a className={styles.nav_item}>Placement Record</a> 
            </NavLink>
          </NavItem>

          <NavItem>
          <NavLink onClick={()=>handlelogout()}>
          <a className={styles.nav_item}>Logout</a> 
            </NavLink>
          </NavItem>
          </>
        )
      case "corporate":
        return(
          <>
            <NavItem>
              <NavLink onClick={() => nav("/corporate-profile")}>
              <a className={styles.nav_item}>Dashboard</a> 
              </NavLink>
            </NavItem>
  
            {/* <NavItem>
              <NavLink onClick={() => nav("/aicte-profile")}>
              <a className={styles.nav_item}>Placement Statistics</a> 
            </NavLink>
            </NavItem> */}

            <NavItem>
            <NavLink onClick={()=>handlelogout()}>
            <a className={styles.nav_item}>Logout</a> 
              </NavLink>
            </NavItem>
          </>
        );
      case "aicte":
        return(
          <>
            {/* <NavItem >
              <NavLink onClick={() => nav("/aicte-profile")}>
              <a className={styles.nav_item}>Placement Statistics</a> 
                </NavLink>
            </NavItem> */}

            <NavItem>
            <NavLink onClick={()=>handlelogout()}>
            <a className={styles.nav_item}>Logout</a> 
              </NavLink>
            </NavItem>
          </>
        );
      default:
        return(
            <>
             {/* <NavItem >
              <NavLink onClick={() => nav("/aicte-profile")}>
              <a className={styles.nav_item}>Placement Statistics</a> 
                </NavLink>
            </NavItem> */}
              <NavItem>
                <NavLink onClick={() => nav("/sign-up")}>
                <a className={styles.nav_item}>Sign-Up</a> 
                  </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => togglelogin()}>
                <a className={styles.nav_item}> Sign-In</a> 
                 
                </NavLink>
              </NavItem>
            </>
        );
    }
  }

  export default NavItems;