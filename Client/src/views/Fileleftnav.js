import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';

class Fileleftnav extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <ul name="leftnavmenu" id="leftnavmenu">
                        <img src={require('../images/Dropbox.png')} style={{width: 50, height: 50}}/><br/><br/>
                        <a href="/Mainhome">Home</a> <br/><br/>
                        <a href="/MainFilePage">MyFiles</a> <br/><br/>
                        <a href="/">Sharing</a><br/><br/>
                        <a href="/">File requests</a><br/><br/>
                        <a href="/">Deleted files</a><br/><br/>

                    </ul>
                </div>
            </div>
        );
    }
}
export default Fileleftnav;