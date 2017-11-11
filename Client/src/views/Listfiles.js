import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as listfileaction from '../_actions/listfileaction';
import Mainhomeleftnav from './Mainhomeleftnav';
import {Table, Column} from 'react-table-for-bootstrap';
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

    handleShare(file){
        console.log(file);
        console.log("hey its handleShare in Fileupload");
        this.props.sharefileaction(file);
        history.push('/Fileshare');
    }
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
                            <div className="col-md-4 col-lg-4 col-lg-pull-4" style={{width:10,paddingTop:20}}>
                                <Mainhomeleftnav/>
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
                                {this.props.fileList.length > 0 ?
                                    this.props.fileList.map((file) => {
                                        return ( <div>

                                            <DownloadLink
                                                filename={file}
                                                label= {file}
                                            />
                                            {/*<button className="btn btn-primary" onClick= {()=>this.handleShare(file)}>Share</button>
                                <button className="btn btn-primary" onClick= {()=>this.deletefile(file)}>Delete</button>  */}
                                            <br/>
                                            <br/>
                                        </div>);
                                    })

                                    : history.push('/login')

                                }
                            </div>
                            <div className="col-md-4 col-lg-4 col-lg-push-4" style={{backgroundColor:'#FAFAFA',width:270}}>
                                <br/>
                                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                <img src={require('../images/user.png')} style={{width:40,height:40,float:'center'}} onClick={this.handleUser}/>
                                <Fileupload/>
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
        deleteaction: (data)=> dispatch(listfileaction.deletefile(data))
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Listfiles); 
