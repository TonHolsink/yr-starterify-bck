import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchReportList } from '../actions/ReportActions';
import DataTable from '../components/YRDataTable';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import ContentHeader from '../components/ContentHeader';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import Loading from '../components/Loading';
import msg from '../terminology/messages.js';

Moment.locale('nl');
momentLocalizer(Moment);

class ReportListContainer extends Component {

    static propTypes = {
        reports: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        lastUpdated: PropTypes.number,
        dispatch: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchReportList(null));
    };

    handleRefreshClick = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(fetchReportList(null));
    };

    render() {

        const { reports, isFetching, lastUpdated } = this.props;
        const isEmpty = reports.length === 0;

        const buildRowOptions = (row) => {
            return {
                'onClick': () => {
                    this.props.router.push('report/' + row._key + '/');
                }
            };
        };

        const data = this.props.reports.map(function(row) {
            return {
                _key: row.reference,
                _date: Moment(row.lastStatusDate).calendar(),
                _priority: <span class="label bg-green">Normaal</span>,
                _username: row.user.fullname || row.user.email,
                _subject: row.lastStatus,
                _status: msg('item_status_' + row.status)
            };
        });

        const columns = [
            { title: 'Datum', prop: '_date' },
            { title: 'Prioriteit', prop: '_priority' },
            { title: 'Melder (volledige naam, e-mail)', prop: '_username' },
            { title: 'Onderwerp (nummer)', prop: '_subject' },
            { title: 'Status (toegewezen aan)', prop: '_status' }
        ];

        return (
            <div>

                <ContentHeader title="Meldingen"/>

                <section class="content">

                    <div class="box container-fluid table-responsive">

                        <div class="box-header with-border">
                            <h3 class="box-title">Meldingen</h3>
                            <div class="box-tools pull-right">
                                <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"/></button>

                                <DropdownButton style={{border: 'none'}} class="btn btn-box-tool dropdown-toggle" noCaret title={<i class="fa fa-wrench fa-fw"/>} id="bg-nested-dropdown">
                                    <MenuItem eventKey="1">Optie 1</MenuItem>
                                    <MenuItem eventKey="2">Optie 2</MenuItem>
                                </DropdownButton>

                                <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"/></button>
                            </div>
                        </div>

                        <div class="box-body">
                            <p>
                                {lastUpdated && <span>Laatste update om {new Date(lastUpdated).toLocaleTimeString()}.{' '}</span>}
                                {
                                    !isFetching &&
                                    <a href="#"
                                        onClick={this.handleRefreshClick}>
                                        Verversen
                                    </a>
                                }
                            </p>
                            {isEmpty ? (isFetching ? <Loading /> : <h2>Geen gegevens.</h2>)
                                : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                                    <DataTable
                                        buildRowOptions={buildRowOptions}
                                        keys={[ '_key' ]}
                                        columns={columns}
                                        initialData={data}
                                        initialPageLength={25}
                                        initialSortBy={{ prop: '_date', order: 'descending' }}
                                        pageLengthOptions={[ 10, 25, 50 ]}
                                        hover={true}
                                    />
                                </div>
                            }
                        </div>

                    </div>

                </section>

            </div>
        );
    }
}

function mapStateToProps(state) {

    // Bind reducer functions, where state.reportState is the reducer
    const { reportsByQuery } = state.reportState;

    // Default initial state
    let isFetching = true;
    let reports = [];
    let lastUpdated = null;

    // Check if state is undefined or empty
    if (reportsByQuery && Object.keys(reportsByQuery).length > 0) {
        isFetching = reportsByQuery.isFetching;
        reports = reportsByQuery.items;
        lastUpdated = reportsByQuery.lastUpdated;
    }

    return {
        reports,
        isFetching,
        lastUpdated
    };
}

export default connect(mapStateToProps)(withRouter(ReportListContainer));
