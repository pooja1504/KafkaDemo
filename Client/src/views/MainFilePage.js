import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Fileleftnav from './Fileleftnav';
import ListDir from './ListDir';
import Fileupload from'./Fileupload';
class MainFilePage extends React.Component {
    componentDidMount(){
        document.body.style.backgroundColor = "white";
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="a col-md-6 col-lg-6" style={{width:100}}><ListDir/></div>
                    <div className="a col-md-6 col-lg-6 col-lg-pull-6"><Fileleftnav/></div>
                    <div className="a col-md-2 col-lg-2"><Fileupload/></div>
                </div>
            </div>

        );
    }
}

export default MainFilePage;