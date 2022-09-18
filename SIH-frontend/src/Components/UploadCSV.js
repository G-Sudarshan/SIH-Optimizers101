import React, { useState } from "react";
import { Modal, ModalBody, Button, Container, Card, CardBody, Input} from 'reactstrap'
import IndexNavbar from "./Navbars/IndexNavbar";
import styles from "./modal.module.css"; 
import DarkFooter from "./Footers/DarkFooter";

import {FileUploader} from "react-drag-drop-files";

const fileTypes = ["CSV"];

const UploadCSV = () => {
  const [file,setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
    console.log(file);
  };


  const handleSubmit = () => {
    
  }

  return (
    <div>
      <IndexNavbar isfixed={true}/>
      <Container style={{"marginTop":"80px"}}>
      <Card>
        <CardBody>
    
        <div className={styles.title}>
          <h4 className="title title-up">Upload Placement Record</h4>
        </div>
        <div>
        <FileUploader handleChange={handleChange} name="file" types={fileTypes} classes={styles.fileupload} />
   
        </div>

        <div className={styles.bottom_btn}>
          <Button className="btn btn-info image-btn" type="button">
            Submit
          </Button>

        </div>
      
          
        </CardBody>
      </Card>
      </Container>
      <div style={{"position":"absolute", "width":"100%", "bottom":0}}>
      <DarkFooter/>

      </div>
    </div>
  );
};

export default UploadCSV;
