import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as fileuploadservice from '../_services/fileuploadservice';
import * as listfileaction from '../_actions/listfileaction';
import { history } from '../_helpers';

class Fileupload extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        //this.props.dispatch(userActions.logout());

        this.state = {
            myfolder:'',
            trial:false
        };
        this.handleFolderupload = this.handleFolderupload.bind(this);
        this.handleFolderChange = this.handleFolderChange.bind(this);
        this.FolderUpload =this.FolderUpload.bind(this);
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
        //const {trial} = this.state;

        this.setState({ trial: true});
        console.log(this.state.trial);
    }
    handleFolderChange(e){

            const { name, value } = e.target;
            this.setState({ [name]: value });
    }
    FolderUpload()
    {
       const {myfolder}= this.state;
        console.log(this.state.myfolder);
        this.props.folderupload(myfolder);

    }

    render(){
        const { trial} = this.state;
        const {myfolder } = this.state;
        console.log(trial);
            return (

                <div style={{backgroundColor: '', width: 1000, height: 800}}>
                    <div className="col-sm-4">
                        <h4><b> Upload your files here </b></h4>
                        <button className="btn-primary" style={{width: 100}}>
                            <input className={'fileupload'} type="file" name="mypic" onChange={this.handleFileUpload}
                                   style={{width: 75}}/>
                        </button>
                        <br/>
                        <br/>
                        <button className="btn-primary" style={{width: 100}} onClick={this.handleFolderupload}> New Folder</button><br/><br/>
                        {trial ?
                            <div>Enter Folder name : <input type="text" name="myfolder" value={myfolder} onChange={this.handleFolderChange}/><br/>
                            <button className="btn-primary" style={{width: 100}} onClick={this.FolderUpload}>Add</button></div>
                        : ''
                    }
                    </div>
                </div>
        );
    }
}
function mapStateToProps(data) {
    let fileList = [];
    if(data.listoffiles.files !== undefined) {
        fileList = data.listoffiles.files.files;
        console.log(data.listoffiles.files.files);  
        
    }
    return {fileList};
}
function mapDispatchToProps(dispatch) {
    return {
        addTodoNew : () => dispatch(listfileaction.listfiles()),
        sharefileaction:(data) => dispatch(listfileaction.sharefileaction(data)),
        folderupload : (data) => dispatch(listfileaction.folderupload(data))
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Fileupload);