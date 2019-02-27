import React, { Component } from 'react';

import Modal from '../Modal/Modal';

class Project extends Component {
    constructor() {
        super();
        this.state = {
            projects: [],
            show: false,   
            edit: ''
        }
        this.handleProject = this.handleProject.bind(this);
    }

    componentDidMount() {
        console.log("did mount "+this.state.edit);
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
        console.log("asincronada: " + JSON.stringify(e.name));

        await fetch('/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(e)
            
        }).then(res => console.log(res.json(), this.setState({
            projects: this.state.projects, res
        })), window.location.reload()).catch(error => console.log(error))
        
    };

    handleEdit = async e => {
        console.log(e)

        await fetch('/api/projects/'+this.state.edit, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(e)
            
            
        }).then(res => console.log(res), window.location.reload())
        .catch(error => console.log(error))
    }

    showModal = (e) => {
        if(typeof(e)==="number"){
            console.log(e)
            this.setState({
                edit: this.state.projects[e]._id
            })
            console.log(this.state.edit)
        }else {
            this.setState({
                edit: ''
            })
            console.log(this.state.edit)

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
    }



    handleProject(project) {
        console.log(this.state.edit)
        if(this.state.edit!==''){
            this.handleEdit(project);
        }else {
            console.log("desde handleAddProject: " + JSON.stringify(project));

            this.handleSubmit(project);
        }
        
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
                                    <button className="btn btn-success" onClick={this.showModal.bind(this, i)}>Edit</button>
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
                        <div className="col-4 col-md-4 col-sm-4 col-lg-4"></div>
                            <div className="col-4 col-md-4 col-sm-4 col-lg-4"><button className="btn btn-primary" onClick={this.showModal}>Create</button></div>
                            <div className="col-4 col-md-4 col-sm-4 col-lg-4"></div>
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
                    handleProject={this.handleProject}>
                </Modal>
            </>
            // </div>

        );
    }
}

export default Project;