import React, { Component } from 'react';
import { Modal, Button, Row, Col } from "react-bootstrap";
import { List, AuditionListItem } from "../components/List";
import { Container } from "../components/Grid";
import CalendarSection from "../components/Calendar";
import { SpaceBanner } from "../components/Preview";
import queryString from "query-string";
import API from "../utils/API";

class Audition extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      allAuditions: [],
      queryResults: [],
      activeDates: [],
      filterParams: {},
      show: false,
      // date: new Date(),
      moreInfo: {
        title: "",
        lookingFor: "",
        description: "",
        text: "",
        address: "",
        gig: "",
        photoLink: "",
        length: "",
        payment: "",
        time: "",
        date: "",
        link: ""
      }
    }
  }

  // React-Modal method for closing and clearing the data
  handleClose() {
    this.setState({
      show: false,
      moreInfo: {}
    })
  };

  /**
   * the getSinglePost method takes two argument which create the route path
   * when we get to that point, the onClick method should return a list item id
   */
  handleShow = id => {
    // single query of an audition's id to populate state and then show more info.

    API.getSinglePost("auditions", id) 
      .then(res => this.setState({ moreInfo: res.data, show: true }))
      .catch(err => console.log(err));
  };

  // lifecycle method to prepare for the logo change and do an API call
  componentWillMount() {
    this.props.handleLogo();
    let activeDates = [];

    API.getPosts("auditions")
      .then(res => {
        activeDates = [...new Set(res.data.map(x => x.date))] // array of unique event dates for react-calendar tileContent method
        this.setState({ allAuditions: res.data, queryResults: res.data, activeDates: activeDates }) // set allAuditions and queryResults to same initial value 
      })
      .catch(err => console.log(err));
  };

  // handles input changes from Filter and Calendar components
  handleFilterUpdate = params => {
    let currentParams = this.state.filterParams
    let newParams = {...currentParams, ...params}
    this.setState({ filterParams: newParams }, () => {
      console.log(this.state.filterParams);   
      this.stringifyParams();   
    })
  };

  // converts filterParams object to query string and calls queryCall function
  stringifyParams = () => {
    const stringified = queryString.stringify(this.state.filterParams)
    const query = "?" + stringified;
    this.queryCall("auditions", query);
  } 

  /**
  * the queryCall (getQueryPosts) method takes THREE argument which create the route path
  * when we get to that point, the onClick method should return data on the
  * audition(path)/date(subType)"2019/07/05"/QUERY
  */

  queryCall = (postType, param) => {
    API.getQueryPosts(postType, param)
      .then(res => {
        this.setState({ queryResults: res.data })
      })
      .catch(err => console.log(err));
  }

  render() {
    const auditions = this.state.queryResults;
    
    return (
      <>
        <CalendarSection 
          path="auditions"
          data={this.state.allAuditions}
          active={this.state.activeDates}
          filter={this.handleFilterUpdate}
        />
        <Container fluid>
          <Row>
            <Col className="justify-content-center" lg="12">
              {!auditions.length ? (
                <h5 className="text-center">No Auditions to Display</h5>
              ) : (
                  <List>
                    {auditions.map(audition => {
                      return (
                        <AuditionListItem
                          key={audition.id}
                          title={audition.title}
                          lookingFor={audition.lookingFor}
                          description={audition.description}
                          text={audition.text}
                          address={audition.address}
                          gig={audition.gig}
                          photoLink={audition.photoLink}
                          length={audition.length}
                          payment={audition.payment}
                          time={audition.time}
                          date={audition.date}
                          link={audition.link}
                          onClick={() => this.handleShow(audition.id)}
                        />
                      )
                    })}
                  </List>
                )
              }
            </Col>
          </Row>

          <Row className="justify-content-lg-center">
            <SpaceBanner />
          </Row>

        </Container>

        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Audition Info
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2>{this.state.moreInfo.title}</h2>
            <h5>description</h5>
            <p>{this.state.moreInfo.description}</p>
            <p>Address: {this.state.moreInfo.address}</p>
            <p>Gig Type: {this.state.moreInfo.gig}</p>
            <p>Length: {this.state.moreInfo.length}</p>
            <p>Payment: {this.state.moreInfo.payment}</p>
            <p>Time: {this.state.moreInfo.time}</p>
            <p>Date: {this.state.moreInfo.date}</p>
            <p>Link: {this.state.moreInfo.link}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Audition;
