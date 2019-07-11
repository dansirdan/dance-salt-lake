import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Section } from "../Sections";
import Calendar from "react-calendar";
import QueryDropDown from "../QueryDrop";
import API from "../../utils/API";
import moment from "moment";
import "./style.css"

class CalendarSection extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      results: [],
      date: new Date(),
    }
  }

  // React-Calendar Method for setting the current date of the calendar
  onChange = date => this.setState({ date });

  // React-Calendar Method for querying on the clicked day
  onClickDay = value => {
    let param = moment(value).format('YYYY-MM-DD')
    this.queryCall(this.props.path, "date", param)   
    
  };

  /**
  * the queryCall (getQueryPosts) method takes THREE argument which create the route path
  * when we get to that point, the onClick method should return data on the 
  * audition(path)/date(subType)"2019/07/05"/QUERY
  */
  queryCall = (postType, subType, param) => {
    API.getQueryPosts(postType, subType, param)
      .then(res => {
        this.setState({ results: res.data })
        this.props.handleQuery(this.state.results)        
    })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Section>
        <Container fluid>
          <Row className="justify-content-md-center">

            <Col md="3">
              <QueryDropDown
                queryCall={this.queryCall}
              />
            </Col>
            {/* <Col size="md-1" /> */}
            <Col md="5">
              <Calendar
                onChange={this.onChange}
                value={this.state.date}
                onClickDay={this.onClickDay}
              />
            </Col>

          </Row>
        </Container>
      </Section >
    )
  }
}

export default CalendarSection;