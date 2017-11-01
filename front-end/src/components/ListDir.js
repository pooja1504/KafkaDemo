import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import ListFiles from "./ListFiles";
import * as API from '../api/API';
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
        const dir = this.state;
        API.listdir(dir)
            .then((responseJson) => {
                if (responseJson.status === 201) 
                {
                    this.setState({
                        filelist: responseJson.filelist
                    });
                    this.props.history.push("/ListFiles");
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
            <Route exact path="/listfiles" render={() => (
                        <ListFiles/>
                    )}/>
                     <form name="form" onSubmit={this.handleSubmit}>
                        <label>Enter folder to list Directory structure:</label> 
                        <input type="text" name= "dir" value={dir} onChange={this.handleChange}/><br />
                            <button className="btn btn-primary" type="submit">Submit</button> 
                    </form>
           
                     
                  </div>  
        );
    }
}

export default withRouter(ListDir);