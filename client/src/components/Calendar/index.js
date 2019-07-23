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
    };
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
    let { active } = this.props
    let day = moment(date).format('YYYY-MM-DD')

    if (view === 'month' && active.includes(day)) {
      return <div className="active-date"></div>
    }
  }

  render() {

    return (
      /* <Section> */
        <Container>
          <div className="calendar-section_content">
            <Row className="justify-content-around align-items-center">

              {this.props.active ? (
                <>
                  <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                    onClickDay={this.onClickDay}
                    tileContent={this.tileContent}
                    prevAriaLabel={this.state.test}
                  />

                  <Filter
                    {...this.props}
                    filter={this.props.filter}
                  />
                </>
              ) : (<div className="calendar-placeholder"></div>)}

            </Row>
          </div>
        </Container>
      /* </Section> */

    )
  }
}

export default CalendarSection;