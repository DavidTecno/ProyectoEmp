//Modules
import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
//NavLink
//styles
import './App.css';
import logo from './logo.png';

//Components
// import TaskForm from './components/Task/TaskForm';
import EpicMenu from './components/NavBar/EpicMenu';
import Project from './components/Project/Project';
import Hour from './components/Hour/Hour';
import Task from './components/Tasks/Task';
//import SignUpForm from './components/Login/SignUpForm';
//import SignInForm from './components/Login/SignInForm';

class App extends Component {

  render() {

    let links = [
      { label: 'Documentation', link: '#/Documentation', active: true },
      { label: 'Projects', link: '#/projects' },
      { label: 'Tasks', link: '#/tasks' },
      { label: 'Hours', link: '#/hours' },
    ];

    //Mostrar por pantalla html
    return (

      <Router>
        <div className="App">
          {/* <div className="App__Aside"></div>
          <div className="App__Form">
            <div className="PageSwitcher">
              <NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
              <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
            </div>

            <div className="FormTitle">
              <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or
                  <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
            </div>


          </div> */}


          <div className="center">  <EpicMenu links={links} logo={logo} /></div>



          <Route exact path="/projects" component={Project}>
          </Route>
          <Route path="/tasks" component={Task}>
          </Route>
          <Route path="/hours" component={Hour}>
          </Route>
          {/* <Route exact path="/" component={SignUpForm}>
        </Route>
        <Route path="/sign-in" component={SignInForm}>
        </Route> */}

        </div>
      </Router>



    );
  }
}



export default App;
