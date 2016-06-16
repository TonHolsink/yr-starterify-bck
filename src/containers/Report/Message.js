import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {toastr} from 'react-redux-toastr';

import Row from 'react-bootstrap/lib/Row';
import Checkbox from '../../components/form/Checkbox';
import TextAreaInput from '../../components/form/TextAreaInput';
import SelectInput from '../../components/form/SelectInput';

export const fields = ['toReporter', 'to', 'message'];

const validate = values => {
    const errors = {};
    if (!values.message) errors.message = 'Dit is een verplicht veld.';
    if (!values.to) {
        errors.to = 'U moet een bestemming kiezen';
    }
    return errors
};

export default class Message extends Component {

    static propTypes = {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        submitting: PropTypes.bool.isRequired,
        handleDismiss: PropTypes.func
    };

    save = (data) => {
        //Niet zo fraai, maar checkbox zit niet in submit
        //TODO: Andere oplossing bedenken
        data.toReporter = data.toReporter || false;
        toastr.success('success', 'De gegevens zijn succesvol opgeslagen');
        alert(JSON.stringify(data, null, 2));
        this.props.handleDismiss && this.props.handleDismiss();
    };

    render() {
        const {fields, handleSubmit, submitting, handleDismiss} = this.props;
        return (
            <form class="form-horizontal"
                  onSubmit={handleSubmit(this.save)}
            >
                <Row>
                    <Checkbox
                        cols={2}
                        disabled={submitting}
                        field={fields.toReporter}
                        label="Aan melder"
                        name="toReporter"
                        id="toReporter"
                    />
                </Row>
                <Row>
                    <SelectInput
                        cols={2}
                        disabled={submitting}
                        field={fields.to}
                        label="Aan / met"
                        list={[
                                {key: 'info@rondomtuinen.com', value: 'Rondom Tuinen <info@rondomtuinen.com>'},
                                {key: 'pgras@massier.nl', value: 'Massier <pgras@massier.nl>'},
                                {key: 'planning@hulsman-zonwering.nl', value: 'Huisman Zonwering <planning@hulsman-zonwering.nl>'},
                                {key: 'j.mandjes@eks.nl', value: 'EKS <j.mandjes@eks.nl>'}
                            ]}
                    />
                </Row>
                <TextAreaInput
                    disabled={submitting}
                    field={fields.message}
                    label="Bericht"
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
    form: 'message',
    fields,
    validate
})(Message)
