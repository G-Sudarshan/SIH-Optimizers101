import React, {useEffect}from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  TabContent,
  TabPane,
  Row,
  NavLink,
  NavItem,
  Nav,
} from "reactstrap";
import IndexNavbar from "Components/Navbars/IndexNavbar";
// core components
import ExamplesNavbar from "Components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "Components/Footers/TransparentFooter.js";


function Login() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);

  const [pills, setPills] = React.useState("2");
  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  return (
    <>
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/login.jpg") + ")",
          }}
        ></div>
        <div className="content">
          <IndexNavbar isfixed={false}/>
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="6">
                <h4 className="title text-center">Sign Up</h4>
                <div className="nav-align-center">
                  <Nav
                    className="nav-pills-info nav-pills-just-icons"
                    pills
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        className={pills === "1" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("1");
                        }}
                      >
                        <i className="now-ui-icons business_briefcase-24"></i>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "2" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("2");
                        }}
                      >
                        <i className="now-ui-icons location_world"></i>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "3" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("3");
                        }}
                      >
                        <i className="now-ui-icons sport_user-run"></i>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </Col>
              <TabContent className="gallery" activeTab={"pills" + pills}>
                <TabPane tabId="pills1">
                  <Col className="ml-auto mr-auto" md="4">
                    <Card className="card-login card-plain">
                      <Form action="" className="form" method="">
                        <CardHeader className="text-center">
                          <div className="logo-container">
                            {/* <i
                              alt="..."
                              className="now-ui-icons business_briefcase-24"
                            /> */}
                            <span>Coorporate</span>
                          </div>
                        </CardHeader>
                        <CardBody>
                          <InputGroup
                            className={
                              "no-border input-lg" +
                              (firstFocus ? " input-group-focus" : "")
                            }
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="now-ui-icons users_circle-08"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="First Name..."
                              type="text"
                              onFocus={() => setFirstFocus(true)}
                              onBlur={() => setFirstFocus(false)}
                            ></Input>
                          </InputGroup>
                          <InputGroup
                            className={
                              "no-border input-lg" +
                              (lastFocus ? " input-group-focus" : "")
                            }
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="now-ui-icons text_caps-small"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Last Name..."
                              type="text"
                              onFocus={() => setLastFocus(true)}
                              onBlur={() => setLastFocus(false)}
                            ></Input>
                          </InputGroup>
                        </CardBody>
                        <CardFooter className="text-center">
                          <Button
                            block
                            className="btn-round"
                            color="info"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            size="lg"
                          >
                            Get Started
                          </Button>
                          <div className="pull-left">
                            <h6>
                              <a
                                className="link"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Create Account
                              </a>
                            </h6>
                          </div>
                          <div className="pull-right">
                            <h6>
                              <a
                                className="link"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Need Help?
                              </a>
                            </h6>
                          </div>
                        </CardFooter>
                      </Form>
                    </Card>
                  </Col>
                </TabPane>
                <TabPane tabId="pills2">
                  <Col className="ml-auto mr-auto" md="4">
                    <Card className="card-login card-plain">
                      <Form action="" className="form" method="">
                        <CardHeader className="text-center">
                          <div className="logo-container">
                            {/* <img
                              alt="..."
                              src={require("assets/img/aicteLogo.png")}
                            ></img> */}
                            <span>AICTE</span>
                          </div>
                        </CardHeader>
                        <CardBody>
                          <InputGroup
                            className={
                              "no-border input-lg" +
                              (firstFocus ? " input-group-focus" : "")
                            }
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="now-ui-icons users_circle-08"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="First Name..."
                              type="text"
                              onFocus={() => setFirstFocus(true)}
                              onBlur={() => setFirstFocus(false)}
                            ></Input>
                          </InputGroup>
                          <InputGroup
                            className={
                              "no-border input-lg" +
                              (lastFocus ? " input-group-focus" : "")
                            }
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="now-ui-icons text_caps-small"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Last Name..."
                              type="text"
                              onFocus={() => setLastFocus(true)}
                              onBlur={() => setLastFocus(false)}
                            ></Input>
                          </InputGroup>
                        </CardBody>
                        <CardFooter className="text-center">
                          <Button
                            block
                            className="btn-round"
                            color="info"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            size="lg"
                          >
                            Get Started
                          </Button>
                          <div className="pull-left">
                            <h6>
                              <a
                                className="link"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Create Account
                              </a>
                            </h6>
                          </div>
                          <div className="pull-right">
                            <h6>
                              <a
                                className="link"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Need Help?
                              </a>
                            </h6>
                          </div>
                        </CardFooter>
                      </Form>
                    </Card>
                  </Col>
                </TabPane>
                <TabPane tabId="pills3">
                  <Col className="ml-auto mr-auto" md="4">
                    <Card className="card-login card-plain">
                      <Form action="" className="form" method="">
                        <CardHeader className="text-center">
                          <div className="logo-container">
                            {/* <img
                              alt="..."
                              src={require("assets/img/aicteLogo.png")}
                            ></img> */}
                            <span>College</span>
                          </div>
                        </CardHeader>
                        <CardBody>
                          <InputGroup
                            className={
                              "no-border input-lg" +
                              (firstFocus ? " input-group-focus" : "")
                            }
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="now-ui-icons users_circle-08"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="First Name..."
                              type="text"
                              onFocus={() => setFirstFocus(true)}
                              onBlur={() => setFirstFocus(false)}
                            ></Input>
                          </InputGroup>
                          <InputGroup
                            className={
                              "no-border input-lg" +
                              (lastFocus ? " input-group-focus" : "")
                            }
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="now-ui-icons text_caps-small"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Last Name..."
                              type="text"
                              onFocus={() => setLastFocus(true)}
                              onBlur={() => setLastFocus(false)}
                            ></Input>
                          </InputGroup>
                        </CardBody>
                        <CardFooter className="text-center">
                          <Button
                            block
                            className="btn-round"
                            color="info"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            size="lg"
                          >
                            Get Started
                          </Button>
                          <div className="pull-left">
                            <h6>
                              <a
                                className="link"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Create Account
                              </a>
                            </h6>
                          </div>
                          <div className="pull-right">
                            <h6>
                              <a
                                className="link"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Need Help?
                              </a>
                            </h6>
                          </div>
                        </CardFooter>
                      </Form>
                    </Card>
                  </Col>
                </TabPane>
              </TabContent>
            </Row>
          </Container>
        </div>
        <TransparentFooter />
      </div>
    </>
  );
}

export default Login;
