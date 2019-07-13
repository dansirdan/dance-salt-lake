import React, { Component } from 'react';
import MoreInfo from '../components/MoreInfo';
import { Row, Col } from "react-bootstrap";
import { List, AuditionListItem } from "../components/List";
import { Container } from "../components/Grid";
import CalendarSection from "../components/Calendar";
import { SpaceBanner } from "../components/Preview";
import API from "../utils/API";
import moment from "moment";

class Audition extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      auditions: [],
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

    API.getSinglePost("auditions", id) //--hard coded post id
      .then(res => this.setState({ moreInfo: res.data, show: true }))
      .catch(err => console.log(err));
  };

  // method for passing query results from calendar component to page
  handleQuery = results => {
    this.setState({ auditions: results });
  }
  // lifecycle method to prepare for the logo change and do an API call
  componentWillMount() {
    this.props.handleLogo();

    API.getPosts("auditions")
      .then(res => this.setState({ auditions: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <>
        <CalendarSection
          path="auditions"
          handleQuery={this.handleQuery}
        />
        <Container fluid>
          <Row>
            <Col className="justify-content-center" lg="12">
              {!this.state.auditions.length ? (
                <h5 className="text-center">No Auditions to Display</h5>
              ) : (
                  <List>
                    {this.state.auditions.map(audition => {
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
            <Col md="8">
              <SpaceBanner />
            </Col>
          </Row>

        </Container>
        <MoreInfo
          page="Audition"
          show={this.state.show}
          onHide={this.handleClose}
          moreInfo={this.state.moreInfo}
        />
      </>
    );

  }
}

export default Audition;
