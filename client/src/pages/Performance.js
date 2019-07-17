import React, { Component } from 'react';
import MoreInfo from "../components/MoreInfo";
import { Row, Col } from "react-bootstrap";
import { List, PerformanceListItem } from "../components/List";
import { Container } from "../components/Grid";
import CalendarSection from "../components/Calendar";
import { SpaceBanner } from "../components/Preview";
import queryString from "query-string";
import API from "../utils/API"

class Performance extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      queryResults: [],
      activeDates: null,
      show: false,
      date: new Date(),
      moreInfo: {
        title: "",
        description: "",
        address: "",
        photoLink: "",
        length: "",
        payment: "",
        time: "",
        date: "",
        special: ""
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

    API.getSinglePost("performances", id) //--hard coded post id
      .then(res => this.setState({ moreInfo: res.data, show: true }))
      .catch(err => console.log(err));
  };

  // lifecycle method to prepare for the logo change and do an API call
  componentWillMount() {
    this.props.handleLogo();
    let activeDates = [];

    API.getPosts("performances")
      .then(res => {
        activeDates = [...new Set(res.data.map(x => x.date))]
        this.setState({ queryResults: res.data, activeDates: activeDates })
      })
      .catch(err => console.log(err));
  }

  handleDateUpdate = param => {
    this.setState({ date: param }, () => {
      console.log(this.state.date);
      this.stringifyParams();
    })
  };

  // converts filterParams object to query string and calls queryCall function
  stringifyParams = () => {
    const stringified = queryString.stringify(this.state.date)
    const query = "?" + stringified;
    this.queryCall("performances", query);
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
    const performances = this.state.queryResults;
    return (
      <>
        <CalendarSection
          data={performances}
          active={this.state.activeDates}
          filter={this.handleDateUpdate}
        />
        <Container fluid>
          <Row>
            <Col size="md-12">
              {!performances.length ? (
                <h5 className="text-center">No Performances to Display</h5>
              ) : (
                  <List>
                    {performances.map(performance => {
                      return (
                        <PerformanceListItem
                          key={performance.id}
                          title={performance.title}
                          description={performance.description}
                          address={performance.address}
                          photoLink={performance.photoLink}
                          length={performance.length}
                          payment={performance.payment}
                          time={performance.time}
                          date={performance.date}
                          special={performance.special}
                          onClick={() => this.handleShow(performance.id)}
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
          page="Performance"
          show={this.state.show}
          onHide={this.handleClose}
          moreInfo={this.state.moreInfo}
        />
      </>
    );
  }
}

export default Performance;
