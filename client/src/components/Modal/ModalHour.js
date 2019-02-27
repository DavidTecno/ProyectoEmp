import React, { Component } from 'react';

import HourForm from '../Form/HourForm';

//Styled-Components
//gray background
const backDropStyle = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    rigth: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 50
}

//modal style
const modalStyle = {
    backgroundColor: '#fff',
    maxWidth: 500,
    minHeigth: 300,
    margin: '0 auto',
    padding: 30,
    position: 'relative'
}

class ModalTask extends Component {

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    }

    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div style={backDropStyle} >
                <div style={modalStyle}>
                    <HourForm onAddHour={this.props.handleHourTask}/>
                    
                </div>
            </div>
        )
    }

}

export default ModalTask