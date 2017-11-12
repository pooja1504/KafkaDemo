import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import Mainhomeleftnav from './Mainhomeleftnav';
import Fileupload from'./Fileupload';
class EditUserDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                work:'',
                education:'',
                phone:''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
            dispatch(userActions.edituserdetails(user));
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
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
                                <h3>Edit Account Details:</h3>
                                <form name="form" onSubmit={this.handleSubmit}>
                                    <div className="panel panel-default" style={{width:600}}>
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Basic</h3>
                                        </div>
                                        <div className="panel-body">
                                    <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                                        <label htmlFor="firstName">First Name</label>
                                        <input type="text" className="form-control" name="firstName" value={this.props.userdata.firstName} onChange={this.handleChange} />
                                        {submitted && !user.firstName &&
                                        <div className="help-block">First Name required</div>
                                        }
                                    </div>
                                    <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                                        <label htmlFor="lastName">Last Name</label>
                                        <input type="text" className="form-control" name="lastName" value={this.props.userdata.lastName} onChange={this.handleChange} />
                                        {submitted && !user.lastName &&
                                        <div className="help-block">Last Name required</div>
                                        }
                                    </div>
                                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                                        <label htmlFor="username">Email</label>
                                        <input type="text" className="form-control" name="username" value={this.props.userdata.username} onChange={this.handleChange} />
                                        {submitted && !user.username &&
                                        <div className="help-block">Email required</div>
                                        }
                                    </div>
                                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                                        <label htmlFor="password">Password</label>
                                        <input type="text" className="form-control" name="password" value={this.props.userdata.password} onChange={this.handleChange} />
                                        {submitted && !user.password &&
                                        <div className="help-block">Password required</div>
                                        }
                                    </div>
                                        </div>
                                    </div>
                                    <div className="panel panel-default" style={{width:600}}>
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Preferences</h3>
                                        </div>
                                        <div className="panel-body">
                                    <div className={'form-group' + (submitted && !user.work ? ' has-error' : '')}>
                                        <label htmlFor="work">Work</label>
                                        <input type="text" className="form-control" name="work" value={this.props.userdata.work} onChange={this.handleChange} />
                                    </div>
                                    <div className={'form-group' + (submitted && !user.education ? ' has-error' : '')}>
                                        <label htmlFor="education">Education</label>
                                        <input type="text" className="form-control" name="education" value={this.props.userdata.education} onChange={this.handleChange} />
                                    </div>
                                    <div className={'form-group' + (submitted && !user.phone ? ' has-error' : '')}>
                                        <label htmlFor="phone">Phone Number</label>
                                        <input type="text6" className="form-control" name="phone" value={this.props.userdata.phone} onChange={this.handleChange} />
                                    </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-primary">Submit</button>
                                         {registering &&
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                        }
                                    </div>
                                </form>
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
        userdata = data.users.userdetails.user;
        console.log(userdata.firstName);
    }
    return {userdata};
}
export default connect(mapStateToProps,null)(EditUserDetails);