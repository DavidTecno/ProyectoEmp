import React from 'react';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';


export default class Example extends React.Component {

  constructor() {
    super();
    this.state = {
      firstDate: undefined,
      finishDate: undefined,
      limitDate: undefined
    };
    this.handleDayChange = this.handleDayChange.bind(this);
  }

  handleDayChange(day) {
    var dayString = day.toString();
    
    if (this.props.date === "firstDate") {
      this.setState({
        firstDate: dayString
      });
    }
    if (this.props.date === "finishDate") {
      this.setState({
        finishDate: dayString
      });
    }
    if (this.props.date === "limitDate") {
      this.setState({
        limitDate: dayString
      });

    }

    this.props.onAddValue(this.props.date, dayString);
  }

  render() {


    return (
      <div className="InputFromTo">
        <DayPickerInput
          name={this.props.date}
          dayPickerProps={{
            month: new Date(2019, 1),
            todayButton: 'Today',
          }}
          onDayChange={this.handleDayChange}
        />

      </div>
    );
  }
}