import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function CoorporateHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <>
      <div
        className="page-header clear-filter page-header-small"
        filter-color="blue"
      >
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/c2.jpg") + ")"
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="photo-container" style={{"borderRadius":"0"}}>
            <img alt="..." src={require("assets/img/microsoft_logo.png")}></img>
          </div>
          <h3 className="title">Microsoft</h3>
          <p className="category">We believe in what people make possible.</p>
          {/* <div className="content">
            <div className="social-description">
              <h2>8999</h2>
              <p>Total Institutions</p>
            </div>
            <div className="social-description">
              <h2>21M</h2>
              <p>Total Students</p>
            </div>
          </div> */}
        </Container>
      </div>
    </>
  );
}

export default CoorporateHeader;
