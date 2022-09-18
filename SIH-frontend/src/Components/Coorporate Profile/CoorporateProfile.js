import React, { useRef, useState, useEffect } from "react";
// reactstrap components
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  NavItem,
  Button,
  TabContent,
  TabPane,
  Modal,
  ModalBody,
  Input
} from "reactstrap";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import DatamapsIndia from "react-datamaps-india";
import ScrollIntoView from "react-scroll-into-view";
import useIntersection from "Components/CustomHooks/useIntersection";
import DefaultFooter from "Components/Footers/DefaultFooter.js";
import { BarOptions, MapLayout } from "../Graph_options"; // graph static data
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import highcharts3d from "highcharts/highcharts-3d";
import styles from "../profile.module.css";
import IndexNavbar from "Components/Navbars/IndexNavbar";
import CoorporateHeader from "./CoorporateHeader";

import { Dropdown, Selection } from "react-dropdown-now";
import "react-dropdown-now/style.css";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import classes from "./corporate.module.css";

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import {
  yearOptions,
  programOptions,
  instituteTypes,
  statesOptions,
} from "../AICTE Profile/DropdownOptions";
// sample dataset for graphs ************** to be removed upon integration
import { PieData } from "../dataset";
import { baseurl } from "Components/baseUrl";
import DarkFooter from "Components/Footers/DarkFooter";

import PropTypes from "prop-types";
import {
  useAutocomplete,
  AutocompleteGetTagProps,
} from "@mui/base/AutocompleteUnstyled";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material/Autocomplete";
// import {MaterialTable} from '@material-ui/core';
import MaterialTable from "material-table";

import { top100Films } from "./Autocomplete"; 

import stat_img1 from "../../assets/img/glp1.png";
import stat_img2 from "../../assets/img/glp2.png";
import stat_img3 from "../../assets/img/glp3.png";

const Root = styled("div")(
  ({ theme }) => `
  color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"
  };
  font-size: 16px;
`
);

const Label = styled("label")`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled("div")(
  ({ theme }) => `
  width: 300px;
  border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
  }

  &.focused {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    color: ${
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.65)"
        : "rgba(0,0,0,.85)"
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`
);

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon
        onClick={onDelete}
        className={styles.cls_icon}
        style={{ fontSize: "22px" }}
      />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "#fafafa"
  };
  border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`
);

const Listbox = styled("ul")(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
);

