import React, { Component } from 'react';
import './commonstyle.css'
import $ from 'jquery'
import axios from 'axios';


const Underline={
  width:'65px',
  height:'5px',
  marginTop:'-20px',
  position:'absolute'
}
export default class Realtime extends Component {
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
      image:''
    }
  }

  componentDidMount(){
    axios({method:'GET',url:'/api/uploadmap'})
    .then((response)=>{
      console.log('map',response);
      if(response.status===200){
        let data=response.data;
        for(let i=0;i<data.length;i++){
          // this.setState({image:data[i].image})
            // let image=data[i].image;
        $('#floorname').append("<option value="+i+">" + data[i].name + "</option>");
        // $("#floorimage").append("<img src="+ +data[i].image +" alt='floor'/>");
        // $('#floorimage').css({ 'height': '100px', 'width': '100px' });
        // $('#imgid').attr('src',image);
           
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
    // console.log(ID);
    this.fimage = this.floorDatas[ID];
    console.log(this.fimage );
    this.fWidth = this.fimage.width;
    // console.log(this.fWidth);
    this.fHeight = this.fimage.height;
    // console.log(this.fHeight);
    $("#imgid").attr(
        "src",
        this.fimage.image
    );
    // console.log(this.fimage.image);
    $("#floorimage").children("div").remove();
    
    $("#imgid").attr("style", "width:" + "auto;" + "height:" + "auto;");
    this.getZones();
    this.employeeTrack();
  //   this.timeout = setTimeout(() => {
  //     $("#floorimage .sensors").remove();
      // this.employeeTrack();
  // }, 2 * 1000);
  clearInterval(this.interval);
  this.interval=setInterval(() => {
    this.employeeTrack();
  }, 2000);

};

getZones=()=>{
  let ID=$("#floorname").val();
  this.wpimg = document.getElementById('floorimage').clientWidth ;
  this.hpimg = document.getElementById('floorimage').clientHeight;
  console.log(this.wpimg);
  console.log(this.hpimg);
  console.log(ID);
  
  axios({method:'GET',url: "/api/zones" + "?floorid=" +this.floorDatas[ID].id,})
  .then((response)=>{
    console.log('zones',response);
    let data=response.data;
    if(response.status===200 || response.status===201){
     
      this.wpzone= this.wpimg / this.fWidth;
      this.hpzone = this.hpimg / this.fHeight;

      // this.employeeTrack()
      // console.log(wpzone);
      // console.log(hpzone);
      $("#imgid").attr("style", "width:" + this.wpimg + "px;" + "height:" + this.hpimg + "px;");
      for(let i=0;i<data.length;i++){
      
        let x =parseInt(this.wpzone*parseFloat(data[i].x1));
        console.log('x',x)
        let y =parseInt(this.hpzone*parseFloat(data[i].y1));
        console.log('y',y)
        let zonewidth= Math.ceil((data[i].x2 - data[i].x1)*this.wpzone);
        console.log(zonewidth)
        let zoneheight= Math.ceil((data[i].y2 - data[i].y1)*this.hpzone);
        console.log(zoneheight)

        let zone=document.createElement('div');
        $(zone).attr("id", data[i].zonename);
        $(zone).attr("title", "zonename:"+data[i].zonename);
        $(zone).attr("class", 'sensors');
        $(zone).attr(
          "style",
          "border:0.5px solid black; background-color:rgb(0,0,0,0.1);" +
          "background-color:	#f3f2f2;"+
          "position: absolute; cursor: pointer; left:" +
          x + "px; top:" +
          y + "px;" +
          "width:" + zonewidth + "px;" +
          "height:" + zoneheight + "px;"
      );

      $(zone).on("click", () => {
                                this.graphdetails(data[i].zonename,this.floorDatas[ID].id);
                            });
      $('#floorimage').append(zone);

      }
    }

  })
  .catch((error)=>{
    console.log(error);
  })
}

graphdetails=(zonename,id)=>{
  console.log('clicked====')
   $('#graph').text('zones');
  window.scrollTo(0, document.body.scrollHeight);
  // axios({method:'GET',url:'/api/'})
}


employeeTrack=()=>{
  let ID=$("#floorname").val();
  axios({method:'GET',url:'/api/employee/tracking?floor=' + this.floorDatas[ID].id })
  .then((response)=>{
    // $("#floorimage").children("div").empty();
    
    console.log('employeetrack',response)
    let data=response.data;
    // this.wpimg = document.getElementById('floorimage').clientWidth ;
    // this.hpimg = document.getElementById('floorimage').clientHeight;
    //  this.wpzone= this.wpimg / this.fWidth;
    //   this.hpzone = this.hpimg / this.fHeight;
    // console.log('wpzone--',this.wpzone);
    // console.log(this.hpzone);
    $('.emp').remove();

    for(let i=0;i<data.length;i++){
      let x= parseInt(this.wpzone*parseFloat((data[i].x)));
      let y= parseInt(this.hpzone*parseFloat((data[i].y)));
      // console.log(x);
      // console.log(y);
      let emp=document.createElement('div');
      $(emp).attr('class','emp')
      $(emp).attr('id',data[i].tagid);
       $(emp).attr('title',data[i].name);
      $(emp).attr(
          "style",
          "position: absolute; cursor: pointer; left:" +
          x + "px; top:" +
          y + "px;" 
      );
            let icon = document.createElement("i");
             $(icon).attr("class", "fa fa-street-view");
             $(icon).attr("style", "font-size: 25px");
             $(icon).css("color","red");
             $(emp).append(icon);
             $('#floorimage').append(emp);
      
    }
  })
  .catch((error)=>{
    console.log(error)
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
            <h1 className="subheading" style={{paddingTop:'30px'}}>REALTIME TRACKING</h1>
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
              style={{marginTop:'80px'}}
             >

             </div>
</div>

    ) ;
  }
}
