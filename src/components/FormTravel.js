require('react-widgets/dist/css/react-widgets.css')
require('./form/react-widgets-overrides.css')

import React, {Component, PropTypes} from 'react'
import {reduxForm} from 'redux-form'
import {load as loadAccount} from '../reducers/TravelFormReducer'
import Col from 'react-bootstrap/lib/Col'
import PageHeader from 'react-bootstrap/lib/PageHeader'
import Row from 'react-bootstrap/lib/Row'
import DateInput from './form/DateInput'
import FormField from './form/FormField'
import LoadingButton from './form/LoadingButton'
import StaticField from './form/StaticField'
import TextInput from './form/TextInput'
import TextAreaInput from './form/TextAreaInput'
import SelectInput from './form/SelectInput'
import NumberInput from './form/NumberInput'
import Moment from 'moment'
import momentLocalizer from 'react-widgets/lib/localizers/moment'
import {zeroTime} from '../utils/date'
import {toastr} from 'react-redux-toastr'
export const fields = ['startDate', 'endDate', 'origin', 'destination', 'hotel', 'hasCar', 'flightClass', 'personCount', 'story'];

Moment.locale('nl');
momentLocalizer(Moment);

const TODAY = zeroTime(new Date());

const data = {
    startDate: new Date(),
    endDate: new Date(),
    origin: 'Amsterdam',
    destination: 'New York',
    hotel: 'Hilton',
    hasCar: 'no',
    flightClass: 'tourist',
    personCount: 1,
    story: 'Er was eens...'
};

const validate = values => {
    const errors = {};

    if (!values.startDate) errors.startDate = 'Please enter a start date.';
    if (!values.endDate) errors.endDate = 'Please enter an end date.';
    if (values.startDate && values.endDate &&
        zeroTime(values.endDate) < zeroTime(values.startDate)) {
        errors.endDate = 'End date must not be earlier than start date.'
    }
    if (!values.origin) errors.origin = 'Please enter an origin.';
    if (!values.destination) errors.destination = 'Please enter a destination.';
    return errors
};

class TravelForm extends Component {

    constructor(props) {
        super(props);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.state = {fakeSubmitted: null}
    }

    componentWillMount() {
        // this.props.initializeForm({
        //   startDate: new Date(),
        //   endDate: null,
        //   origin: 'Home',
        //   destination: '',
        //   hotel: '',
        //   hasCar: 'yes',
        //   flightClass: 'tourist',
        //   personCount: 11,
        //   story: 'verhaaltje',
        // })
    }

    /**
     * Set endDate to startDate if it's blank or would otherwise be invalid.
     */
    handleStartDateChange(startDate) {
        const {endDate} = this.props.fields;
        if (endDate.value == null || endDate.value < startDate) {
            endDate.onChange(startDate)
        }
    }

    save(data) {
        const that = this;
        return new Promise(
            function (resolve, reject) {
                setTimeout(
                    function () {
                        resolve(true);
                    }, 2000);
            }).then(
            function () {
                that.setState({fakeSubmitted: data});
                toastr.success('success', 'De gegevens zijn succesvol opgeslagen');
                // console.log(Moment(data.startDate).format("dddd, MMMM Do YYYY, h:mm:ss a"));
            }
        );
    }

    render() {
        const {fields, resetForm, handleSubmit, load, submitting} = this.props;
        const {fakeSubmitted} = this.state;
        return <div className="container-fluid">
            <PageHeader>redux-form example</PageHeader>
            <div class='text-center'>
                <button type="button" class="btn btn-success" onClick={() => load(data)}>Load Account</button>
                {' '}
                <button type="button" class="btn btn-success" onClick={() => resetForm()}>Reset</button>
            </div>
            <form className="form-horizontal" onSubmit={handleSubmit(this.save.bind(this))}>
                <StaticField label="First Name:" value="Steve"/>
                <StaticField label="Last Name:" value="Test"/>
                <Row>
                    <DateInput
                        cols={2}
                        afterChange={this.handleStartDateChange}
                        disabled={submitting}
                        field={fields.startDate}
                        id="startDate"
                        label="Start Date:"
                        min={TODAY}
                    />
                    <DateInput
                        cols={2}
                        disabled={submitting}
                        field={fields.endDate}
                        id="endDate"
                        label="End Date:"
                        min={fields.startDate.value || TODAY}
                    />
                </Row>
                <TextInput
                    disabled={submitting}
                    field={fields.origin}
                    id="origin"
                    label="Origin:"
                />
                <TextInput
                    disabled={submitting}
                    field={fields.destination}
                    label="Destination:"
                    id="destination"
                />
                <Row>
                    <TextInput
                        cols={2}
                        disabled={submitting}
                        field={fields.hotel}
                        help="Please enter name of hotel here. If no hotel booking exists or unknown put 'N/A'"
                        id="hotel"
                        label="Hotel:"
                    />
                    <FormField cols={2}
                               help="Please select 'Yes' if access to a car (rented or personal) during travel and 'No' if no access to a car during travel"
                               label="Car:">
                        <label className="radio-inline">
                            <input type="radio" name="hasCar" value="yes" onChange={fields.hasCar.onChange}
                                   checked={fields.hasCar.value === 'yes'} disabled={submitting}/> Yes
                        </label>
                        <label className="radio-inline">
                            <input type="radio" name="hasCar" value="no" onChange={fields.hasCar.onChange}
                                   checked={fields.hasCar.value === 'no'} disabled={submitting}/> No
                        </label>
                    </FormField>
                </Row>
                <Row>
                    <SelectInput
                        cols={2}
                        disabled={submitting}
                        field={fields.flightClass}
                        label="Flight Class:"
                        id="flightClass"
                        list={[{key: 'business', value: 'Business Class'}, {key: 'tourist', value: 'Tourist Class'}, {key: 'stowaway', value: 'Stowaway Class'}]}
                    />
                    <NumberInput
                        cols={2}
                        disabled={submitting}
                        field={fields.personCount}
                        label="Person Count:"
                        id="personCount"
                        min={0}
                        max={1000}
                        step={1}
                    />
                </Row>
                <TextAreaInput
                    disabled={submitting}
                    field={fields.story}
                    help="Please enter a story"
                    id="story"
                    label="Story:"
                    rows={10}
                />
                <Row className="form-group">
                    <Col sm={12} className="text-center">
                        <LoadingButton
                            bsStyle="primary"
                            label="Add Travel"
                            loading={submitting}
                            loadingLabel="Adding Travel"
                            type="submit"
                        />
                    </Col>
                </Row>
                {fakeSubmitted && <pre><code>{JSON.stringify(fakeSubmitted, null, 2)}</code></pre>}
            </form>
        </div>
    }

}

TravelForm.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
};

export default reduxForm({
        form: 'TravelForm',
        fields,
        touchOnChange: true, // react-widgets DateTimePicker doesn't blur
        validate
    },
    state => ({ // mapStateToProps
        initialValues: state.account.data // will pull state into form's initialValues
    }),
    {load: loadAccount}      // mapDispatchToProps (will bind action creator to dispatch)

)(TravelForm)
