import React, { Component } from 'react';

class TaskForm extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            desc: '',
            category: 'to_do'
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        this.props.onAddTask(this.state);
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
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="desc"
                            className="form-control"
                            placeholder="Description"
                            onChange={this.handleInput}
                        />
                    </div>
                    <div className="form-group">
                        <select 
                            name="category"
                            className="form-control"
                            onChange={this.handleInput}
                            >
                            <option>to_do</option>
                            <option>doing</option>
                            <option>done</option>
                        </select>
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