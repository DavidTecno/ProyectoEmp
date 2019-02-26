import React, { Component } from 'react';
import './Hour.css';

class Hour extends Component {
  //Total de horas por persona y proyecto 
  //Total de horas por tarea y proyecto 
  //horas totales del proyecto
  //Horas totales por persona y rango de tiempo

  render() {
      return (
          <>
            <div className="row"> 
                <div className="menu col-lg-2">
                        <p className="mt-3">Partes de horas Proyecto/Persona</p>
                        <p className="mt-3">Partes de horas Proyecto/Tare</p>
                        <p className="mt-3">Partes de horas de un Proyecto</p>
                        <p className="mt-3">Partes de horas Persona y Rango Tiempo</p>
                    
                </div>
            </div>
          </>
      )
  }
}

export default Hour;
