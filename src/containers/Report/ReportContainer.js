import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import { fetchReportByNumber } from '../../actions/ReportActions';

import DataTable from '../../components/YRDataTable';
import ContentHeader from '../../components/ContentHeader';
import Button from 'react-bootstrap/lib/Button';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import AppointmentAction from './Actions/AppointmentAction';
import RetainAction from './Actions/RetainAction';
import MarkAsDoneAction from './Actions/MarkAsDoneAction';
import ArchiveAction from './Actions/ArchiveAction';
import PriorityAction from './Actions/PriorityAction';
import AssignAction from './Actions/AssignAction';

import Message from './Message';

import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';

import {toastr} from 'react-redux-toastr';
import Loading from '../../components/Loading';
import msg from '../../terminology/messages.js';
import {isEmpty as empty} from 'lodash/lang';

Moment.locale('nl');
momentLocalizer(Moment);

const actions = {
    NONE: '',
    RETAIN: 'RETAIN',
    MARKASDONE: 'MARK_DONE',
    ARCHIVE: 'ARCHIVE',
    APPOINMENT: 'APPOINTMENT',
    PRIORITY: 'PRIORITY',
    ASSIGN: 'ASSIGN',
    DELETE: 'DELETE'
};

export default class ReportContainer extends Component {

    static propTypes = {
        report: PropTypes.object.isRequired,
        isFetching: PropTypes.bool.isRequired,
        lastUpdated: PropTypes.number,
        dispatch: PropTypes.func.isRequired
    };

    componentDidMount() {
        const {dispatch, params} = this.props;
        dispatch(fetchReportByNumber({number: params.id}));
    }

    constructor(props) {
        super(props);
        this.state = {
            showAction: actions.NONE,
            showDetail: false,
            showReaction: false
        };
    }

    toggleDetails = (event) => {
        const state = Object.assign({}, this.state, {showDetail: !this.state.showDetail});
        this.setState(state);
    };

    selectAction = (eventKey) => {
        const state = Object.assign({}, this.state, {showAction: eventKey});
        this.setState(state);
        if (eventKey === actions.DELETE) {
            toastr.confirm('Weet u zeker dat u deze melding wilt verwijderen?', {onOk: () => {
                toastr.success('success', 'De gegevens zijn succesvol verwijderd');
            }})
        }
    };

    showAction = (action) => {
        let result = null;
        switch (action) {
            case actions.RETAIN:
                result = <RetainAction handleDismiss={this.hideAction}/>;
                break;
            case actions.MARKASDONE:
                result = <MarkAsDoneAction handleDismiss={this.hideAction}/>;
                break;
            case actions.ARCHIVE:
                result = <ArchiveAction handleDismiss={this.hideAction}/>;
                break;
            case actions.APPOINMENT:
                result = <AppointmentAction handleDismiss={this.hideAction}/>;
                break;
            case actions.PRIORITY:
                result = <PriorityAction handleDismiss={this.hideAction}/>;
                break;
            case actions.ASSIGN:
                result = <AssignAction handleDismiss={this.hideAction}/>;
                break;
            case actions.DELETE:
                break;
        }
        return result;
    };

    hideAction = () => {
        const state = Object.assign({}, this.state, {showAction: actions.NONE});
        this.setState(state);
    };

    showReaction = () => {
        const state = Object.assign({}, this.state, {showReaction: true});
        this.setState(state);
    };

    hideReaction = () => {
        const state = Object.assign({}, this.state, {showReaction: false});
        this.setState(state);
    };

