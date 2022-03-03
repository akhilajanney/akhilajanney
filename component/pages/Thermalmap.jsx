import React, { Component } from 'react';
import './commonstyle.css'
import $ from 'jquery'
import axios from 'axios';
import Chart from "chart.js/auto";
axios.defaults.xsrfHeaderName = "x-csrftoken";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

const Underline={
  width:'65px',
  height:'5px',
  marginTop:'-20px',
  position:'absolute'
}
export default class Thermalmap extends Component {
    fWidth = 0;
    fHeight = 0;
    jsonData = [];
    interval = "";
    panicinterval = "";
    c = 0;
    xpixel = 0;
    flag = "false";
    floorDatas= [];

  constructor(){
    super()
    this.state={
      image:'',
      chartData:{}
    }
  }

  componentDidMount(){
    axios({method:'GET',url:'/api/uploadmap'})
    .then((response)=>{
      console.log('map',response);
      if(response.status===200){
        let data=response.data;
        for(let i=0;i<data.length;i++){
        $('#floorname').append("<option value="+i+">" + data[i].name + "</option>");
         
        }
        this.floorDatas = response.data;
        this.plotFloorMap();
      }
      
    })
  }
  componentWillUnmount() {
    clearInterval(this.interval);
}


  plotFloorMap = () => {
    let ID = $("#floorname").val();
    this.fimage = this.floorDatas[ID];
    this.fWidth = this.fimage.width;
    this.fHeight = this.fimage.height;
    $("#imgid").attr(
        "src",
        this.fimage.image
    );

    $("#floorimage").children("div").remove();
    
    $("#imgid").attr("style", "width:" + "auto;" + "height:" + "auto;");
    this.timeout = setTimeout(() => {
      $("#floorimage .sensors").remove();
      // this.getZones();
      this.getSensors();
  }, 2 * 1000);
  
  clearInterval(this.interval);

};

getSensors=()=>{
  let ID=$("#floorname").val();
  this.wpimg = document.getElementById('floorimage').clientWidth ;
  this.hpimg = document.getElementById('floorimage').clientHeight;
  // console.log(this.wpimg);
  // console.log(this.hpimg);
  // console.log(ID);
  
  axios({method:'GET',
  url: "/api/sensor/temperaturehumidity" +"?floorid="+this.floorDatas[ID].id,})
  .then((response)=>{
    console.log('zones',response);
    let data=response.data;
    if(response.status===200 || response.status===201){
     
       let wpzone= this.wpimg / this.fWidth;
      let hpzone = this.hpimg / this.fHeight;
      // console.log(wpzone);
      // console.log(hpzone);
      $("#imgid").attr("style", "width:" + this.wpimg + "px;" + "height:" + this.hpimg + "px;");
      for(let i=0;i<data.length;i++){
      
        let x =parseInt(wpzone*parseFloat(data[i].x1));
        // console.log('x',x)
        let y =parseInt(hpzone*parseFloat(data[i].y1));
        // console.log('y',y)
        let zonewidth= Math.ceil((data[i].x2 - data[i].x1)*wpzone);
        // console.log(zonewidth)
        let zoneheight= Math.ceil((data[i].y2 - data[i].y1)*hpzone);
        // console.log(zoneheight)

        let zone=document.createElement('div');
        $(zone).attr("id", data[i].zonename);
        $(zone).attr("title", "\nmacid : "+data[i].macid + 
                      "\ntemp : " +data[i].temperature +
                      "\nhumidity : " +data[i].humidity +
                      "\nx : " +data[i].x1 +
                      "\ny : " +data[i].y1
        );
          let temp=parseInt(data[i].temperature);
          // console.log(temp,'temp-------')
      
      
        $(zone).attr("class", 'sensors');
        $(zone).attr(
          "style",
          "border:0.5px solid black; " +
          // "background-color:	#f3f2f2;"+
          "position: absolute; cursor: pointer; left:" +
          x + "px; top:" +
          y + "px;" +
          "width:" + zonewidth + "px;" +
          "height:" + zoneheight + "px;"
      );
        if(temp===0){
            $(zone).css('background-color','white')
        }else if(temp>=10 && temp<20)
        {
           $(zone).css('background-color','#f3f2f2')
        }else if(temp>=20 && temp<30)
        {
           $(zone).css('background-color','black')
        }else if(temp>=30 && temp<40)
        {
           $(zone).css('background-color','pink')
        }else if(temp>=40 && temp<90)
        {
           $(zone).css('background-color','red')
        }


      $(zone).on("click", () => {
                                this.graphdetails(data[i].macid);
                            });
      $('#floorimage').append(zone);

      }
    }

  })
  .catch((error)=>{
    console.log(error);
  })
}

graphdetails=(id)=>{
  console.log('clicked====')
   $('#graph').css('display','block');
  window.scrollTo(0, document.body.scrollHeight);
   axios({
            method: "POST",
            url: "/api/sensor/dailydata?macaddress=" + id,
        })
        .then((response)=>{
          console.log(response);
          let data=response.data;
            let timings=[];
            let temp=[];
            let humid=[];
            for(let i=0;i<data.length;i++){
              if(response.data.length>0){
                timings.push(
                //   data[i].timestamp.substring(0, 10) +
                // " " +
                  data[i].timestamp.substring(11, 19)
                );
                // console.log(timings);
                temp.push(data[i].temperature);
                humid.push(data[i].humidity);
                // console.log(temp);
              }
            }
            if ($("#graph").children().length !== 0)
                            $("#tempChart").remove();
                        var cnvs = document.createElement("canvas");
                        $(cnvs).attr("id", "tempChart");
                        $(cnvs).attr("width", "50px");
                        $(cnvs).attr("height", "20px");
                        $("#graph").append(cnvs);
                        // chart displaying code
                        const tempChart = $("#tempChart");
                        new Chart(tempChart, {
                            type: "line",
                            data: {
                                //Bring in data
                                labels: timings,
                                datasets: [
                                    {
                                        label: " Temperature",
                                        data: temp,
                                        backgroundColor: "green",
                                        borderColor: "green",
                                        borderWidth: 2,
                                        pointRadius: 0.5,
                                        lineTension: 0.4,
                                    },
                              
                               
                                    {
                                        label: " Humidity",
                                        data: humid,
                                        backgroundColor: "red",
                                        borderColor: "red",
                                        borderWidth: 2,
                                        pointRadius: 0.5,
                                        lineTension: 0.4,
                                    },
                                ],
                            },
                            options: {
                                responsive: true,
                                scales: {
                                    xAxes: [{ ticks: { display: true } }],
                                    yAxes: [
                                        { ticks: { beginAtZero: true, min: 0, stepSize: 50 } },
                                    ],
                                },
                                plugins: {
                                    legend: {
                                        display: true,
                                        position: "right",
                                        fontSize: 35,
                                    },
                                },
                            },
                        });


        })
        .catch((error)=>{
          console.log(error);
        })
}
  
