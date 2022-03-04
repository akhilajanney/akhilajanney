import axios from 'axios';
import React, { Component } from 'react';
import './commonstyle.css'
import $ from 'jquery'

const Underline={
    width:'65px',
    height:'5px',
    marginTop:'-20px',
    position:'absolute'
}


export default class Uploadmap extends Component {
  constructor(){
    super()
    this.state={
      image: null,
      message: "",
      success: false,
      error: false,
    }
  }

    handleImage = (e) => {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
         this.setState({
            image: file,
         });
      };
      reader.readAsDataURL(file);
   }
        uploadmap=()=>{
         let form_data = new FormData();  
         form_data.append("name", $('#uploadfname').val());
         form_data.append("image", this.state.image);
         form_data.append("width", parseFloat($('#width').val()));
         form_data.append("height", parseFloat($('#height').val()));

        axios({method:'POST',url:'/api/uploadmap',data:form_data})
        .then((response)=>{
            console.log(response);
            if (response.status === 201) {
              this.setState({
                 success: true,
                 error: false,
                 message: "Floor map is uploaded successfully.",
              });
              this.setState({ floorName: "", image: "", width: "", height: ""})
           }
           
        })
        .catch((err)=>{
            console.log(err);
        })
    
}


  render() {
    const {message} = this.state;
    return(
        <>
        <div  style={{
            float: "right", width: "90%",
            marginTop: '40px',
            marginBottom: "30px",
            marginLeft:'-25px'
          }}> 
            <div>
                <h1 className="subheading" style={{paddingTop:'30px'}}>UPLOAD FLOOR MAP</h1>
                <img alt="" src="../images/Tiles/Underline.png" style={Underline} />
              <p style={{textAlign:'center'}}>{message}</p>
                <div className="row">
                <form id="uploadForm" >

                  <div className="inputdiv">
                    <span className="label">Floor Name : </span>
                    <input
                      type="text"
                      name="floorName"
                      id="uploadfname"
                      required="required"
                    />
                  </div>
                  <div className="inputdiv">
                    <span className="label">Floor Map : </span>
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      id="uploadimage"
                      required="required"
                      onChange={this.handleImage}
                    />
                  </div>
                  <div className="inputdiv">
                    <span className="label">Floor Width (in m) : </span>
                    <input
                      type="number"
                      name="width"
                      id='width'
                      required="required"
                      placeholder="Width in meter"
                    />
                  </div>
                  <div className="inputdiv">
                    <span className="label">Floor Height (in m) :</span>
                    <input
                      type="number"
                      name="height"
                      id='height'
                      required="required"
                      placeholder="Height in meter"
                    />
                  </div>
                  <input
                    type="button"
                    value="Upload Map"
                    className="button success_button"
                    onClick={this.uploadmap}
                  />
                </form>
              </div>
        </div>
        </div>
        </>
    );
  }
}
