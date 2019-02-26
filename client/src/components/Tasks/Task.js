import React, { Component } from 'react';
import './Task.css';

import ModalTask from '../Modal/ModalTask';

class Task extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      tasks: [],
      show: false,
      name: '',
    }
  }


  componentDidMount() {
    this.callApi()
      .then(res => {
        console.log(res)
        this.setState({ projects: res, name: res[0].name })
        this.ProjTask(this.state.projects[0]._id)
      })
      .catch(err => console.log(err));


  }

  callApi = async () => {
    const response = await fetch('/api/projects');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  onDragStart = (ev, id) => {
    console.log('dragstart:', id);
    ev.dataTransfer.setData("id", id);
  }

  onDragOver = (ev) => {
    ev.preventDefault();
  }

  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");

    let tasks = this.state.tasks.filter((task) => {
      if (task.name === id) {
        task.category = cat;
      }
      return task;
    });

    this.setState({
      ...this.state,
      tasks
    })
  }

  // Función que borra una tarea en concreto
  removeTask = async (e) => {
    console.log("Hey " + this.state.tasks[e]._id);
    if (window.confirm('Are you sure to delete this task?')) {
      await fetch('/api/tasks/' + this.state.tasks[e]._id, {
        method: 'delete',

      }).then(res => console.log(res.json()), window.location.reload()).catch(error => console.log(error))
    }
  }

  ProjTask = async e => {
    if (e === this.state.projects[0]._id) {
      const response = await fetch('/api/tasksProj/' + e);
      const body = await response.json().then(res => {
        this.setState({ tasks: res })
      }).catch(error => console.log(error))
      if (response.status !== 200) throw Error(body.message);
      return body;
    } else {
      for (let a = 0; a < this.state.projects.length; a++) {
        if (this.state.projects[a].name === e.target.value) {
          const response = await fetch('/api/tasksProj/' + this.state.projects[a]._id);
          const body = await response.json().then(res => {
            this.setState({ tasks: res, name: this.state.projects[a].name })
          }).catch(error => console.log(error))
          if (response.status !== 200) throw Error(body.message);
          return body;
        }
      }
    }
    //const response = await fetch('/api/tasksProj/');
  }

  // Función que realiza el post de una tarea
  handleSubmit = async e => {
    console.log("asincronada: " + JSON.stringify(e.name));
    // console.log(this.state.post);
    await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(e)


    }).then(res => console.log(res.json()), window.location.reload()).catch(error => console.log(error))
    // console.log(response);
  };


  //Función que añade la tarea
  handleAddTask(task) {

    console.log("desde handleAddTask: " + JSON.stringify(task));

    this.handleSubmit(task);
  }

  showModal = () => {
    this.setState({
      ...this.state,
      show: !this.state.show
    });
  }

  closeModal = () => {
    const show = this.state.show
    if (show === true) {
      this.setState({
        show: !this.state.show
      });
    }
  }

  render() {
    const proj = this.state.projects.map((proj, i) => {
      return (
        <option key={i}>{proj.name}</option>
      )
    })

    var tasks = {
      to_do: [],
      doing: [],
      done: []
    }

    this.state.tasks.forEach((t) => {
      tasks[t.category].push(
        <div key={t.name}
          onDragStart={(e) => this.onDragStart(e, t.name)}
          draggable
          className="draggable"
        >
          <div className="card">
            <div className="card-header">
              <h3>{t.name}</h3>
              <span className="badge badge-pill ml-2"
                style={{ backgroundColor: t.bgcolor }}>
                {t.category}
              </span>

            </div>
            <div className="card-body">
              Esto es el body
          </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-sm-6 col-6">
                  <button className="btn btn-danger">Delete</button>
                </div>
                <div className="col-sm-6 col-6">
                  <button className="btn btn-success">Edit</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      );
    });
    return (

      <div className="container-drag ml-3 mt-2 mr-3 mb-1" onClick={this.closeModal}>
        <div className="row mt-2 mb-2">
          <div className="col-lg-4 col-4 col-md-4 col-xs-4"></div>
          <div className="col-lg-4 col-4 col-md-4 col-xs-4">
            <select
              name="priority"
              className="form-control"
              onChange={this.ProjTask}>
              {proj}
            </select>
          </div>
          <div className="col-lg-4 col-4 col-md-4 col-xs-4"></div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            <button className="btn btn-primary" onClick={this.showModal}>Create</button>
          </div>
          <div className="col-lg-10">
            <h2 className="header">{this.state.name} tasks</h2>

          </div>
        </div>

        <div className="row">
          <div className="col-4 col-md-4 col-xs-4 col-lg-4">
            <div className="to_do"
              onDragOver={(e) => this.onDragOver(e)}
              onDrop={(e) => { this.onDrop(e, "to_do") }}>
              <span className="task-header">To do</span>
              {tasks.to_do}
            </div>
          </div>
          <div className="col-4 col-md-4 col-xs-4 col-lg-4">
            <div className="doing"
              onDragOver={(e) => this.onDragOver(e)}
              onDrop={(e) => this.onDrop(e, "doing")}>
              <span className="task-header">Doing</span>
              {tasks.doing}
            </div>
          </div>
          <div className="col-4 col-md-4 col-xs-4 col-lg-4">
            <div className="done"
              onDragOver={(e) => this.onDragOver(e)}
              onDrop={(e) => this.onDrop(e, "done")}>
              <span className="task-header">Done</span>
              {tasks.done}
            </div>
          </div>
        </div>
        <ModalTask
          onClose={this.showModal}
          show={this.state.show}
          handleAddTask={this.handleAddTask}>
        </ModalTask>
      </div>
    );


  }


}

export default Task;
