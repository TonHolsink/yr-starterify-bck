'use strict';

import {EventEmitter} from 'events';
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import FileInput from './FileInput'

const styles = {
    progressWrapper: {
        height: '10px',
        marginTop: '10px',
        width: '100%',
        float: 'left',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        WebkitBoxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)'
    },
    progressBar: {
        float: 'left',
        width: '0',
        height: '100%',
        fontSize: '12px',
        lineHeight: '20px',
        color: '#fff',
        textAlign: 'center',
        backgroundColor: '#337ab7',
        WebkitBoxShadow: 'inset 0 -1px 0 rgba(0,0,0,.15)',
        boxShadow: 'inset 0 -1px 0 rgba(0,0,0,.15)',
        WebkitTransition: 'width .6s ease',
        Otransition: 'width .6s ease',
        transition: 'width .6s ease'
    },
    uploadWrapperFade: {
        WebkitTransition: 'opacity 1s',
        Otransition: 'opacity 1s',
        transition: 'opacity 1s',
        opacity: 0
    },
    uploadWrapper: {
        WebkitTransition: 'none',
        Otransition: 'none',
        transition: 'none',
        opacity: 1
    }
};

export default class FileUploadProgress extends Component {
    constructor(props) {
        super(props);
        this.proxy = new EventEmitter();
        this.state = {
            progress: -1,
            hasError: false,
            uniqKey: Math.random()
        };
    }

    cancelUpload() {
        this.proxy.emit('abort');
        this.setState({
            progress: -1,
            hasError: false
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({
            progress: 0,
            hasError: false,
            filename: e.target.value.split(/(\\|\/)/g).pop()
        }, this._doUpload);
    }

    render() {
        let formElement = this.props.formRenderer(this.onSubmit.bind(this),this);
        let progessElement = this.props.progressRenderer(this.state.progress, this.state.hasError, this.cancelUpload.bind(this), this.state.filename);

        return (
            <div>
                {formElement}
                {progessElement}
            </div>
        );
    }

    _getFormData() {
        if (this.props.formGetter) {
            return this.props.formGetter();
        }
        return new FormData(ReactDom.findDOMNode(this.refs.form));
    }

    _doUpload() {
        let form = this._getFormData();
        let req = new XMLHttpRequest();
        req.open('POST', this.props.url);

        req.addEventListener('load', (e) => {
            this.proxy.removeAllListeners(['abort']);
            let newState = {progress: 100};
            if (req.status >= 200 && req.status <= 299) {
                this.setState(newState, () => {
                    this.props.onLoad(e, req);
                    this.setState({uniqKey: Math.random()});
                });
            } else {
                newState.hasError = true;
                this.setState(newState, () => {
                    this.props.onError(e, req);
                });
            }
        }, false);

        req.addEventListener('error', (e) => {
            this.setState({
                hasError: true
            }, () => {
                this.props.onError(e, req);
            });
        }, false);

        req.upload.addEventListener('progress', (e) => {
            let progress = 0;
            if (e.total !== 0) {
                progress = parseInt((e.loaded / e.total) * 100);
            }
            this.setState({
                progress: progress
            }, () => {
                this.props.onProgress(e, req, progress);
            });
        }, false);

        req.addEventListener('abort', (e) => {
            this.setState({
                progress: -1
            }, () => {
                this.props.onAbort(e, req);
            })
        }, false);

        this.proxy.once('abort', () => {
            req.abort();
        });

        this.props.beforeSend(req)
            .send(this.props.formCustomizer(form));
    }
}

FileUploadProgress.propTypes = {
    url: React.PropTypes.string.isRequired,
    formGetter: React.PropTypes.func,
    formRenderer: React.PropTypes.func,
    progressRenderer: React.PropTypes.func,
    formCustomizer: React.PropTypes.func,
    beforeSend: React.PropTypes.func,
    onProgress: React.PropTypes.func,
    onLoad: React.PropTypes.func,
    onError: React.PropTypes.func,
    onAbort: React.PropTypes.func
};

FileUploadProgress.defaultProps = {
    formRenderer: (onSubmit, that) => {
        return (
            <div>
                <form className='_react_fileupload_form_content' ref='form' method='post' onSubmit={onSubmit}>
                    <FileInput
                        name="files[]"
                        className="inputClass"
                        onChange={onSubmit}
                        uniqKey={that.state.uniqKey}
                    />
                </form>
            </div>
        )
    },
    progressRenderer: (progress, hasError, cancelHandler, filename) => {
        if (hasError || progress > -1) {
            let barStyle = Object.assign({}, styles.progressBar);
            barStyle.width = progress + '%';

            let message = (<span>Uploading {filename}...</span>);
            if (hasError) {
                barStyle.backgroundColor = '#d9534f';
                message = (<span style={{'color': '#a94442'}}>Failed to upload ...</span>);
            }
            if (progress === 100) {
                message = (<span >{filename} successfully uploaded</span>);
            }

            return (
                <div className='_react_fileupload_progress_content'>
                    <div style={(progress === 100) ? styles.uploadWrapperFade : styles.uploadWrapper}>
                        <div style={styles.progressWrapper}>
                            <div className='_react_fileupload_progress_bar' style={barStyle}></div>
                        </div>
                    </div>
                    <div style={{'clear':'left'}}>
                        {message}
                    </div>
                </div>
            );
        } else {
            return;
        }
    },
    formCustomizer: (form) => {
        return form;
    },
    beforeSend: (request) => {
        return request;
    },
    onProgress: (e, request, progress) => {
    },
    onLoad: (e, request) => {
    },
    onError: (e, request) => {
    },
    onAbort: (e, request) => {
    }
};
