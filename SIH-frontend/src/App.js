
import './App.css';
import { Routes, Route} from 'react-router-dom';

// styles for this kit
import "./assets/css/bootstrap.min.css";
import "./assets/scss/now-ui-kit.scss?v=1.5.0";
import "./assets/demo/demo.css?v=1.5.0";
import "./assets/demo/nucleo-icons-page-styles.css?v=1.5.0";

import NucleoIcons from 'views/NucleoIcons';
import Landing from 'Components/Landing Page/Landing';
import CoorporateProfile from 'Components/Coorporate Profile/CoorporateProfile';
import AICTE_Profile from 'Components/AICTE Profile/AICTE_Profile';
import UploadCSV from 'Components/UploadCSV';
import Login from 'Components/Login/Login';
import BranchWise from 'Components/AICTE Profile/BranchWise';


function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<AICTE_Profile/>}/>
          <Route path="/homepage" element={<AICTE_Profile/>}/>
          <Route path="/sign-up" element={<Login/>}/>
          <Route path="/icons" element={<NucleoIcons/>}/>
          {/* <Route path="/homepage" element={<Landing/>}/> */}
          <Route path="/upload-record" element={<UploadCSV/>}/>
          <Route path="/corporate-profile" element={<CoorporateProfile/>}/>
          {/* <Route path="/aicte-profile" element={<AICTE_Profile/>}/> */}
          <Route path="/branch-wise" element={<BranchWise/>}/>
          <Route path="/sign-in" element={<Login/>}/>
        </Routes>
    </div>
  );
}

export default App;
