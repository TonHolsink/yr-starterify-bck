import React, {Component, PropTypes} from 'react'
import {reduxForm} from 'redux-form'
import msg from '../terminology/messages.js'
import {toastr} from 'react-redux-toastr'

export const fields = ['username', 'email', 'age']

const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = 'Required'
    } else if (values.username.length > 15) {
        errors.username = 'Must be 15 characters or less'
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!values.age) {
        errors.age = 'Required'
    } else if (isNaN(Number(values.age))) {
        errors.age = 'Must be a number'
    } else if (Number(values.age) < 18) {
        errors.age = 'Sorry, you must be at least 18 years old'
    }
    return errors
}


class ContactForm extends Component {
    save(data) {
        toastr.success('success', 'De gegevens zijn succesvol opgeslagen');
        // alert(JSON.stringify(data, null, 2));
    }

    render() {
        const {fields: {username, email, age}, resetForm, handleSubmit, submitting} = this.props
        return ( <div class="container-fluid">
                <h1>Contact form</h1>
                <form class="form-horizontal" onSubmit={handleSubmit(this.save.bind(this))}>
                    <div class={'form-group' + (username.touched && username.error ? ' has-error' : '')}>
                        <label class="col-xs-4 control-label">{msg("lbl_username")}</label>
                        <div class={'col-xs-' + (username.touched && username.error ? '5' : '8')}>
                            <input type="text" class="col-xs-8 form-control" placeholder={msg("lbl_username")} {...username}/>
                        </div>
                        {username.touched && username.error && <div class="col-xs-3 help-block">{username.error}</div>}
                    </div>
                    <div class={'form-group' + (email.touched && email.error ? ' has-error' : '')}>
                        <label class="col-xs-4 control-label">{msg("lbl_email")}</label>
                        <div class={'col-xs-' + (email.touched && email.error ? '5' : '8')}>
                            <input type="text" class="col-xs-8 form-control" placeholder={msg("lbl_email")} {...email}/>
                        </div>
                        {email.touched && email.error && <div class="col-xs-3 help-block">{email.error}</div>}
                    </div>
                    <div class={'form-group' + (age.touched && age.error ? ' has-error' : '')}>
                        <label class="col-xs-4 control-label">{msg("lbl_age")}</label>
                        <div class={'col-xs-' + (age.touched && age.error ? '5' : '8')}>
                            <input type="text" class="col-xs-8 form-control" placeholder={msg("lbl_age")} {...age}/>
                        </div>
                        {age.touched && age.error && <div class="col-xs-3 help-block">{age.error}</div>}
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary" style={{ margin: 10 }}
                                disabled={submitting}>
                            {submitting ? <i class="fa fa-cog fa-spin"/> : <i class="fa fa-paper-plane"/>} Submit
                        </button>
                        <button type="button" class="btn btn-default" style={{ margin: 10 }}
                                disabled={submitting} onClick={resetForm}>
                            Clear Values
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

ContactForm.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
}

export default reduxForm({
    form: 'contactForm',
    fields,
    validate
})(ContactForm)
