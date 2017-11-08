import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Mainhomeleftnav from './Mainhomeleftnav';
import Listfiles from './Listfiles';
import Fileupload from'./Fileupload';
class Mainhome extends React.Component {
    render() {
        return (
            <div>
                <div className="row" style={{backgroundColor:''}}>
                    <div className="a col-md-6 col-lg-6" style={{width:100}}><Listfiles/></div>
                    <div className="a col-md-6 col-lg-6 col-lg-pull-6"><Mainhomeleftnav/></div>
                    <div className="a col-md-2 col-lg-2"><Fileupload/></div>
                </div>
            </div>

    );
    }
}

export default Mainhome;