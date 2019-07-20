import React, { Component } from 'react';
import MoreInfo from "../components/MoreInfo";
import { Row, Col } from "react-bootstrap"
import { List, ClassListItem } from "../components/List";
import { Container } from "../components/Grid";
import CalendarSection from "../components/Calendar";
import { SpaceBanner } from "../components/Preview";
import queryString from "query-string";
import API from "../utils/API"

class Class extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      allClasses: [],
      queryResults: [],
      activeDates: null,
      filterParams: {},
      show: false,
      date: new Date(),
      moreInfo: {
        title: "",
        style: "",
        master: false,
        description: "",
        address: "",
        instructorName: "",
        photoLink: "",
        length: "",
        level: "",
        payment: "",
        time: "",
        date: "",
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
  }

  handleShow = id => {
    // single query of an audition's id to populate state and then show more info.

    API.getSinglePost("classes", id) //--hard coded post id
      .then(res => this.setState({ moreInfo: res.data, show: true }))
      .catch(err => console.log(err));
  };

  // lifecycle method to prepare for the logo change and do an API call
  componentWillMount() {
    this.props.handleLogo();
    let activeDates = [];

    API.getPosts("classes")
      .then(res => {
        activeDates = [...new Set(res.data.map(x => x.date))] // array of unique event dates for react-calendar tileContent method
        this.setState({ allClasses: res.data, queryResults: res.data, activeDates: activeDates }) // set allAuditions and queryResults to same initial value 
      })
      .catch(err => console.log(err));
  }

  // handles input changes from Filter and Calendar components
  handleFilterUpdate = param => {
    let currentParams = this.state.filterParams
    let newParams = { ...currentParams, ...param }

    this.setState({ filterParams: newParams }, () => this.stringifyParams(this.state.filterParams))
  };

  // converts filterParams object to query string and calls queryCall function
  stringifyParams = (obj) => {
    // removes props when the value is 0 - i.e., when the dropdown selects the default or "all" option
    Object.keys(obj).forEach((key) => (obj[key] === "0") && delete obj[key]);

    const stringified = queryString.stringify(obj)
    const query = "?" + stringified;

    this.queryCall("classes", query);
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
    const classes = this.state.queryResults;

    return (
      <>         
        <CalendarSection
          path="classes"
          data={this.state.allClasses}
          active={this.state.activeDates}
          filter={this.handleFilterUpdate}
        />
        <Container fluid>
          <Row>
            <Col size="md-12">
              {!classes.length ? (
                <h5 className="text-center">No Classes to Display</h5>
              ) : (
                  <List>
                    {classes.map(klass => {
                      return (
                        <ClassListItem
                          key={klass.id}
                          title={klass.title}
                          style={klass.style}
                          master={klass.master}
                          description={klass.description}
                          address={klass.address}
                          instructorName={klass.instructorName}
                          photoLink={klass.photoLink}
                          length={klass.length}
                          level={klass.level}
                          payment={klass.payment}
                          time={klass.time}
                          date={klass.date}
                          onClick={() => this.handleShow(klass.id)}
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
          page="Class"
          show={this.state.show}
          onHide={this.handleClose}
          moreInfo={this.state.moreInfo}
        />
      </>
    );
  }
}

export default Class;
