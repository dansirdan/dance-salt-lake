import React, { Component } from 'react';
import MoreInfo from '../components/MoreInfo';
import { Row, Col } from "react-bootstrap";
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
      activeDates: null,
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
        link: "",
        // lat: "",
        // lng: ""
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
  handleFilterUpdate = param => {
    let currentParams = this.state.filterParams
    let newParams = { ...currentParams, ...param }

    this.setState({ filterParams: newParams }, () => this.stringifyParams(this.state.filterParams));
  };

  // converts filterParams object to query string and calls queryCall function
  stringifyParams = (obj) => {
    // removes props when the value is 0 - i.e., when the dropdown selects the default or "all" option
    Object.keys(obj).forEach((key) => (obj[key] === "0") && delete obj[key]);

    const stringified = queryString.stringify(obj)
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
                          startTime={audition.startTime}
                          endTime={audition.endTime}
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
