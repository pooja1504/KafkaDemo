import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as fileuploadservice from '../_services/fileuploadservice';
import * as listfileaction from '../_actions/listfileaction';
import { history } from '../_helpers';
import Accordion from 'react-responsive-accordion';
import Panel from 'react-bootstrap';

class Fileupload extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        //this.props.dispatch(userActions.logout());

        this.state = {
            myfolder:'',
            mysharedfolder:'',
            sharedemail:'',
            folderuploadbool:false,
            sharefolderbool:false
        };
        this.handleFolderupload = this.handleFolderupload.bind(this);
        this.handleFolderChange = this.handleFolderChange.bind(this);
        this.handleSharedFolderChange = this.handleSharedFolderChange.bind(this);
        this.handleShareFolder = this.handleShareFolder.bind(this);
        this.FolderUpload =this.FolderUpload.bind(this);
        this.ShareFolder =this.ShareFolder.bind(this);

    }


    handleFileUpload = (event) => {
        const payload = new FormData();
        payload.append('mypic', event.target.files[0]);
        console.log("inside handleUpoad");
        console.log(payload);
        fileuploadservice.uploadFile(payload)
            .then((status) => {
                if (status === 204) {
                    console.log("file uploaded");
                   this.props.addTodoNew();
                }
            });

    };
    handleStar(file){
       const payload = file;
       console.log(payload);
        console.log("inside handleSubmit for starfile");
        //console.log(payload.fieldName);
        fileuploadservice.starfile(payload)
            .then((status) => {
                if (status === 204) {
                    console.log("file starred in Listfiles.js");
                   this.props.addTodoNew();
                }
            });
    };
    handleShare(file){
        console.log(file);
        console.log("hey its handleShare in Fileupload");
        this.props.sharefileaction(file);
        history.push('/Fileshare');
    }
    handleFolderupload(){
        this.setState({ folderuploadbool: true});
    }
    handleShareFolder(){
        this.setState({ sharefolderbool: true});

    }
    handleFolderChange(e){
            const { name, value } = e.target;
            this.setState({ [name]: value });
    }
    handleSharedFolderChange(e){
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    FolderUpload()
    {
       const {myfolder}= this.state;
       console.log(this.state.myfolder);
        const { dispatch } = this.props;
        dispatch(listfileaction.folderupload(myfolder));
    }
    ShareFolder()
    {
        const {mysharedfolder,sharedemail} =this.state;
        const { dispatch } = this.props;
            dispatch(listfileaction.sharefolder(mysharedfolder,sharedemail));
    }

    render(){

        const { folderuploadbool,sharefolderbool} = this.state;
        const {myfolder,mysharedfolder,sharedemail} = this.state;
        var upButton ={
            textAlign: 'Center',
            paddingLeft:5,
            paddingRight: 5,
            backgroundColor:'#205FDE',
            width:200
        };
            return (

                <div style={{backgroundColor: '', width: 1000, height: 800}}>
                    <div className="col-sm-4">

                        <br/>
                        <label className="btn btn-primary" style={upButton}>
                            Upload Files<input type="file" onChange={this.handleFileUpload}/>
                        </label>
                        <br/>
                        <br/>
                        <img src={require('../images/folder.png')}/> &nbsp;&nbsp;
                        <button className="btn-link" style={{color:'blue'}} onClick={this.handleShareFolder}> New Shared Folder</button><br/><br/>
                        <img src={require('../images/folder.png')} rounded/> &nbsp;&nbsp;
                        <button className="btn-link" style={{color:'blue'}} onClick={this.handleFolderupload}> New Folder</button><br/><br/>
                        {folderuploadbool ?
                            <div>Enter Folder name : <input type="text" name="myfolder" style={{width:75}} value={myfolder} onChange={this.handleFolderChange}/><br/>
                            <button className="btn-primary" style={{width: 100}} onClick={this.FolderUpload}>Add</button></div>
                        : ''
                    }
                        {sharefolderbool ?
                            <div>Enter Folder name : <input type="text" name="mysharedfolder" style={{width:100}} value={mysharedfolder} onChange={this.handleSharedFolderChange}/><br/>
                                Share with:&emsp; &emsp; &emsp; &emsp;
                                <input type="email" name="sharedemail" style={{width:100}} value={sharedemail} onChange={this.handleSharedFolderChange}/>
                               <br/>
                                <button className="btn-primary" style={{width: 100}} onClick={this.ShareFolder}>Add</button></div>
                            : ''
                        }
                    </div>
                </div>
        );
    }
}
/*function mapStateToProps(data) {
    let fileList = [];
    if(data.listoffiles.files !== undefined) {
        fileList = data.listoffiles.files.files;
        console.log(data.listoffiles.files.files);  
        
    }
    return {fileList};
}*/
/*function mapDispatchToProps(dispatch) {
    return {
        addTodoNew : () => dispatch(listfileaction.listfiles()),
        sharefileaction:(data) => dispatch(listfileaction.sharefileaction(data)),
        folderupload : (data) => dispatch(listfileaction.folderupload(data)),
        //sharefolder: (data) => dispatch(listfileaction.sharefolder(data))
    };
}*/
export default connect(null,null)(Fileupload);