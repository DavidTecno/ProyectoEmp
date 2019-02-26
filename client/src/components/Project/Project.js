import React, { Component } from 'react';

import Modal from '../Modal/Modal';

class Project extends Component {
    constructor() {
        super();
        this.state = {
            projects: [],
            show: false,    
        }
        this.handleAddProject = this.handleAddProject.bind(this);
    }

    componentDidMount() {
        this.callApi()
            .then(res => {
                this.setState({ projects: res })
            })
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/projects');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    handleSubmit = async e => {
       // console.log("asincronada: " + JSON.stringify(e.name));
        // console.log(this.state.post);
        var name = e.name.toString()
        console.log(name)
        await fetch('/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(e)
            
            
        }).then(res => console.log(res.json()), window.location.reload()).catch(error => console.log(error))
       // console.log(response);
    };

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



    handleAddProject(project) {
        // this.setState({
        //     projects: [...this.state.projects, project]
        // })

        console.log("desde handleAddProject: " + JSON.stringify(project));

        // this.setState({
        //     post: project
        // });


        this.handleSubmit(project);
        // console.log(project)

        // this.handleSubmit;
    }

    //no funciona
    editProject(index, project) {
        this.setState({
            projects: this.state.projects.filter((e, i) => {
                if (i === index) {

                    return i === project;
                } else {

                    return i;
                }

            })
        })
    }

    removeProject = async (e) => {
        console.log("hey " +this.state.projects[e]._id);
        if (window.confirm('Are you sure to delete')) {
            await fetch('/api/projects/'+this.state.projects[e]._id, {
                method: 'delete',
                
            }).then(res => console.log(res.json()), window.location.reload()).catch(error => console.log(error))
        }
    }

    render() {
        const proj = this.state.projects.map((proj, i) => {
            return (
                <div className="col-6 col-md-4 col-sm-6 col-lg-3" key={i}>
                    <div className="card mt-4">
                        <div className="card-header">
                            <h3>{proj.name}</h3>
                            <span className="badge badge-pill badge-danger ml-2">
                                {proj.client}
                            </span>
                        </div>
                        <div className="card-body">
                            <p>firstDate: {proj.firstDate}</p>
                            <p>finishDate: {proj.finishDate}</p>

                            <p>limitDate: {proj.limitDate}</p>
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="col-sm-6 col-6">
                                    <button className="btn btn-danger" onClick={this.removeProject.bind(this, i)}>Delete</button>
                                </div>
                                <div className="col-sm-6 col-6">
                                    <button className="btn btn-success" onClick={this.showModal}>Edit</button>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>


            )
        })

        //Mostrar por pantalla html
        return (
            // <div className="App">
            <>
                <div className="row mt-3" onClick={this.closeModal}>
                    <div className="col-md-4 col-sm-4 col-lg-4"></div>
                    <div className="col-md-4 col-sm-4 col-lg-4">
                        <div className="row">
                            <div className="col-6 col-md-6 col-sm-6 col-lg-6"><button className="btn btn-primary" onClick={this.showModal}>Create</button></div>
                            <div className="col-4 col-md-6 col-sm-6 col-lg-6">
                                <select
                                    name="priority"
                                    className="form-control">
                                    <option>low</option>
                                    <option>medium</option>
                                    <option>high</option>
                                </select>
                            </div>
                        </div>


                    </div>
                    <div className="col-md-4 col-sm-4 col-lg-4"></div>

                </div>

                <div className="row mt-2 mb-4 ml-2 mr-2" onClick={this.closeModal}>
                    {proj}
                </div>
                <Modal
                    onClose={this.showModal}
                    show={this.state.show}
                    handleAddProject={this.handleAddProject}>
                </Modal>
            </>
            // </div>

        );
    }
}

export default Project;