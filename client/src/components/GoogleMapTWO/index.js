import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import "./style.css";

export class MapContainer extends Component {

  render() {

    const style = {
      width: "90%",
      height: "100%"
    }

    return (
      <Map
        google={this.props.google}
        style={style}
        initialCenter={{
          lat: 40.763186,
          lng: -111.895334,
        }}
        zoom={14}
      >
        <Marker
          position={{
            lat: 40.763186,
            lng: -111.895334
          }}
          name={'Current location'} />

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (`${process.env.REACT_APP_GOOGLE_API}`)
})(MapContainer)

