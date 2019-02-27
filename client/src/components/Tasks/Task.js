import React, { Component } from 'react';
import './Task.css';

import ModalTask from '../Modal/ModalTask';
import ModalHour from '../Modal/ModalHour';


class Task extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      tasks: [],
      edit: '',
      show: false,
      showHour: false,
      name: '',
    }

    this.handleTask = this.handleTask.bind(this)
    this.handleHour = this.handleHour.bind(this)

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
        console.log(task._id)
        task.category = cat;
        this.handleEdit(task)

      }
      return task;
    });

    this.setState({
      ...this.state,
      tasks
    })
  }

  handleEdit = async e => {
    console.log(e)
    if (e.category === "to_do" || e.category === "done" || e.category === "doing") {

      var task = {
        category: e.category
      }
      console.log(e._id)
      await fetch('/api/tasks/' + e._id, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task)


      }).then(res => console.log(res), this.setState({
        edit: ''
      }))
        .catch(error => console.log(error))
    } else {
      await fetch('/api/tasks/' + this.state.edit, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(e)


      }).then(res => console.log(res), window.location.reload())
        .catch(error => console.log(error))
    }


  }

  pushHour = async (e) => {
    console.log(e)
    await fetch('/api/tasksHour/' + this.state.edit, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(e)


    }).then(res => console.log(res))
      .catch(error => console.log(error))
  }

  // Función que borra una tarea en concreto
  removeTask = async (e) => {
    console.log("Hey " + JSON.stringify(e));
    if (window.confirm('Are you sure to delete this task?')) {
      await fetch('/api/tasks/' + e._id, {
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
  }

  // Función que realiza el post de una tarea
  handleSubmit = async e => {
    console.log("asincronada: " + JSON.stringify(e));
    for (let a = 0; a < this.state.projects.length; a++) {
      if (this.state.projects[a].name === this.state.name) {
        var i = {
          name: e.name,
          desc: e.desc,
          category: e.category,
          project: this.state.projects[a]._id
        }
      }
    }
    await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(i)


    }).then(res => this.setState({
      tasks: this.state.tasks, res
    }), window.location.reload()).catch(error => console.log(error))
  };


  //Función que controla la tarea
  handleTask(task) {
    console.log(task)
    if (this.state.edit !== undefined) {
      this.handleEdit(task);
    } else {
      console.log("desde handleAddTask: " + JSON.stringify(task));

      this.handleSubmit(task);
    }
  }

  //Función que controla la hora de una tarea
  handleHour(hour) {
    console.log(hour)

    this.pushHour(hour)
    
  }

  showModal = (e) => {
    if (e._id !== "") {
      console.log(e)
      this.setState({
        edit: e._id
      })
      console.log("hey" + this.state.edit)
    } else {
      this.setState({
        edit: ''
      })
      console.log("vacio" + this.state.edit)

    }
    this.setState({
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
    const showHour = this.state.showHour
    if (showHour === true) {
      this.setState({
        showHour: !this.state.showHour
      });
    }
  }

  showModalHour = (e) => {
    var id = e._id
    this.setState({
      edit: id
    })

    this.setState({
      showHour: !this.state.showHour
    });
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
              <span className="badge badge-pill ml-2">
                {t.category}
              </span>

            </div>
            <div className="card-body">
              {t.desc}
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-4 col-sm-4 ">
                  <button className="btn btn-danger" onClick={this.removeTask.bind(this, t)}>Delete</button>
                </div>
                <div className="col-4 col-sm-4 ">
                  <button className="btn btn-info" onClick={this.showModalHour.bind(this, t)}>Push Hour</button>
                </div>
                <div className="col-4 col-sm-4 ">
                  <button className="btn btn-success" onClick={this.showModal.bind(this, t)}>Edit</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      );
    });
    return (

      <>
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
            <div className="col-2 col-md-2 col-xs-2 col-lg-2">
              <button className="btn btn-primary" onClick={this.showModal}>Create</button>
            </div>
            <div className="col-8 col-md-8 col-xs-8 col-lg-8">
              <h2 className="header">{this.state.name} Tasks</h2>

            </div>
            <div className="col-2 col-md-2 col-xs-2 col-lg-2"></div>
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

        </div>
        <ModalTask
          onClose={this.showModal}
          show={this.state.show}
          handleAddTask={this.handleTask}>
        </ModalTask>
        <ModalHour
          onClose={this.showModalHour}
          show={this.state.showHour}
          handleHourTask={this.handleHour}>
        </ModalHour>
      </>
    );


  }


}

export default Task;
