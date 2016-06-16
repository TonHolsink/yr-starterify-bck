import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {toastr} from 'react-redux-toastr';

import Row from 'react-bootstrap/lib/Row';
import SelectInput from '../../../components/form/SelectInput';
import TextAreaInput from '../../../components/form/TextAreaInput';

import { jsonFetch } from '../../../utils';
import {isEmpty} from 'lodash/lang';
import sortBy from 'lodash.sortby';

export const fields = ['actionType', 'id', 'assignContractors', 'assignEmployees', 'remarks'];

const validate = values => {
    const errors = {};
    if (!values.remarks) errors.remarks = 'Dit is een verplicht veld.';
    if ((!values.assignContractors) && (!values.assignEmployees)) {
        errors.assignContractors = 'U moet een bestemming kiezen';
        errors.assignEmployees = 'U moet een bestemming kiezen';
    }
    return errors
};

class AssignAction extends Component {

    static propTypes = {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        submitting: PropTypes.bool.isRequired,
        handleDismiss: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            contracterList: [],
            employeeList: []
        };
    }

    getNiceEmail(customerOrEmployee , useFullname) {
        let niceEmail = "";
        if (!isEmpty(customerOrEmployee.email)) {
            let name = useFullname ? customerOrEmployee.fullname : customerOrEmployee.name;
            if (isEmpty(name)) {
                niceEmail = customerOrEmployee.email;
            } else {
                niceEmail = `${name} <${customerOrEmployee.email}>`;
            }
        }
        return niceEmail;
    }

    fillList(arr, employee) {
        let list = [];
        if (arr) {
            arr.map((item) => {
                list.push({key: item.identification, value: this.getNiceEmail(item, employee)})
            });
        }
        return list;
    }

    produceContracters(json) {
        if (json.result) {
            const list = this.fillList(json.result);
            this.setState(Object.assign({}, this.state, {contracterList: sortBy(list, item => item.value)}));
        }
    }

    produceEmployees(json) {
        if (json.result) {
            const list = this.fillList(json.result, true);
            this.setState(Object.assign({}, this.state, {employeeList: sortBy(list, item => item.value)}));
        }
    }

    save = (data) => {
        toastr.success('success', 'De gegevens zijn succesvol opgeslagen');
        // alert(JSON.stringify(data, null, 2));
        this.props.handleDismiss && this.props.handleDismiss();
    };

    componentDidMount() {
        this.contracterListRequest = jsonFetch('customers.customersJSON.getCustomerContractors').then(json => this.produceContracters(json));
        this.employeeListRequest = jsonFetch('users.usersJSON.getInternalEmployees').then(json => this.produceEmployees(json));
    }

    componentWillUnmount() {
        // isomorphic-fetch heeft nog geen abort functionaliteit
        // this.contracterListRequest.abort();
        // this.employeeListRequest.abort();
    }

    handleAssignToChange = (ev) => {
        const {assignContractors, assignEmployees} = this.props.fields;
        (ev.target.id === 'assignContractors') ? assignEmployees.onChange('') : assignContractors.onChange('');
    };

    render() {
        const {fields, handleSubmit, submitting, handleDismiss} = this.props;
        return(
            <form class="form-horizontal"
                  onSubmit={handleSubmit(this.save)}
            >
                <h4>Toewijzen</h4>
                <Row>
                    <SelectInput
                        cols={2}
                        disabled={submitting}
                        field={fields.assignContractors}
                        label="Aan / met"
                        id="assignContractors"
                        list={this.state.contracterList}
                        headerValue="Kies opdrachtnemer&hellip;"
                        afterChange={this.handleAssignToChange}
                    />
                    <SelectInput
                        cols={2}
                        disabled={submitting}
                        field={fields.assignEmployees}
                        label="of"
                        id="assignEmployees"
                        list={this.state.employeeList}
                        headerValue="een medewerker&hellip;"
                        afterChange={this.handleAssignToChange}
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
    form: 'assignAction',
    fields,
    validate
})(AssignAction)
