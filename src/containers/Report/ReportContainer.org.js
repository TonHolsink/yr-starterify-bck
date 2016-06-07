import React, {Component, PropTypes} from 'react';
import ContentHeader from '../../components/ContentHeader';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import AppointmentAction from './Actions/AppointmentAction';

const actions = {
    NONE: 0,
    AANHOUDEN: 1,
    AFHANDELEN: 2,
    ARCHIVEREN: 3,
    AFSPREKEN: 4,
    PRIORITEIT: 5,
    TOEWIJZEN: 6,
    VERWIJDEREN: 7
};

export default class ReportContainer extends Component {

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

    constructor(props) {
        super(props);
        this.state = {
            showAction: actions.NONE,
            showDetail: false
        };
    }

    componentDidMount() {
        const {dispatch} = this.props;
        console.log(this.props);
    }

    toggleDetails = (event) => {
        const state = Object.assign({}, this.state, {showDetail: !this.state.showDetail});
        this.setState(state);
    };

    selectAction = (eventKey) => {
        const state = Object.assign({}, this.state, {showAction: eventKey});
        this.setState(state);
    };

    showAction = (action) => {
        let result = null;
        switch (action) {
            case actions.AANHOUDEN:
                break;
            case actions.AFHANDELEN:
                break;
            case actions.ARCHIVEREN:
                break;
            case actions.AFSPREKEN:
                result = <AppointmentAction handleDismiss={this.hideAction}/>;
                break;
            case actions.PRIORITEIT:
                break;
            case actions.TOEWIJZEN:
                break;
            case actions.VERWIJDEREN:
                break;
        }
        return result;
    }

    hideAction = () => {
        const state = Object.assign({}, this.state, {showAction: actions.NONE});
        this.setState(state);
    };

    render() {

        return (
            <div>
                <ContentHeader title="Melding" crumbs={[{to: '/reports', title: 'Meldingen'}]}/>

                {/* Main content */}
                <section class="content">

                    <div class="box">

                        <div class="box-header">
                            <i class={this.state.showDetail ? "fa fa-caret-down" : "fa fa-caret-right" }/>
                            <h3 class="box-title">Gegevens</h3>
                            <div class="box-tools pull-right">
                                <DropdownButton class="btn btn-box-tool dropdown-toggle"
                                                title="Kies actie &#8230;"
                                                id="bg-nested-dropdown"
                                                onSelect={this.selectAction}
                                >
                                    <MenuItem eventKey={actions.AANHOUDEN}>Aanhouden</MenuItem>
                                    <MenuItem eventKey={actions.AFHANDELEN}>Afhandelen</MenuItem>
                                    <MenuItem eventKey={actions.ARCHIVEREN}>Archiveren</MenuItem>
                                    <MenuItem eventKey={actions.AFSPREKEN}>Maak afspraak</MenuItem>
                                    <MenuItem eventKey={actions.PRIORITEIT}>Prioriteit</MenuItem>
                                    <MenuItem eventKey={actions.TOEWIJZEN}>Toewijzen</MenuItem>
                                    <MenuItem eventKey={actions.VERWIJDEREN}>Verwijderen</MenuItem>
                                </DropdownButton>
                            </div>
                        </div>

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
                                        <div>{this.props.params.id}</div>
                                        <div>Normaal</div>
                                    </td>
                                    <td class="col-xs-4">
                                        <div>20-05-2016 10:53</div>
                                        <div>Algemeen</div>
                                    </td>
                                    <td class="col-xs-4">
                                        <div>01-06-2016 09:32</div>
                                        <div>Iom dhr Van Kampen na vakantie van dhr Nietveld (19-06-2016)</div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            {/* abstractData */}

                            <div id="detailData"
                                 onClick={this.toggleDetails}
                                 class="pointer"
                                 style={this.state.showDetail ? {} : {display: 'none'}}
                            >
                                <div class="row">
                                    <strong class="col-sm-2">Onderwerp</strong>
                                    <div class="col-sm-10">Algemeen</div>
                                </div>
                                <div class="row">
                                    <strong class="col-sm-2">Nummer</strong>
                                    <div class="col-sm-10">{this.props.params.id}</div>
                                </div>
                                <div class="row">
                                    <strong class="col-sm-2">Prioriteit</strong>
                                    <div class="col-sm-10">Normaal</div>
                                </div>
                                <div class="row">
                                    <strong class="col-sm-2">Interne prioriteit</strong>
                                    <div class="col-sm-10"></div>
                                </div>
                                <div class="row">
                                    <strong class="col-sm-2">Looptijd</strong>
                                    <div class="col-sm-10">17</div>
                                </div>
                                <div class="row">
                                    <strong class="col-sm-2">Datum opvoer</strong>
                                    <div class="col-sm-10">20-05-2016</div>
                                </div>
                                <div class="row">
                                    <strong class="col-sm-2">Laatste update</strong>
                                    <div class="col-sm-10">01-06-2016 09:32</div>
                                </div>
                                <div class="row">
                                    <strong class="col-sm-2">Status</strong>
                                    <div class="col-sm-10"></div>
                                </div>
                                <div class="row">
                                    <strong class="col-sm-2">Bericht</strong>
                                    <div class="col-sm-10">Iom dhr Van Kampen na vakantie van dhr Nietveld
                                        (19-06-2016)
                                    </div>
                                </div>
                                <div class="row">
                                    <strong class="col-sm-2">Ingevuld door</strong>
                                    <div class="col-sm-10">tom.nietveld@avrotros.nl</div>
                                </div>
                                <hr/>
                                <div class="row">
                                    <strong class="col-sm-2">Omschrijving</strong>
                                    <div class="col-sm-10">Kogelkraan is defect Massier is geweest.</div>
                                </div>
                                <div class="row">
                                    <strong class="col-sm-2">Welk onderdeel van de verwarming lekt er?</strong>
                                    <div class="col-sm-10">Leiding</div>
                                </div>
                                <div class="row">
                                    <strong class="col-sm-2">Waar bevindt zich het probleem?</strong>
                                    <div class="col-sm-10">In kelder</div>
                                </div>
                                <div class="row">
                                    <strong class="col-sm-2">Wat is het onderwerp van uw klacht?</strong>
                                    <div class="col-sm-10">Lekkage</div>
                                </div>
                                <div class="row">
                                    <strong class="col-sm-2">Wat lekt er?</strong>
                                    <div class="col-sm-10">Verwarming</div>
                                </div>
                            </div>
                            {/* detailData */}

                        </div>
                    </div>
                </section>

            </div>




        );
    }
};

