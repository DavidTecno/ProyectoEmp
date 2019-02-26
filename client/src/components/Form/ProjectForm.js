import React, { Component } from 'react';

import CalendarInp from '../Calendar/calendarInput'

class TaskForm extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            client: '',
            firstDate: undefined,
            finishDate: undefined,
            limitDate: undefined
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCalendar = this.handleCalendar.bind(this);
    }

    //cada vez que se escriba en input se ejecuta
    handleInput(e) {
        const { value, name } = e.target
        this.setState({
            [name]: value
        })

        console.log(this.state);
    }

    //al ser task añadidos en memoria se borran si se recarga la página
    handleSubmit(e) {
        e.preventDefault();
        this.props.onAddProject(this.state);
    }

    handleCalendar(date, day) {
        var newDate = '';
        newDate = date;
        switch (newDate) {
            case "firstDate":
                console.log("Project Form " + date)
                this.setState({
                    firstDate: day
                })
                console.log(this.state)

                break;
            case "finishDate":
                console.log("Project Form " + date)
                this.setState({
                    finishDate: day
                })
                console.log(this.state)
                break;

            case "limitDate":
                console.log("Project Form " + date)
                this.setState({
                    limitDate: day
                })
                console.log(this.state)
                break;
            default:
                console.log('no entra nada')
                break;
        }


    }

    render() {
        return (
            <div className="card" id="form">
                <form className="card-body">
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Name"
                            onChange={this.handleInput}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="client"
                            className="form-control"
                            placeholder="Client"
                            onChange={this.handleInput}
                        />
                    </div>
                    <div className="form-group">
                        <label>First Date</label>
                        <CalendarInp
                            date="firstDate"
                            onAddValue={this.handleCalendar} />
                    </div>
                    <div className="form-group">
                        <label>Final Date</label>
                        <CalendarInp
                            date="finishDate"
                            onAddValue={this.handleCalendar} />
                    </div>
                    <div className="form-group">
                        <label>Limit Date</label>
                        <CalendarInp
                            date="limitDate"
                            onAddValue={this.handleCalendar} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>
                        Save
                    </button>
                </form>
            </div>
        )
    }
}

export default TaskForm;