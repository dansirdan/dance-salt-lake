import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import { Section } from "../Sections";
import Calendar from "react-calendar";
import Filter from "../Filters";
import moment from "moment";
import "./style.css";

class CalendarSection extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      date: new Date(),
      activeDates: ["2019-07-14", "2019-07-16"]
    };
  }

  componentDidUpdate = () => {
    if (this.state.activeDates !== this.props.active) {
      // console.log("not the same");
      this.setState({ activeDates: this.props.active })
    }
  }

  // React-Calendar Method for setting the current date of the calendar
  onChange = date => this.setState({ date });

  // React-Calendar Method for querying on the clicked day
  onClickDay = value => {
    let param = {}
    param.date = moment(value).format('YYYY-MM-DD');
    this.props.filter(param)
  };

  // React-Calendar Method for adding tile content
  tileContent = ({ date, view }) => {
    let { activeDates } = this.state
    // console.log("tileContent", active);
    
    let day = moment(date).format('YYYY-MM-DD')

    if (view === 'month' && activeDates.includes(day)) {
      return <div className="active-date"></div>
    }
  }

  render() {
    // console.log(this.state.activeDates);
    // console.log(this.props.active);

    return (
      <Section>
        <Container>
          <div className="calendar-section_content">
            <Row className="justify-content-around align-items-center">

              <Filter
                {...this.props}
                filter={this.props.filter}
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