  render() {
    // const{image}=this.state;
    return(
      <div  style={{
        float: "right", width: "90%",
        marginTop: '40px',
        marginBottom: "30px",
        marginLeft:'-25px'
      }}> 
        <div>
            <h1 className="subheading" style={{paddingTop:'30px'}}>THERMAL MAP</h1>
            <img alt="" src="../images/Tiles/Underline.png" style={Underline} />
            </div>

            <div className="inputdiv">
                <span className="label">Floor Name :</span>
                  <select style={{width:'265px'}} id="floorname" 
                     onChange={() => {
                                        this.plotFloorMap();
                                    }}
                  >
                  </select><br /><br />
                  
                  <span className="label">Tag MAC ID:</span>
                  <input type='text' id='macid' placeholder='5a-c2-15-00-00-00'/>
                  <br /><br />
                  <input
                  type="button"
                  value="Search"
                  className="button success_button"
                  // onClick={this.dropdownChange}
                    /> &nbsp; &nbsp; &nbsp;
                    <input
                  type="button"
                  value="Clear"
                  onClick={this.clear}
                  className="button success_button"
                    />
             </div>
             <hr />

             <div id='floorimage'
              style={{
                display: "block",
                position:'relative',
                width:'fit-content'
              }}
             >
              <img id='imgid' alt="image" />

             </div>
             <div id='graph'
              style={{marginTop:'80px',display:'none'}}
             >
             {/* {Object.keys(this.state.chartData).length &&
            <Chart
              chartData={this.state.chartData}
              location="Massachusetts"
              legendPosition="bottom"
            />
          } */}
          {/* hi */}

             </div>
</div>

    ) ;
  }
}
