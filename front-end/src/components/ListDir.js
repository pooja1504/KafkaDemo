import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import ListFiles from "./ListFiles";
class ListDir extends Component {

    constructor(props){
        super(props);

        // reset login status
        //this.props.dispatch(userActions.logout());

        this.state = {
            dir: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        console.log("its handleChange");
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleSubmit(e) {
        console.log("its handleSubmit");
        e.preventDefault();
        const { dir } = this.state;
        if (dir) {
        const requestOptions = {
        method: 'POST',
        credentials:'include',
        mode:'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dir })
    };
    console.log(requestOptions);

    fetch('http://localhost:3001/listdir', requestOptions)
        .then((response) => response.json()).then((responseJson) => {
            console.log(responseJson.filelist);
            this.setState({
                filelist:responseJson
            });
            this.props.history.push("/ListFiles");
    ////handle response for file listing
});
        }
    }

    render() { 
        const { dir } = this.state;
        return (
                <div className="row justify-content-md-center">
                     <form name="form" onSubmit={this.handleSubmit} method="post">
                        <label>Enter folder to list Directory structure:</label> 
                        <input type="text" name= "dir" value={dir} onChange={this.handleChange}/><br />
                            <button className="btn btn-primary" type="submit">Submit</button> 
                    </form>
                     <Route exact path="/ListFiles" render={() => (
                    <ListFiles/>
                )}/>
                  </div>  
        );
    }
}

export default withRouter(ListDir);