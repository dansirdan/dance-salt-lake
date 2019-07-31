import React, { Component } from "react";
import GoogleMapReact from 'google-map-react';
import "./style.css";

const Marker = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    // console.log(this.props)
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '200px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: `${process.env.GOOGLE_API}` }}
          defaultCenter={{
            lat: this.props.lat,
            lng: this.props.lng
          }}
          defaultZoom={this.props.zoom}
        >
          <Marker
            lat={this.props.lat}
            lng={this.props.lng}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;