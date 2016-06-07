import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {toastr} from 'react-redux-toastr';

import Row from 'react-bootstrap/lib/Row';
import SelectInput from '../../../components/form/SelectInput';
import TextAreaInput from '../../../components/form/TextAreaInput';

export const fields = ['actionType', 'id', 'internalPriority', 'remarks'];

const validate = values => {
    const errors = {};
    if (!values.internalPriority) errors.internalPriority = 'Dit is een verplicht veld.';
    if (!values.remarks) errors.remarks = 'Dit is een verplicht veld.';
    return errors
};

class PriorityAction extends Component {

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
                <h4>Prioriteit</h4>
                <Row>
                    <SelectInput
                        cols={2}
                        disabled={submitting}
                        field={fields.internalPriority}
                        label="Prioriteit"
                        id="priority"
                        list={[{key: 'business', value: 'Business Class'}, {key: 'tourist', value: 'Tourist Class'}, {key: 'stowaway', value: 'Stowaway Class'}]}
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
    form: 'priorityAction',
    fields,
    validate
})(PriorityAction)
