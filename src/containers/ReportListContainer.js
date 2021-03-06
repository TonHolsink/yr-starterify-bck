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

import { hasClass } from '../utils/dom';

Moment.locale('nl');
momentLocalizer(Moment);

class ReportListContainer extends Component {

    static propTypes = {
        reports: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        lastUpdated: PropTypes.number,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            checkedRows: []
        };

    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchReportList(null));
    };

    handleRefreshClick = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(fetchReportList(null));
    };

    handleActionCheckClick = (e, row) => {
        e.stopPropagation();
        const i = this.state.checkedRows.indexOf(row._key);
        if (e.target.checked) {
            //Toevoegen
            if (i === -1) {
                this.setState(Object.assign({}, this.state, {checkedRows: [...this.state.checkedRows, row._key]}));
            }
        } else {
            //Verwijderen
            if (i > -1) {
                this.setState(Object.assign({}, this.state, {checkedRows: [...this.state.checkedRows.slice(0, i), ...this.state.checkedRows.slice(i+1)]}));
            }
        }
    };

    renderActionCheck = (val, row) => {
        return <input type="checkbox" class="stop-propagation" checked={this.state.checkedRows.indexOf(row._key) > -1} onChange={(event) => this.handleActionCheckClick(event, row)} />;
    };

    handleActionDropdownSelect = (eventKey) => {
        console.log(eventKey, this.state.checkedRows);
    };

    render() {

        const { reports, isFetching, lastUpdated } = this.props;
        const isEmpty = reports.length === 0;

        const buildRowOptions = (row) => {
            return {
                'onClick': (e) => { hasClass(e.target, 'stop-propagation') ? e.stopPropagation(): this.props.router.push('report/' + row._key + '/');
                }
            };
        };

        const data = this.props.reports.map(function(row) {
            return {
                _key: row.reference,
                _subject: row.name,
                _username: row.user.fullname || row.user.email,
                _date: Moment(row.lastStatusDate).calendar(),
                _priority: <span class="label bg-green">Normaal</span>,
                _status: function() {
                    const status = msg('item_status_' + row.status);
                    return row.status === 'ASSIGNED' ? `${status}\n[CONTRACTERUSERNAME]` : status;
                }(),
                _message: row.lastStatus
            };
        });

        const columns = [
            {title: "", render: this.renderActionCheck, className: 'stop-propagation no-pointer', sortable: false},
            { title: 'Nummer', prop: '_key' },
            { title: 'Onderwerp', prop: '_subject' },
            { title: 'Melder (volledige naam, e-mail)', prop: '_username' },
            { title: 'Datum', prop: '_date' },
            { title: 'Prioriteit', prop: '_priority' },
            { title: 'Status (toegewezen aan)', prop: '_status' },
            { title: 'Bericht', prop: '_message' }
        ];

        const actionDropdownOptions = [
            {key: 'ARCHIVE', value: 'Archiveren'},
            {key: 'DELETE', value: 'Verwijderen'}
        ];

        return (
            <div>

                <ContentHeader title="Meldingen"/>

                <section class="content">

                    <div class="box container-fluid table-responsive">

                        <div class="box-header with-border">
                            <h3 class="box-title">Meldingen</h3>
                            {' '}
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
                                        searchbar=                            {
                                this.state.checkedRows.length > 0 ?
                                <DropdownButton bsSize="sm"
                                                title="Kies actie &#8230;"
                                                id="bg-nested-dropdown"
                                                onSelect={this.handleActionDropdownSelect}
                                >
                                    {actionDropdownOptions.map((option) => <MenuItem key={option.key} eventKey={option.key}>{option.value}</MenuItem>)}
                                </DropdownButton>
                                : null
                            }

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
