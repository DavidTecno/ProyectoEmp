import React, { Component } from 'react';
import './Hour.css';


class Hour extends Component {
  //Total de horas por persona y proyecto 
  //Total de horas por tarea y proyecto 
  //horas totales del proyecto
  //Horas totales por persona y rango de tiempo

  constructor() {
    super();
    this.state = {
      projects: [],
      tasks: [],
    }

  }

  render() {
    return (
      <>
        <div className="row">
          <div className="menu">
            <p className="mt-3">Partes de horas Proyecto/Persona</p>
            <p className="mt-3">Partes de horas Proyecto/Tarea</p>
            <p className="mt-3">Partes de horas de un Proyecto</p>
            <p className="mt-3">Partes de horas Persona y Rango Tiempo</p>
          </div>

          <div className="col-3 col-sm-3 col-md-3 col-lg-3 ">
          </div>
          <div className="col-8 col-sm-8 col-md-8 col-lg-8">
            <table className="table mt-5">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </>
    )
  }
}

export default Hour;
