import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from "axios";
import "./style.css";

export class MapContainer extends Component {

  state = {
    lat: 0,
    long: 0
  }

  render() {

    const style = {
      width: "90%",
      height: "100%"
    }

    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={style}
      >

        {/* <Marker onClick={this.onMarkerClick}
          name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow> */}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBwWAv336FT-ttOosMGCDcROKAsq_rhkbA")
})(MapContainer)

