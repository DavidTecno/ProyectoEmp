import React, { Component } from 'react';

import CalendarInp from '../Calendar/calendarInput'

class TaskForm extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            user:'',
            hour: 0,
            day: undefined,
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCalendar = this.handleCalendar.bind(this);
    }

    componentDidMount() {
        this.callApi()
          .then(res => {
            console.log(res)
            this.setState({ users: res, user: res[0]._id})
            //this.ProjTask(this.state.users[0]._id)
          })
          .catch(err => console.log(err));
    
    
      }
    
      callApi = async () => {
        const response = await fetch('/api/users');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
      };

    //cada vez que se escriba en input se ejecuta
    handleInput(e) {
        const { value, name } = e.target
        if(name==="user"){
            console.log("user")
            for (let a = 0; a < this.state.users.length; a++) {
                console.log("for")
                if (this.state.users[a].username === e.target.value) {
                    console.log("id "+this.state.users[a]._id)
                    this.setState({
                        user: this.state.users[a]._id
                    })
                    console.log(this.state.user)
                }
            }
        }else {
            this.setState({
                [name]: value
            })
        }
        
        console.log(this.state);
    }

    //al ser task añadidos en memoria se borran si se recarga la página
    handleSubmit(e) {
        e.preventDefault();
        
        var user = {
            user: this.state.user,
            duration: this.state.hour,
            day: this.state.day
        }

        
        this.props.onAddHour(user);
    }

    handleCalendar(date, day) {
        
        console.log(date)

        this.setState({
            day: day
        })

    }

    render() {
        const users = this.state.users.map((user, i) => {
            return (
              <option key={i}>{user.username}</option>
            )
          })

        return (
            <div className="card" id="form">
                <form className="card-body">
                    <div className="form-group">
                        <select
                        name="user"
                        className="form-control"
                        onChange={this.handleInput}>
                            {users}
                        </select>
                    </div>
                    <div className="form-group">
                        <input
                            type="time"
                            name="hour"
                            className="form-control"
                            placeholder="Hour"
                            onChange={this.handleInput}
                        />
                    </div>
                    <div className="form-group">
                        <label>First Date</label>
                        <CalendarInp
                            date="day"
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