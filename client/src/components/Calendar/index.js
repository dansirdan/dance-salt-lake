import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import { Section } from "../Sections";
import Calendar from "react-calendar";
import QueryDropDown from "../QueryDrop";
import Filter from "../Filters";
import API from "../../utils/API";
import moment from "moment";
import "./style.css"

class CalendarSection extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      results: [],
      date: new Date(),
      activeDates: ["2019-07-13", "2019-07-16"] // hard coded
    }
  }

  componentDidMount() {
    const activeDates = [...new Set(this.props.results.map(x => x.date))]
    this.setState({ activeDates: activeDates })
    
  }
  
  // React-Calendar Method for setting the current date of the calendar
  onChange = date => this.setState({ date });

  // React-Calendar Method for querying on the clicked day
  onClickDay = value => {
    let param = {}
    param.date = moment(value).format('YYYY-MM-DD');
    let query = JSON.stringify(param)

    // this.queryCall(this.props.path, query)
  };
  
  tileContent = ({ date, view }) => {
    let active = this.state.activeDates
    let day = moment(date).format('YYYY-MM-DD')
      
    if (view === 'month' && active.includes(day)) {
      return <div className="active-date"></div>
      }
  }



  /**
  * the queryCall (getQueryPosts) method takes THREE argument which create the route path
  * when we get to that point, the onClick method should return data on the 
  * audition(path)/date(subType)"2019/07/05"/QUERY
  */
  queryCall = (postType, param) => {
    API.getQueryPosts(postType, param)
      .then(res => {
        this.setState({ results: res.data })
        this.props.handleQuery(this.state.results)
      })
      .catch(err => console.log(err));
  }
  // queryCall = (postType, subType, param) => {
  //   API.getQueryPosts(postType, subType, param)
  //     .then(res => {
  //       this.setState({ results: res.data })
  //       this.props.handleQuery(this.state.results)
  //     })
  //     .catch(err => console.log(err));
  // }

  render() {
    // console.log(this.props.results);

    return (
      <Section>
        <Container>
          <div className="calendar-section_content">
            <Row className="justify-content-around align-items-center">

              {/* <QueryDropDown
                  queryCall={this.queryCall}
                /> */}
              <Filter
                {...this.props}
                queryCall={this.queryCall}
              />

              <Calendar
                onChange={this.onChange}
                value={this.state.date}
                onClickDay={this.onClickDay}
                tileContent={this.tileContent}
              />

            </Row>
          </div>
        </Container>
      </Section>
    )
  }
}

export default CalendarSection;