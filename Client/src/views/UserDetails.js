import React, {Component} from 'react';
import { connect } from 'react-redux';
//import { history } from '../_helpers';
import Mainhomeleftnav from './Mainhomeleftnav';
import { userActions } from '../_actions';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
class UserDetails extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount()
    {
        const {dispatch}= this.props;
        console.log("hey");
        //dispatch(userActions.getDetails());

    }
    render() {
        console.log(this.props.userdata.length);
        console.log(this.props.userdata.firstName);
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
                                {this.props.userdata}
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
        userdata = data.users.userdetails;
        console.log(userdata);
    }
    return {userdata};
}

export default connect(mapStateToProps)(UserDetails); 
