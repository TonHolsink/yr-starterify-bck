import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

class Forms extends Component {

    constructor(props) {
        super(props);
        this.state = { input1: '', input2: '' };
        this.handleChange = this.handleChange.bind(this);
    }

    /*reset() {
     this.refs.input.getDOMNode().value = "Hello!";
     }

     alertValue() {
     alert(this.refs.input.getDOMNode().value);
     }*/

    getValidationState() {
        console.log(this.state);
        const length = this.state.input1.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
    }

    handleChange(name, e) {
        console.log(name);
        var change = {}
        change[name] = e.target.value;
        this.setState(change);
    }

    render() {

        return (
            <div>
                Hier komen formulieren
                <div className="pietjepuk">
                    <form>
                        <FormGroup
                            controlId="userFirstName"
                            validationState={this.getValidationState()}>

                            <ControlLabel>Working example with validation</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.input1}
                                placeholder="Enter text"
                                onChange={this.handleChange.bind(this,'input1')}
                            />

                            <FormControl.Feedback />
                            <HelpBlock>Validation is based on string length.</HelpBlock>
                        </FormGroup>

                        <FormGroup
                            controlId="userLastName">

                            <ControlLabel>Working example with validation</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.input2}
                                placeholder="Enter text"
                                onChange={this.handleChange.bind(this,'input2')}
                            />

                            <FormControl.Feedback />
                            <HelpBlock>Validation is based on string length.</HelpBlock>
                        </FormGroup>
                    </form>
                </div>
                <Button>dfdf</Button>
            </div>
        );
    }
}

export default Forms;
