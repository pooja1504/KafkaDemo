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
                                {/*<table>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Table heading</th>
                                        <th>Table heading</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Table cell</td>
                                        <td style={{float:'right'}}>yes</td>
                                    </tr>
                                    </tbody>
                                </table>*/}
                                {this.props.userdata.length}
                                {this.props.userdata.length > 0 ?
                                    Object.keys(this.props.userdata).map(function(s){
                                        return(
                                        <div>{this.props.userdata[s].name}</div>
                                        );}
                                    )
                                     : "hey"
                                }
                                <br/>
                                <button className="btn btn-primary"  onClick={this.handleEditDetails} style={{width:70,height:30}}></button>
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
    let userdata = [];
    console.log("in component ----- ");
    if(data.users.userdetails !== undefined) {
        userdata = data.users.userdetails.user;
        console.log(userdata);
    }
    return {userdata};
}
function mapDispatchToProps(dispatch) {
    return {
       getDetails: ()=> dispatch(userActions.getDetails())
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(UserDetails);
