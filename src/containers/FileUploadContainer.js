import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import FileUploadProgress  from '../components/fileupload/FileUploadProgress';

class FileUpload extends Component {

    constructor(props) {
        super(props)
        this.state = {
            files: []
        };
    }

    render() {
        // onProgress={(e, request, progress) => {console.log('progress', e, request, progress);}}
        return (
            <div class="container-fluid">
                <h1>Fileupload</h1>
                <FileUploadProgress
                    url={window.backendURL + 'files.filesJSON.uploadFile'}
                    onLoad={ (e, request) => {
                        const f = JSON.parse(request.responseText).result.files[0].name;
                        this.setState({files: [...this.state.files, f] });
                    }}
                    // onError={ (e, request) => {console.log('error', e, request);}}
                    // onAbort={ (e, request) => {console.log('abort', e, request);}}
                />
                <ul className='list-group'>
                    {
                        this.state.files.map((f, idx) => {
                            return <li className='list-group-item' key={idx}>{f}</li>;
                        })
                    }
                </ul>
            </div>

        )
    }
}

export default connect()(FileUpload)