    render() {
        const { report, isFetching, lastUpdated } = this.props;
        const isEmpty = empty(report);
        const isMutable = !isEmpty && (empty(report.status) || report.status.toUpperCase() !== 'CLOSED');

        const thread = [
            {
                id: 1,
                date: '08-06-2016 09:39',
                from: 'kim',
                to: 'EKS<j.mandjes@eks.nl>',
                status: '',
                message: 'Beste Jeroen,Per mail heb ik deze vraag al eerder gesteld. We willen graag zsm het Scope 7a rapport van de gasleiding ontvangen.GroetKim'
            },
            {
                id: 2,
                date: '08-06-2016 09:30',
                from: 'kim',
                to: 'andre.key@avrotros.nl',
                status: 'NEW',
                message: 'Uw melding is ontvangen en staat klaar om behandeld te worden.'
            }
        ];

        const data = thread.map(function(row) {
            return {
                _key: row.id,
                _date: row.date,
                _from: row.from,
                _to: row.to,
                _status: msg(row.status, 'item_status_'),
                _message: row.message
            };
        });

        const columns = [
            { title: 'Datum / tijd', prop: '_date'  },
            { title: 'Uitgevoerd door', prop: '_from' },
            { title: 'Aan / met', prop: '_to' },
            { title: 'Status', prop: '_status' },
            { title: 'Bericht', prop: '_message' }
        ];

        return (
            <div>
                <ContentHeader title="Melding" crumbs={[{to: '/reports', title: 'Meldingen'}]}/>

                <section class="content">

                    {isEmpty ? (isFetching ? <Loading /> : <h2>Geen gegevens.</h2>)
                        :
                        <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                            <div class="box">
                                <div class="box-header">
                                    <i class={this.state.showDetail ? "fa fa-caret-down" : "fa fa-caret-right" }/>
                                    <h3 class="box-title">Gegevens</h3>

                                    {isMutable &&
                                    <div class="box-tools pull-right">
                                        <DropdownButton bsSize="xs"
                                                        title="Kies actie &#8230;"
                                                        id="bg-nested-dropdown"
                                                        onSelect={this.selectAction}
                                        >
                                            <MenuItem eventKey={actions.RETAIN}>Aanhouden</MenuItem>
                                            <MenuItem eventKey={actions.MARKASDONE}>Afhandelen</MenuItem>
                                            <MenuItem eventKey={actions.ARCHIVE}>Archiveren</MenuItem>
                                            <MenuItem eventKey={actions.APPOINMENT}>Maak afspraak</MenuItem>
                                            <MenuItem eventKey={actions.PRIORITY}>Prioriteit</MenuItem>
                                            <MenuItem eventKey={actions.ASSIGN}>Toewijzen</MenuItem>
                                            <MenuItem eventKey={actions.DELETE}>Verwijderen</MenuItem>
                                        </DropdownButton>
                                    </div>
                                    }

                                </div> {/* box-header */}

                                <div class="box-body">

                                    { this.showAction(this.state.showAction) }

                                    <table id="abstractData"
                                           onClick={this.toggleDetails}
                                           class="table table-condensed table-hover pointer"
                                           style={this.state.showDetail ? {display: 'none'} : {}}
                                    >
                                        <thead>
                                        <tr>
                                            <th class="col-xs-1">Nr / Prioriteit</th>
                                            <th class="col-xs-4">Melding</th>
                                            <th class="col-xs-4">Laatste update</th>
                                        </tr>
                                        </thead>
                                        <tbody id="reports">
                                        <tr>
                                            <td class="col-xs-1">
                                                <div>{report.reference}</div>
                                                <div>[PRIORITY]</div>
                                            </td>
                                            <td class="col-xs-4">
                                                <div>{report.date}</div>
                                                <div>{report.subject}</div>
                                            </td>
                                            <td class="col-xs-4">
                                                <div>{report.lastStatusDate}</div>
                                                <div>{report.lastStatus}</div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table> {/* abstractData */}

                                    <div id="detailData"
                                         onClick={this.toggleDetails}
                                         class="pointer"
                                         style={this.state.showDetail ? {} : {display: 'none'}}
                                    >
                                        <div class="row">
                                            <strong class="col-sm-2">Onderwerp</strong>
                                            <div class="col-sm-10">{report.subject}</div>
                                        </div>
                                        <div class="row">
                                            <strong class="col-sm-2">Nummer</strong>
                                            <div class="col-sm-10">{report.reference}</div>
                                        </div>
                                        <div class="row">
                                            <strong class="col-sm-2">Prioriteit</strong>
                                            <div class="col-sm-10">[PRIORITY]</div>
                                        </div>
                                        <div class="row">
                                            <strong class="col-sm-2">Interne prioriteit</strong>
                                            <div class="col-sm-10">[INTERNALPRIORITY]</div>
                                        </div>
                                        <div class="row">
                                            <strong class="col-sm-2">Looptijd</strong>
                                            <div class="col-sm-10">[LIFECYCLE]</div>
                                        </div>
                                        <div class="row">
                                            <strong class="col-sm-2">Datum opvoer</strong>
                                            <div class="col-sm-10">{report.date}</div>
                                        </div>
                                        <div class="row">
                                            <strong class="col-sm-2">Laatste update</strong>
                                            <div class="col-sm-10">{report.lastStatusDate}</div>
                                        </div>
                                        <div class="row">
                                            <strong class="col-sm-2">Status</strong>
                                            <div class="col-sm-10">{msg(report.status, 'item_status_')}</div>
                                        </div>
                                        <div class="row">
                                            <strong class="col-sm-2">Bericht</strong>
                                            <div class="col-sm-10">{report.lastStatus}</div>
                                        </div>
                                        <div class="row">
                                            <strong class="col-sm-2">Ingevuld door</strong>
                                            <div class="col-sm-10">[REPORTERNAME]]</div>
                                        </div>
                                        <hr/>
                                        {report.answers && report.answers.map(function(answer, index) {
                                            return(
                                                <div class="row" key={index}>
                                                    <strong class="col-sm-2">{answer.field}</strong>
                                                    <div class="col-sm-10">{answer.value}</div>
                                                </div>
                                            )
                                        })}
                                    </div> {/* detailData */}

                                </div> {/* box-body */}
                            </div> {/* box */}

                            <div class="box">
                                <div class="box-header">
                                    <h3 class="box-title">Historie</h3>
                                    {isMutable &&
                                    <div class="box-tools pull-right">
                                        <Button bsSize="xs" onClick={this.showReaction}><i class="fa fa-envelope-o"/> Reageer</Button>
                                    </div>
                                    }

                                </div> {/* box-header */}
                                <div class="box-body">
                                    {this.state.showReaction && <Message handleDismiss={this.hideReaction}/>}
                                    <DataTable
                                        keys={[ '_key' ]}
                                        columns={columns}
                                        initialData={data}
                                        initialPageLength={25}
                                        initialSortBy={{ prop: '_date', order: 'descending' }}
                                        pageLengthOptions={[ 10, 25, 50 ]}
                                    />

                                </div> {/* box-body */}

                            </div> {/* box */}

                        </div>
                    }

                </section>

            </div>
        );
    }
};

function mapStateToProps(state) {

    // Bind reducer functions, where state.reportState is the reducer
    const { reportByQuery } = state.reportState;

    // Default initial state
    let isFetching = true;
    let report = {};
    let lastUpdated = null;

    // Check if state is undefined or empty
    if (reportByQuery && Object.keys(reportByQuery).length > 0) {
        isFetching = reportByQuery.isFetching;
        report = reportByQuery.item;
        lastUpdated = reportByQuery.lastUpdated;
    }

    return {
        report,
        isFetching,
        lastUpdated
    };
}

export default connect(mapStateToProps)(ReportContainer);
