import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {toastr} from 'react-redux-toastr';

import Row from 'react-bootstrap/lib/Row';
import DateInput from '../../../components/form/DateInput';
import TimeInput from '../../../components/form/TimeInput';
import TextAreaInput from '../../../components/form/TextAreaInput';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';

Moment.locale('nl');
momentLocalizer(Moment);

export const fields = ['actionType', 'id', 'dateAsString', 'time', 'remarks'];

const validate = values => {
    const errors = {};
    if (!values.dateAsString) errors.dateAsString = 'Dit is een verplicht veld.';
    if (!values.time) errors.time = 'Dit is een verplicht veld.';
    if (!values.remarks) errors.remarks = 'Dit is een verplicht veld.';
    return errors
};

class AppointmentAction extends Component {

    static propTypes = {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        submitting: PropTypes.bool.isRequired,
        handleDismiss: PropTypes.func
    };

    save = (data) => {
        toastr.success('success', 'De gegevens zijn succesvol opgeslagen');
        // alert(JSON.stringify(data, null, 2));
        this.props.handleDismiss && this.props.handleDismiss();
    };

    render() {
        const {fields, handleSubmit, submitting, handleDismiss} = this.props;
        return(
            <form class="form-horizontal"
                  onSubmit={handleSubmit(this.save)}
            >
                <h4>Nieuwe afspraak</h4>
                <Row>
                    <DateInput
                        cols={2}
                        disabled={submitting}
                        field={fields.dateAsString}
                        id="dateAsString"
                        label="Datum"
                    />
                    <TimeInput
                        cols={2}
                        disabled={submitting}
                        field={fields.time}
                        id="time"
                        label="Tijd"
                        step={15}
                    />
                </Row>
                <TextAreaInput
                    disabled={submitting}
                    field={fields.remarks}
                    id="remarks"
                    label="Opmerkingen"
                    rows={5}
                />
                <div class="text-right">
                    <button type="button" class="btn btn-primary btn-sm" style={{ margin: 5 }}
                            disabled={submitting} onClick={handleDismiss}>
                        Annuleren
                    </button>
                    <button type="submit" class="btn btn-primary btn-sm" style={{ margin: 5 }}
                            disabled={submitting}>
                        {submitting ? <i class="fa fa-cog fa-spin"/> : <i class="fa fa-paper-plane"/>} Opslaan
                    </button>
                </div>
            </form>
        )
    }
}

export default reduxForm({
    form: 'appointmentAction',
    fields,
    touchOnChange: true, // react-widgets DateTimePicker doesn't blur
    validate
})(AppointmentAction)