function CoorporateProfile() {

  const [sliderValue, setSliderVal] = React.useState([5, 10]);
  const [emailList, setemailList] = useState([]);
  const [statCards, setstatCards] = useState();

  const [modal1, setModal1] = useState(false);
  const [smstext, setsmstext] = useState("");


  const [tableData, settableData] = useState([]);

  const [filters, setfilters] = useState({
    year: "2022",
    branch: "All",
  });


  const setStatCards = async() => {
       
    let data = {
      year: filters.year === "All" ? "" : parseInt(filters.year),
      // gender: filters.gender === "Female" ? "Female" : "",
      gender:"",
      state: "",
      institutionType: "",
      minority: "",
    };
    try {
      const p = await axios.post(
        "https://optimizers-sih-backend.herokuapp.com/api/v1/chart/programWisePlacement",
        data
      );    
    
      let statplaced = 0;
      let statunplaced = 0;
      p.data.map((obj) => {
        statplaced += obj.placedStudentCount;
        statunplaced += obj.unplacedStudentCount;
      });

      let total_institutions = 
      {
        label: "Unplaced",
        value: statunplaced,
      }
    
    let total_students = {
      label: "Total Students",
      value: statplaced+statunplaced
    }

    let total_placed = {
      label: "Placed",
      value: statplaced
    }

    let obj_stat = {total_institutions, total_students, total_placed};
    // console.log(obj_stat);
    setstatCards(obj_stat);

    } catch (error) {
      console.log(error);
    }

  }

  const getTableData = async () => {
    let skill_temp = [];
    value.map((obj) => {
      return skill_temp.push(obj.title);
    });
    let data = {
      year: filters.year === "All" ? "" : parseInt(filters.year),
      branch: filters.branch === "All" ? "" : filters.branch,
      minCGPA: sliderValue[0],
      maxCGPA: sliderValue[1],
      skills: skill_temp,
    };

    try {
      const res = await axios.post(
        "https://optimizers-sih-backend.herokuapp.com/api/v1/student/getAllStudentsByYearAndBranch",
        data
      );

      let temp2 = [];
      let temp;
      res.data.map((obj, id) => {
        temp = {};
        temp.id = id + 1;
        temp.name = obj.name;
        temp.email = obj.emailID;
        temp.year = obj.year;
        temp.branch = obj.branch;
        temp.skills = obj.skills;
        temp.cgpa = obj.cgpa;
        temp2.push(temp);
      });

      // console.log(temp2);
      settableData(temp2);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStudentSelection = (indices) => {
    let emails = [];
    indices.map((ind) => {
      return emails.push(tableData[ind - 1].email);
    });

    console.log(emails);
    setemailList(emails);
  };

  const sendMail = async () => {
    let data = {
      from: "sardarshubham17@gmail.com",
      to: emailList,
      subject: "Hello , Congratulations for getting shortlisted at Microsoft!",
      text: "Hi Sudarshan,You are shortlisted for interview rounds at FamPay.Thank you for your interest in joining our mission at FamPay. We were super impressed by your work and background and would like to share an assignment for the next steps for your application. Please let us know by when you want us to schedule interview Looking forward to hearing back from you! Best, HR",
    };

    try {
      const res = await axios.post(
        "https://optimizers-sih-backend.herokuapp.com/api/v1/email/sendEmail",
        data
      );

      console.log(res);
      alert("Email Sent Successfully");
    } catch (err) {
      console.log(err);
    }
  };


  const sendSMS = async()=>{
    let data = {
      "body": smstext,
      "to": "+917030970237"
    };


    try{
      const res = await axios.post(
        "https://sih-with-sms.herokuapp.com/api/v1/sms/send_sms",
        data
      );
      console.log(res);
      alert("SMS sent Successfully! ");
    } catch(err){
      console.log(err);
    }
  }

  const handleSliderChange = (event, newValue) => {
    setSliderVal(newValue);
    // setValue(newValue);
  };

  // autocomplete comp
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",
    defaultValue: [top100Films[1]],
    multiple: true,
    options: top100Films,
    getOptionLabel: (option) => option.title,
  });

  useEffect(() => {
    getTableData();
    setStatCards();
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  // to update graphs
  useEffect(() => {
    getTableData();
    setStatCards();
  }, [filters, sliderValue, value]);

  highcharts3d(Highcharts);

  ChartJS.register(
    Legend,
    Tooltip,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const pieRef = useRef();
  const barRef = useRef();
  const diversityBarRef = useRef();
  const mapRef = useRef();

  // for rendering list via map functionality ************* to be removed
  const statArray = [
    {
      label: "Total Students",
      value: 2401,
    },
    {
      label: "Placed Students",
      value: 1800,
    },
    {
      label: "Unplaced Students",
      value: 601,
    },
    // {
    //   label: "Male",
    //   value: 17,
    // },
    // {
    //   label: "Female",
    //   value: 4,
    // },
    // {
    //   label: "Minority",
    //   value: 1,
    // },
  ];

  const filterArray = [1, 2, 3];

  const [iconPills, setIconPills] = React.useState("1");

  const columns = [
  //   { field: "id", headerName: "Sr. No", width: 50,       headerClassName:styles.table__header,
  // },
    {
      field: "name",
      headerName: "Name",
      headerClassName:styles.table__header,
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 100,
      // valueGetter: (params: GridValueGetterParams) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    { field: "email", headerName: "Email ID", width: 230 ,       headerClassName:styles.table__header,
  },
    { field: "branch", headerName: "Branch", width: 210,       headerClassName:styles.table__header,
  },
    {
      field: "year",
      headerName: "Graduation Year",
      headerClassName:styles.table__header,

      // type: "number",
      width: 150,
    },
    {
      field: "cgpa",
      headerName: "CGPA",
      headerClassName:styles.table__header,

      // width:100
    },
    {
      field: "skills",
      headerName: "Skills",
      headerClassName:styles.table__header,

      // width:100
    },
  ];

  return (
    <div className="wrapper">
      <IndexNavbar />
      <CoorporateHeader />
      <div className={`section ${styles.profile_body}`}>
        <div className={`container ${styles.graph_container}`}>
          <Row>
            
              
           
              <div class="col-xxl-3 col-md-4">
              <Card className={styles.stat_card}>
                <CardBody>
                  <span className={styles.stat_header}>
                  {statCards && statCards.total_students.label}
                   <span>| 2022</span></span>
                  <div
                    className="d-flex align-items-center"
                    style={{ height: "75px" }}
                  >
                    <div
                      className=" btn-icon btn-round btn btn-github "
                      style={{ background: "#f6f6fe" }}
                    >
                      {/* <i className="now-ui-icons users_single-02"></i> */}
                       
                      <img src={stat_img2}/>
                    </div>
                    <div class="ps-3">
                      <span className={styles.stat_value}>
                      {statCards && statCards.total_students.value}
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>


            <div class="col-xxl-3 col-md-4">
              <Card className={styles.stat_card}>
                <CardBody>
                  <span className={styles.stat_header}>
                  {statCards && statCards.total_placed.label}
                   <span>| 2022</span></span>
                  <div
                    className="d-flex align-items-center"
                    style={{ height: "75px" }}
                  >
                    <div
                      className=" btn-icon btn-round btn btn-github "
                      style={{ background: "#f6f6fe" }}
                    >
                      {/* <i className="now-ui-icons users_single-02"></i> */}
                       
                      <img src={stat_img3}/>
                    </div>
                    <div class="ps-3">
                      <span className={styles.stat_value}>
                      {statCards && statCards.total_placed.value}
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>


            <div class="col-xxl-3 col-md-4">
              <Card className={styles.stat_card}>
                <CardBody>
                  <span className={styles.stat_header}>
                    {statCards && statCards.total_institutions && statCards.total_institutions.label}
                    {/* {statCards.total_institutions} */}
                   <span>| 2022</span></span>
                  <div
                    className="d-flex align-items-center"
                    style={{ height: "75px" }}
                  >
                    <div
                      className=" btn-icon btn-round btn btn-github "
                      style={{ background: "#f6f6fe" }}
                    >
                      {/* <i className="now-ui-icons users_single-02"></i> */}
                       
                      <img src={stat_img1}/>
                    </div>
                    <div class="ps-3">
                      <span className={styles.stat_value}>
                      {statCards && statCards.total_institutions.value}
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

                
            
          </Row>
        </div>

        <div className={`container ${styles.graph_container}`}>
          <Row>
            <Col md="3" className={styles.sticky__index}>
              <Card style={{ height: "500px" }}>
                <CardBody>
                  <h3>Filters</h3>
                  <div className={styles.drpwrapper}>
                    <span className={styles.filter_label}>Year</span>
                    {/* academic year filter */}
                    <Dropdown
                      placeholder="Select year"
                      className="my-className"
                      options={yearOptions}
                      value={filters.year}
                      onChange={(item) =>
                        setfilters({ ...filters, year: item.value })
                      }
                      // onSelect={(value) => console.log('selected!', value)} // always fires once a selection happens even if there is no change
                      // onClose={(closedBySelection) =>
                      //   closedBySelection && updategraphs()
                      // }
                    />
                  </div>

                  <div className={styles.drpwrapper}>
                    <span className={styles.filter_label}>Branch</span>
                    {/* program filter */}
                    <Dropdown
                      placeholder="Select Branch"
                      className="my-className"
                      options={[
                        "All",
                        "Computer Engineering",
                        "Information Technology",
                        "Electronics and telecommunication",
                        "Electrical Engineering",
                        "Mechinical Engineering",
                        "Civil Engineering",
                      ]}
                      value={filters.branch}
                      onChange={(item) =>
                        setfilters({ ...filters, branch: item.value })
                      }
                    />
                  </div>

                  <span className={styles.filter_label}>CGPA</span>
                  <Box sx={{ width: 250 }}>
                    <Slider
                      // getAriaLabel={() => 'Temperature range'}
                      min={0}
                      max={10}
                      marks={[
                        {
                          value: 1,
                          label: "1",
                        },
                        {
                          value: 2,
                          label: "2",
                        },
                        {
                          value: 3,
                          label: "3",
                        },
                        {
                          value: 4,
                          label: "4",
                        },
                        {
                          value: 5,
                          label: "5",
                        },
                        {
                          value: 6,
                          label: "6",
                        },
                        {
                          value: 7,
                          label: "7",
                        },
                        {
                          value: 8,
                          label: "8",
                        },
                        {
                          value: 9,
                          label: "9",
                        },
                        {
                          value: 10,
                          label: "10",
                        },
                      ]}
                      value={sliderValue}
                      onChange={handleSliderChange}
                      valueLabelDisplay="auto"
                      // getAriaValueText={valuetext}
                    />
                  </Box>

                  <Root>
                    <div {...getRootProps()}>
                      <Label
                        {...getInputLabelProps()}
                        className={styles.filter_label}
                      >
                        Skills
                      </Label>

                      <InputWrapper
                        ref={setAnchorEl}
                        className={focused ? "focused" : ""}
                        style={{"width":"100%"}}
                      >
                        {value.map((option, index) => (
                          <StyledTag
                            label={option.title}
                            {...getTagProps({ index })}
                          />
                        ))}
                        <input {...getInputProps()} />
                      </InputWrapper>
                    </div>

                    {groupedOptions.length > 0 ? (
                      <Listbox {...getListboxProps()}>
                        {groupedOptions.map((option, index) => (
                          <li {...getOptionProps({ option, index })}>
                            <span>{option.title}</span>
                            <CheckIcon fontSize="small" />
                          </li>
                        ))}
                      </Listbox>
                    ) : null}
                  </Root>
                </CardBody>
              </Card>
            </Col>

            <Col md="9" className={styles.graphs_left}>
              <Card className={classes.graphs__mainCard}>
                <CardHeader></CardHeader>
                <CardBody>
                  <div style={{ height: 400, width: "100%" }}>


<div style={{"height":"370px"}}>
                    <DataGrid
                    // autoHeight
                      rows={tableData}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[6]}
                      className={classes.datagrid}
                      checkboxSelection
                      // onSelectionModelChange={r=>console.log(r)}
                      onSelectionModelChange={(list) =>
                        handleStudentSelection(list)
                      }
                    />

</div>
                    <Row className={classes.send___row}>
                      <Col>
                        <Button onClick={() => sendMail()} color="info">
                          Send Email
                        </Button>
                      </Col>

                      <Col>
                        <Button onClick={() => setModal1(true)} color="info">
                          Send SMS
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>
              {/* Program wise placement graph */}
            </Col>
          </Row>
        </div>
      </div>




      <Modal isOpen={modal1} toggle={() => setModal1(false)}>
                <div className="modal-header justify-content-center">
                  <button
                    className="close"
                    type="button"
                    onClick={() => setModal1(false)}
                  >
                    <i className="now-ui-icons ui-1_simple-remove"></i>
                  </button>
                  <h4 className="title title-up">Add SMS Body below</h4>
                </div>
                <ModalBody>

                  <input type="textarea" 
                    value={smstext}
                    onChange= {(e)=>setsmstext(e.target.value)}
                  className={classes.sms__text}/>
           

                </ModalBody>

                <div className="modal-footer">
                  <Button className="btn btn-success image-btn" 
                  onClick={sendSMS}
                  type="button">
                    Submit
                  </Button>
                  <Button
                    className="image-btn btn btn-danger"
                    type="button"
                    onClick={() => setModal1(false)}
                  >
                    Close
                  </Button>
                </div>
              </Modal>



      <DarkFooter />
      {/* <DefaultFooter /> */}
    </div>
  );
}

export default CoorporateProfile;
