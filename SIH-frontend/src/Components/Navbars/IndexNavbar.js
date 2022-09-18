import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// reactstrap components
import {Button, Modal, ModalBody,ModalHeader, ModalFooter, Collapse, NavbarBrand, Navbar, NavItem, NavLink, Nav, Container, InputGroup, Input, InputGroupText,InputGroupAddon} from "reactstrap";
import NavItems from "./NavItems";
import UploadCSV from "Components/UploadCSV";
import Login from "Components/Login";
import React from 'react';
import styles from './nav.module.css';


import logo from '../../assets/img/favicon.png';

function IndexNavbar({isfixed}) {


  const [navbarColor, setNavbarColor] = useState("navbar-transparent");
  const [position, setPosition] = useState("fixed");
  const [collapseOpen, setCollapseOpen] = useState(false);




  const [modal2, setModal2] = useState(false);
  const [reasonsModal, setReasonsModal] = useState(false);
  const [role, setrole] = useState("");
  const [userId, setUserId] = useState("");

  const nav = useNavigate();

  useEffect(()=>{
    // cheking if user is already logged in 
    if (isfixed){
      // setNavbarColor("primary");
      setPosition("relative");
    }

    let checkrole = localStorage.getItem('role');
    console.log(checkrole);
    if (checkrole){
      setrole(checkrole);
    }

  },[])
  
  useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };


    
  });

  

  const togglelogin = () => setModal2(!modal2);
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}



      
      {/* <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info"> */}
      <Navbar className={`fixed-top white ${styles.nav__main}`} expand="lg" light color="white">
        {/* <Container> */}
          {/* <div className="navbar-translate"> */}
            <NavbarBrand
              target="_blank"
              id="navbar-brand"
              onClick={() => nav("/homepage")}
              className = {`navbar-brand  ${styles.nvBrand}`}
              // className={styles.nvBrand}
            >

  
              <img src={logo} width="30" height="24" className={styles.nav_logo}/>
              Campus Placement
            </NavbarBrand>
  
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          {/* </div> */}
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar className={styles.navitems_wrapper}>
              {/* custom nav links */}
              {}
              <NavItems role={role} togglelogin={togglelogin} removerole={()=>setrole("none")} userId={userId}/>


              {/* // sign in modal */}
              <Login isopen={modal2} togglemodal={togglelogin} passRole={(val)=>setrole(val)} setId={val=>setUserId(val)}/>


              

              {/* view reasons of unemployability modal */}
              <Modal
                isOpen={reasonsModal}
                toggle={() => setReasonsModal(false)}
              >
                <ModalHeader toggle={() => setReasonsModal(false)}>
                  Modal title
                </ModalHeader>
                <ModalBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                  <Button color="primary">Do Something</Button>{" "}
                  <Button
                    color="secondary"
                    onClick={() => setReasonsModal(false)}
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </Nav>
          </Collapse>
        {/* </Container> */}
      </Navbar>
    </>
  );
}

export default IndexNavbar;
