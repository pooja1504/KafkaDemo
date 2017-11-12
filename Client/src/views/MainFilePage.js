import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Fileleftnav from './Fileleftnav';
import Listfiles from './Listfiles';
import Fileupload from'./Fileupload';
class MainFilePage extends React.Component {
    componentDidMount(){
        document.body.style.backgroundColor = "white";
    }
    render() {
        return (
            <div>
                <div className="container-fluid" style={{backgroundColor:'#FAFAFA'}}>
                    <div>
                        <div className="row">
                            <div className="col-md-4 col-lg-4 col-lg-pull-4" style={{width:10,paddingTop:20}}>
                                <Fileleftnav/>
                            </div>

                            <div className="col-md-7" style={{paddingTop:20}}>
                                <h4>Dropbox</h4>
                                <div className="input-group stylish-input-group">
                                    <input type="text" className="form-control"  placeholder="Search"/>
                                    <span className="input-group-addon">
                                        <button type="submit">
                                            <span className="glyphicon glyphicon-search"></span>
                                        </button>
                                    </span>
                                </div>
                                <br/>
                                <br/>
                                <Listfiles/>
                            </div>
                            <div className="col-md-4 col-lg-4 col-lg-push-4" style={{backgroundColor:'#FAFAFA',width:270}}>
                                <Fileupload/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default MainFilePage;