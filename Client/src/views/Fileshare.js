import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as fileuploadservice from '../_services/fileuploadservice';
import { history } from '../_helpers';
//import { listfileAction } from '../_actions';
import Fileleftnav from './Fileleftnav';
import ListDir from './ListDir';
import Fileupload from'./Fileupload';
import * as listfileaction from '../_actions/listfileaction';
import Navpage from './Navpage';
import Logout from './Logout';
class Fileshare extends React.Component {
constructor(props) {
        super(props);
		this.state = {
            sharing_email: '',
        };
            this.handleChange = this.handleChange.bind(this);
        }
handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });

    }
handleShare()
{
    //const { email, password } = this.state;
    const { dispatch } = this.props;
	const { sharing_email } = this.state;
	console.log(sharing_email);
	const payload = this.props.sharedfilename;
       console.log(payload);
       console.log("after payload"+sharing_email);
        console.log("inside handleShare fileshare Component");
        if (payload && sharing_email) {
            console.log("inside the if loop");
            dispatch(listfileaction.sendfileforshare(payload, sharing_email));
        }
        
}
    
render() {
	const { sharing_email} = this.state;
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
                                <h4> Share with: </h4>
                                <input type="email" placeholder="Enter email here" className="mm-popup__input" name="sharing_email" value={sharing_email} onChange={this.handleChange}/>
                                <h4> File to be shared: </h4>
                                <textarea value={this.props.sharedfilename}/> <br/>
                                <button className="btn btn-primary" onClick= {()=>this.handleShare()}>Share</button>
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
    let sharedfilename = data.listoffiles.filename;
    return {sharedfilename};
}
/*function mapDispatchToProps(dispatch) {
    return {
        sendfileforshare: (data) => dispatch(listfileaction.sendfileforshare(data))
    };
}*/
export default connect(mapStateToProps)(Fileshare); 
