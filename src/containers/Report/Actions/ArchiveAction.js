import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {toastr} from 'react-redux-toastr';

import TextAreaInput from '../../../components/form/TextAreaInput';

export const fields = ['actionType', 'id', 'remarks'];

const validate = values => {
    const errors = {};
    if (!values.remarks) errors.remarks = 'Dit is een verplicht veld.';
    return errors
};

class ArchiveAction extends Component {

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
                <h4>Archiveren</h4>
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
    form: 'archiveAction',
    fields,
    validate
})(ArchiveAction)
