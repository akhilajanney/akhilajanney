import {React,Component} from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Configuration from './components/Configuration';
import Uploadmap from './components/Uploadmap.jsx'
import Asset from './components/Asset'
import Master from './components/Master';
import Slave from './components/Slave';
import Zoneconfig from './components/Zoneconfig';
import Realtime from './components/Realtime'
import Contacttrace from'./components/Contacttrace'
import Reports from './components/Reports'
import Thermalmap from './components/Thermalmap'
import Airquality from './components/Airquality'
import Systemhealth from './components/Systemhealth';
import Employeeregestration from './components/Employeeregestration';
import Tagallocation from './components/Tagallocation';
import Alerts from './components/Alerts';
import Sensors from './components/Sensors';
import Vehicle from './components/Vehicle';
import Allasset from './components/Allasset';
import Sensordetails from './components/Sensordetails';
import Vehicledetails from './components/Vehicledetails';



export default class App extends Component {
  constructor(){
    super();
    this.state={
      loggedin :false,
      status:'failed'
    }

  }
  login=()=>{
    // let data=localStorage.getItem('loggedin');
    // this.setState({status:data});

    let data=sessionStorage.getItem('login')
    this.setState({status:data});
  }
  componentDidMount(){
    // let data=localStorage.getItem('loggedin');
    // this.setState({status:data});
    let data=sessionStorage.getItem('login')
    this.setState({status:data});
  }
  render(){
    const { status } = this.state;
    // console.log('------', status);
    if (status === "failed" || status===null){
      return (
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route exact path="/login" element={<Login parentCallback = {this.login} />}  />
          </Routes>
        </Router>
      )
}
else{
  return (
    <div >
        <Router>  
          <Sidebar/>   
          <Navbar/>
        {/* <Home/> */}
        {/* <Configuration/> */}
          <Routes>
            <Route path="/login" element={<Navigate to="/home" />} />
            <Route exact path="/home" element={<Home/>}  />
            <Route exact path="/config" element={<Configuration/>}  />
            <Route exact path='/assets' element={<Asset/>}/>
            <Route exact path="/uploadmap" element={<Uploadmap/>}/>
            <Route exact path='/master' element={<Master/>}/>
            <Route exact path="/slave" element={<Slave/>}/>
            <Route exact path="/zoneconfig" element={<Zoneconfig/>}/>
            <Route exact path="/realtime" element={<Realtime/>}/>
            <Route exact path="/contacttrace" element={<Contacttrace/>}/>
            <Route exact path="/reports" element={<Reports/>}/>
            <Route exact path="/thermalmap" element={<Thermalmap/>}/>
            <Route exact path="/airquality" element={<Airquality/>}/>
            <Route exact path="/systemhealth" element={<Systemhealth/>}/>
            <Route exact path="/employeereg" element={<Employeeregestration/>}/>
            <Route exact path="/tagallocate" element={<Tagallocation/>}/>
            <Route exact path="/alerts" element={<Alerts/>}/>
            <Route exact path="/sensors" element={<Sensors/>}/>
            <Route exact path="/vehicle" element={<Vehicle/>}/>
            <Route exact path="/allasset" element={<Allasset/>}/>
            <Route exact path="/sensordetails" element={<Sensordetails/>}/>
            <Route exact path="/vehicledetails" element={<Vehicledetails/>}/>
            
            
          </Routes>
        </Router>
    </div>
  );
   }
  }
}
