import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
// import Geocode from "react-geocode";
import axios from "axios";
import "./style.css";

export class MapContainer extends Component {

  render() {

    const style = {
      width: "90%",
      height: "100%"
    }

    // let cityLat;
    // let cityLon;
    // let geoAddy = "138+Broadway,+Salt+Lake+City,+UT"
    // const geoKey = "AIzaSyBwWAv336FT-ttOosMGCDcROKAsq_rhkbA"
    // let geoQuery = `https://maps.googleapis.com/maps/api/geocode/json?address=${geoAddy}&key=${geoKey}`;
    // axios.get(geoQuery)
    //   .then(response => {
    //     cityLat = parseFloat(response.data.results[0].geometry.location.lat);
    //     cityLon = parseFloat(response.data.results[0].geometry.location.lng);
    //     console.log(response);
    //     console.log(cityLat, cityLon)
    //     // this.setState({
    //     //   lat: cityLat,
    //     //   lon: cityLon
    //     // })
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })

    return (
      <Map
        google={this.props.google}
        style={style}
        initialCenter={{
          lat: 40.763186,
          lng: -111.895334
        }}
        zoom={14}
      >
        <Marker
          position={{
            lat: 40.763186,
            lng: -111.895334
          }}
          name={'Current location'} />

        {/* <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow> */}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("")
})(MapContainer)

