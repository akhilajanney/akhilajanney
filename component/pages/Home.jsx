import React, { Component } from 'react';
import  './commonstyle.css'
import { Link } from "react-router-dom";
import { sidelinkClicked } from './Sidebar';

const Underline={
    width: "75px",
    height: "9px",
    marginLeft: "3px",
    backgroundColor: "#006287",
    marginTop: '-26px'
}
const ImageSize = {
    width: "85%",
    height: "85%",
    margin: "0px",
    padding: "0px",
    cursor:'pointer'
  };
export default class Home extends Component {
  // componentDidMount(){
  //   sidelinkClicked(0);
  // }
  render() {
    return (
        <>
        {/* <div style={{zIndex:1,position:'absolute'}}> */}
            <div style={{ float: "right", width: "91%", marginTop:'52px', marginRight:'28px'}}>
                <h1>HOME</h1>
                <p style={Underline} />
                <div style={{marginTop:'10px'}}> 
                    <h3>CONFIGURATION</h3>
                </div>
                <hr />
                <div  style={{display:'flex'}}>
                    <div className="col-4">
                    <Link to=
                  "/config">
                    <img
                      style={ImageSize}
                    src="/images/Widgets/Widget_Config.png" alt="" />
                     </Link>
                    </div>
                   
                   
                    <div className="col-4">
                    <Link to="/uploadmap">
                    <img
                     style={ImageSize}
                    src="/images/Widgets/Widget_Upload.png" alt="" />
                    </Link>
                    </div>
                    

                  
                    <div className="col-4">
                    <Link to='/allasset'>
                    <img
                      style={ImageSize}
                    src="/images/Widgets/Widget_Assets.png" alt="" />
                      </Link>
                    </div>
                  

                    
                    <div className="col-4">
                    <Link to="/zoneconfig">
                    <img
                      style={ImageSize}
                    src="/images/Widgets/Zoneconfig.png" alt="" />
                     </Link>
                    </div>
                   
                 </div>

                 <div style={{marginTop:'10px'}}> 
                    <h3>PERSONNEL MANAGEMENT</h3>
                </div>
                <hr />
                <div  style={{display:'flex'}}>
                    <div className="col-4">
                      <Link to="/employeereg">
                    <img
                      style={ImageSize}
                    src="/images/Widgets/EmployeeRegistration.png" alt="" />
                    </Link>
                    </div>

                    <div className="col-4">
                    <Link to="/tagallocate">
                    <img
                      style={ImageSize}
                    src="/images/Widgets/TagAllocation.png" alt="" />
                    </Link>
                    </div>

                    <div className="col-4">
                      <Link to='/realtime'>
                    <img
                      style={ImageSize}
                    src="/images/Widgets/Widget_Realtime.png" alt="" 
                    onClick={() => sidelinkClicked(1)}
                    />
                    </Link>
                    </div>

                    <div className="col-4">
                      <Link to="/contacttrace">
                    <img
                     style={ImageSize}
                    src="/images/Widgets/ContactTracing.png" alt=""
                    onClick={() => sidelinkClicked(2)}
                     />
                    </Link>
                    </div>
                    
                 </div>
                 <div className="col-4">
                 <Link to="/reports">
                    <img
                      style={ImageSize}
                      onClick={() => sidelinkClicked(3)}
                    src="/images/Widgets/Widget_Reports.png" alt="" />
                    </Link>
                    </div>
                
                <div style={{marginTop:'10px'}}> 
                    <h3>ENVIRONMENT MANAGEMENT</h3>
                </div>
                <hr />
                <div  style={{display:'flex'}}>
                    <div className="col-4">
                    <Link to ='/thermalmap'>
                    <img
                      style={ImageSize}
                      onClick={() => sidelinkClicked(4)}
                    src="/images/Widgets/Widget_ThermalMap.png" alt="" />
                    </Link>
                    </div>

                    <div className="col-4">
                    <img
                      style={ImageSize}
                      onClick={() => sidelinkClicked(5)}
                    src="/images/Widgets/AirQualityParamters.png" alt="" />
                    </div>
                    </div>

                    <div style={{marginTop:'10px'}}> 
                    <h3>SYSTEM HEALTH</h3>
                </div>
                <hr />
                <div  style={{display:'flex'}}>
                    <div className="col-4">
                    <Link to='/systemhealth'>
                    <img
                      style={ImageSize}
                    src="/images/Widgets/Widget_Syshealth.png" alt="" />
                    </Link>
                    </div>

                    <div className="col-4">
                      <Link to='/alerts'>
                    <img
                      style={ImageSize}
                      onClick={() => sidelinkClicked(6)}
                    src="/images/Widgets/Widget_Alert.png" alt="" />
                    </Link>
                    </div>
                    <div className="col-4">
                    <Link to='/sensors'>
                    <img
                      style={ImageSize}
                    src="/images/Widgets/Widget_Sensors.png" alt="" />
                    </Link>
                    </div>
                    <div className="col-4">
                    <Link to='/vehicle'>
                    <img
                      style={ImageSize}
                    src="/images/Widgets/Widget_Vehicle.png" alt="" />
                    </Link>
                    </div>
                    </div>
                    </div>
             {/* </div> */}
            
        </>
    );
  }
}
