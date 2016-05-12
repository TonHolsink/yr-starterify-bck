import React, { Component } from 'react';
import Notify from '../components/Notify';

export default class NotifyTestContainer extends Component {
    duration() {
        return Math.round((Math.random() * 4) + 1) * 1000;
    }
    notification(notify) {
        const duration = this.duration();
        const body = "Message - " + notify + ', Duration: ' + duration;
        this.refs.notificator[notify]("Title - " + notify, body, duration);
    }
    show() {
        //this.refs.notificator.error("Title.", "Msg - body.", duration);
        //this.refs.notificator.info("Title.", "Msg - body.", duration);
        // this.refs.notificator.success("Title.", "Msg - body.", 4000);
        const r = Math.round(Math.random() * 2);
        const arr = ['success', 'info', 'error'];

        this.notification(arr[r]);

    }

    render() {
        return (
            <div>
                <Notify ref='notificator'/>
                <button type="button" class="btn btn-success btn-lg" onClick={() => this.show()}>Notify</button>
            </div>
        );
    }
}
