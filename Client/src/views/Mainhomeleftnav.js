import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';

class Mainhomeleftnav extends React.Component {
    render() {
        return (
            <div>
                    <ul name="leftnavmenu" id="leftnavmenu">
                        <img src={require('../images/Dropbox.png')} style={{width: 40, height: 40}}/><br/><br/>
                        <a href="/Mainhome">Home</a> <br/><br/>
                        <a href="/MainFilePage">Files</a><br/><br/>
                    </ul>
            </div>
    );
    }
}
export default Mainhomeleftnav;