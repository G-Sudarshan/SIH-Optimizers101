import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// reactstrap components
import { CardBody, Container, Card, Row } from "reactstrap";
import {Pie, Bar, Line} from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import IndexNavbar from "Components/Navbars/IndexNavbar";
import DarkFooter from "Components/Footers/DarkFooter";
// import { useNavigate } from "react-router-dom";
import { PieData } from "Components/dataset";


const BranchWise = () => {
    const nav = useNavigate();
  const [graphData, setgraphData] = useState({});

  const dataMapper = (data) => {
    console.log(data);
    console.log(Object.keys(data));
    // return { ids, placedCount, unplacedCount };
  };

  const fetchData = async() => {
    try {
      const res = await axios.get(
        "https://optimizers-sih-backend.herokuapp.com/api/v1/AICTE/GetReasonsFreaquencyMap"
      );
      setgraphData({
        reasons: Object.keys(res.data),
        count: Object.values(res.data)
      });


    } catch (error) {
      console.log(error);
    }
  }

  ChartJS.register(
    Legend,
    Tooltip,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const BarOptions = {
    responsive: true,
    // backgroundColor:"#FFFFFF",
    onClick: ()=>nav("/branch-wise"),
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Engineering Branches Placements",
      },
    },
  };

  useEffect(()=>{
    console.log(graphData);
  },[graphData])


  useEffect(() => {
    fetchData();
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
    <div>
      
      <IndexNavbar isfixed={true}/>
          <Container style={{"marginTop":"100px"}}>
            {/* <button onClick={()=>nav(-1)}>Back</button> */}
            
            <Card style={{"marginBottom":"100px"}}>
              
                <CardBody>
                    <div >
                        <h3> <span className="now-ui-icons arrows-1_minimal-left" 
                        style={{"marginRight":"20px"}}
                        onClick={()=>nav(-1)}></span>Branch Wise Placement in Percentage</h3>

                    </div>
                    <div style={{"height":"400px", "width":"400px", "margin":"auto"}}>

                <Pie data={PieData} />
                    </div>

                {/* <Line
                        options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              position: "top",
                            },
                            title: {
                              display: true,
                              text: "Branch Wise Placement",
                            },
                          },
                        }}
                        data={{
                            labels:["Computer Science", "IT", "ENTC", "Mechinical"],
                            datasets: [
                            //   {
                            //     label: 'Placed',
                            //     data: [650, 590, 800, 650],
                            //     borderColor: 'rgb(255, 99, 132)',
                            //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            //   },
                              {
                                label: 'Unplaced',
                                data:[430, 890, 670, 634],
                                borderColor: 'rgb(53, 162, 235)',
                                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                              },
                            ],
                          }}
                      /> */}

            {/* <Bar
              options={BarOptions}
              data={{
                labels: ["Comp", "IT", "Entc", "Civil", "Mechinical"],
                datasets: [
                  {
                    label: "Placed",
                    data: [15,14,8,9,3],
                    backgroundColor: "#2CA8FF",
                  },
                  {
                    label: "Unplaced",
                    data: [9,11,6,10,2],
                    backgroundColor: "#FFB236",
                  }
                ],
              }}
            /> */}
                </CardBody>
            </Card>

          </Container>

          <div style={{"position":"absolute", "width":"100%", "bottom":0}}>
      <DarkFooter/>

      </div>

    </div>
  );
}

export default BranchWise;