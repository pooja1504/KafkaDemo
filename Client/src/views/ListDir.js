import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import { history } from '../_helpers';
import * as listfileaction from '../_actions/listfileaction';
class ListDir extends Component {

    constructor(props){
        super(props);

        // reset login status
        //this.props.dispatch(userActions.logout());

        this.state = {
            dir: '',
            filelist:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        console.log("its handleChange");
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleSubmit(e){
        console.log("its handleSubmit");
        e.preventDefault();
        const {dispatch}= this.props;
        const dir = this.state;
        API.listdir(dir)
            .then((responseJson) => {
                if (responseJson.status === 201) 
                {
                    
                    filelist: responseJson.filelist;
                    //dispatch(updateListFiles(responseJson.filelist));
                    this.props.updateListFiles(responseJson.filelist);
                    history.push("/Listfiles");
                } 
                else 
                {
                }
            });
    };

    render() { 
        const { dir } = this.state;
        return (

                <div className="row justify-content-md-center">
                     <form name="form" onSubmit={this.handleSubmit}>
                        <label>Enter folder to list Directory structure:</label> 
                        <input type="text" name= "dir" value={dir} onChange={this.handleChange}/><br />
                            <button className="btn btn-primary" type="submit">Submit</button> 
                    </form>
           
                     
                  </div>  
        );
    }
}
function mapStateToProps(data) {
    let fileList = [];
    console.log("in component ----- ");
    return {fileList};
}
function mapDispatchToProps(dispatch) {
    return {
        updateListFiles:(data) => dispatch(listfileaction.updateListFiles(data))
        
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(ListDir);