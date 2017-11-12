import React, {Component} from 'react';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import Mainhomeleftnav from './Mainhomeleftnav';
import EditUserDetails from './EditUserDetails';
import { userActions } from '../_actions';
//import {Table} from 'react-bootstrap-table';
import DownloadLink from 'react-download-link';
import Fileupload from'./Fileupload';
class UserDetails extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount()
    {
        this.props.getDetails();

    }
    handleEditDetails()
    {
        history.push('/EditUserDetails');
    }
    render() {
        console.log(this.props.userdata.length);
        return (
            <div>
                <div className="container-fluid" style={{backgroundColor:'#FAFAFA'}}>
                    <div>
                        <div className="row">
                            <div className="col-md-4 col-lg-4 col-lg-pull-4" style={{width:10,paddingTop:20}}>
                                <Mainhomeleftnav/>
                            </div>
                            <div className="col-md-7" style={{paddingTop:20}}>
                                <h3>Dropbox</h3>
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
                                {this.props.userdata.length > 0 ?
                                    this.props.userdata.map((file) => {
                                        return (
                                         <div>
                                             <h3>Personal Account:</h3>

                                             <div className="panel panel-default" style={{width:600}}>
                                                 <div className="panel-heading">
                                                     <h3 className="panel-title">Basic</h3>
                                                 </div>
                                                 <div className="panel-body">
                                                     <ul>
                                                     <li className="list-group-item" style={{width:500}}><label>Email: </label>
                                                         <label style={{float:'right'}}>{file.username}</label></li>
                                                     <li className="list-group-item" style={{width:500}}><label>Password: </label>
                                                         <label style={{float:'right'}}>{file.password}</label></li>
                                                     <li className="list-group-item" style={{width:500}}><label>FirstName: </label>
                                                         <label style={{float:'right'}}>{file.firstName}</label></li>
                                                     <li className="list-group-item" style={{width:500}}><label>LastName:</label>
                                                         <label style={{float:'right'}}>{file.lastName}</label></li>
                                                     </ul>
                                                 </div>
                                             </div>

                                                 <div className="panel panel-default" style={{width:600}}>
                                                     <div className="panel-heading">
                                                         <h3 className="panel-title">Preferences</h3>
                                                     </div>
                                                     <div className="panel-body">
                                                         <ul>
                                                        <li className="list-group-item" style={{width:500}}><label>Work:</label>
                                                        <label style={{float:'right'}}>{file.work}</label></li>
                                                        <li className="list-group-item" style={{width:500}}><label>Education:</label>
                                                        <label style={{float:'right'}}>{file.education}</label></li><li className="list-group-item" style={{width:500}}><label>Phone Number:</label>
                                                        <label style={{float:'right'}}>{file.phone}</label></li>
                                                         </ul>
                                                     </div>
                                                </div>


                                        </div>);
                                    })

                                    : ''

                                }
                                <button className="btn btn-primary"  onClick={this.handleEditDetails} style={{width:70,height:30}}>Edit</button>
                            </div>
                            <div className="col-md-4 col-lg-4 col-lg-push-4" style={{backgroundColor:'#FAFAFA',width:270}}>
                                <br/>

                                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
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
    let userdata = [];
    console.log("in component ----- ");
    if(data.users.userdetails !== undefined) {
        userdata.push(data.users.userdetails.user);

    }
    console.log(userdata);
    return {userdata};
}
function mapDispatchToProps(dispatch) {
    return {
       getDetails: ()=> dispatch(userActions.getDetails())
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(UserDetails);
