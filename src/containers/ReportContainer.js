import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ContentHeader from '../components/ContentHeader';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

class ReportContainer extends Component {

    /*static propTypes = {
        reports: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        lastUpdated: PropTypes.number,
        dispatch: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { dispatch } = this.props;
        let query = null;
        dispatch(fetchReports(query));
    }*/

    componentDidMount() {
        const { dispatch } = this.props;
        console.log(this.props);
    }

    render() {

        return (
            <div>

                <ContentHeader title="Rapporten"/>

                {/* Main content */}
                <section className="content">

                    <div class="box">

                        <div class="box-header with-border">
                            <h3 class="box-title">Rapportages</h3>
                            <div class="box-tools pull-right">
                                <button class="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"/>
                                </button>

                                <DropdownButton style={{border: 'none'}} className="btn btn-box-tool dropdown-toggle" noCaret title={<i className="fa fa-wrench fa-fw"></i>} id="bg-nested-dropdown">
                                    <MenuItem eventKey="1">Optie 1</MenuItem>
                                    <MenuItem eventKey="2">Optie 2</MenuItem>
                                </DropdownButton>

                                <button class="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"/>
                                </button>
                            </div>
                        </div>

                        <div class="box-body">
                            <h1>sadfadfd {this.props.params.id}</h1>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
};

export default ReportContainer;
