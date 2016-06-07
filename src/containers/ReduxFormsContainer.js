import React, { Component } from 'react';
import ContactForm from './../components/FormContact';
import TravelForm from './../components/FormTravel';

export default class ReduxForms extends Component {
    render() {
        return (
            <div>
                <ContactForm />
                <hr/>
                <TravelForm />
            </div>
        );
    }
}
