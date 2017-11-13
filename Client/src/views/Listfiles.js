import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as listfileaction from '../_actions/listfileaction';
import Mainhomeleftnav from './Mainhomeleftnav';
import {Table, Column} from 'react-table-for-bootstrap';
import {fileuploadserv} from '../_services/fileuploadservice';
import Fileupload from'./Fileupload';
import DownloadLink from 'react-download-link';
import Navpage from './Navpage';
import Logout from './Logout';
import { history } from '../_helpers';
import LoginPage from './LoginPage';


class Listfiles extends React.Component {
    
    constructor(props) {
        super(props);
    }
    componentWillMount()
    {
        this.props.listfiles();
    }

    handleShare(file){
        console.log(file);
        console.log("hey its handleShare in Fileupload");
        this.props.sharefileaction(file);
        history.push('/Fileshare');
    }
    handleStar(file){
        const payload = file;
        console.log(payload);
        console.log("inside handleSubmit for starfile");
        //console.log(payload.fieldName);
        fileuploadserv.starfile(payload)
            .then((status) => {
                if (status === 204) {
                    console.log("file starred in Listfiles.js");
                    this.props.addTodoNew();
                }
            });
    };
    signin()
    {
        history.push('/login');
    }
    deletefile(file)
    {
        this.props.deleteaction(file);
        
    }

    render() {
            const {item} = this.props;
            const { listoffiles  } = this.props;
        return (
            <div>
                <div className="container-fluid" style={{backgroundColor:'#FAFAFA'}}>
                    <div>
                        <div className="row">
                                <br/>
                                <br/>
                                    <div className="panel panel-default" style={{width:600}}>
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Your Files</h3>
                                        </div>
                                        <div className="panel-body">
                                            <ul>
                                                {this.props.fileList.length > 0 ?
                                                this.props.fileList.map((file) => {
                                                    return (
                                                    <div>

                                                    <li className="list-group-item" style={{width:500}}>

                                                    <label><DownloadLink
                                                        filename={file}
                                                        label= {file}/>
                                                    </label>
                                                    <button style={{bsSize:"xsmall",color:'blue',backgroundColor:'white',float:'right'}} className="glyphicon glyphicon-star" onClick= {()=>this.handleStar(file)}></button>
                                                    <button className="btn" style={{color:'blue',backgroundColor:'white',float:'right'}} onClick= {()=>this.handleShare(file)}>Share</button>
                                                </li>



                                                {/*<button className="btn btn-primary" onClick= {()=>this.handleShare(file)}>Share</button>
                                    <button className="btn btn-primary" onClick= {()=>this.deletefile(file)}>Delete</button>  */}

                                                </div>);
                                    })
                                    : "No Files"
                                }
                                            </ul>
                                        </div>
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(data) {
    let fileList = [];
    console.log("in component ----- ");
    if(data.listoffiles.files !== undefined) {
        fileList = data.listoffiles.files;
        console.log("yes"+data.listoffiles.files);
        
    }
    return {fileList};
}

function mapDispatchToProps(dispatch) {
    return {
        sharefileaction:(data) => dispatch(listfileaction.sharefileaction(data)),
        deleteaction: (data)=> dispatch(listfileaction.deletefile(data)),
        listfiles: ()=> dispatch(listfileaction.listfiles())
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Listfiles); 
