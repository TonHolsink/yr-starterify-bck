import React, { Component } from 'react';
import ContactForm from './../components/FormContact';
import TravelForm from './../components/FormTravel';

//Mag weg
import Term from '../terminology/Term'

export default class ReduxForms extends Component {
    render() {
        return (
            <div>
                <Term mkey="lbl_adress"/>
                <hr/>
                <ContactForm />
                <hr/>
                <TravelForm />
            </div>
        );
    }
}
