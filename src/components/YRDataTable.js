import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import { Table, Pagination, SelectField, SearchField, DataTable } from 'react-data-components';

import styles from './YRDataTable.scss';

class Searchbar extends Component {
    render() {
        return <div className ={this.props.className}>{this.props.children}</div>
    }
}

class YRSearchField extends SearchField {

    static defaultProps = {
        value: ''
    };

    render() {
        return (
            <div>
                <label htmlFor={this.props.id}>{this.props.label}</label>{' '}
                <input
                    id={this.props.id}
                    className={this.props.className}
                    type="search"
                    value={this.props.value}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

@CSSModules(styles)
class YRDatatable extends DataTable {

    static propTypes = {
        hover: PropTypes.bool,
        striped: PropTypes.bool,
        searchbar: PropTypes.element
    };

    static defaultProps = {
        initialPageLength: 10,
        pageLengthOptions: [ 5, 10, 20 ],
        filters: {
            globalSearch: {
                filter: (a, b) => {
                    a = (a + '').toLowerCase().trim();
                    b = (b + '').toLowerCase().trim();
                    return b.indexOf(a) >= 0;
                }
            }
        },
        hover: false,
        striped: true,
        searchbar: null
    };

    componentWillReceiveProps(nextProps) {
        //De functie uit de datamixin wordt hier overschreven, omdat
        //deze problemen veroorzaakt bij sorteren en filteren. De
        //state werd iedere keer opnieuw ge-reset naar de initiele waardes uit props
        //this.setState(buildInitialState(nextProps));
    };

    render() {
        const page = this.buildPage();
        const { hover, striped } = this.props;
        const tableClass = `table table-bordered ${striped && 'table-striped'} ${hover && 'table-hover'} dataTable`;

        return (
            <div styleName='yrdatatable'>
                <div className="row">
                    <Searchbar className="options col-xs-6 searchbar">
                        {/*
                         <SelectField
                         className="form-control"
                         id="page-menu"
                         label="Page size:"
                         value={this.state.pageLength}
                         options={this.props.pageLengthOptions}
                         onChange={this.onPageLengthChange}
                         />
                         */}
                        <YRSearchField
                            className="form-control input-sm searchfield"
                            id="search-field"
                            label="Zoeken:"
                            value={this.state.filterValues.globalSearch}
                            onChange={this.onFilter.bind(this, 'globalSearch')}
                        />
                        {this.props.searchbar !== null && this.props.searchbar}
                    </Searchbar>
                    { page.totalPages > 1 &&
                        <div className="col-xs-6 pagination-div">
                            <Pagination
                                className="pagination"
                                currentPage={page.currentPage}
                                totalPages={page.totalPages}
                                onChangePage={this.onChangePage}
                            />
                        </div>
                    }
                </div>
                <Table
                    className={tableClass}
                    dataArray={page.data}
                    columns={this.props.columns}
                    keys={this.props.keys}
                    buildRowOptions={this.props.buildRowOptions}
                    sortBy={this.state.sortBy}
                    onSort={this.onSort}
                />
            </div>
        );
    }
}

export default YRDatatable;
