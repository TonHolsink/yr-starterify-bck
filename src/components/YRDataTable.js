import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import { Table, Pagination, SelectField, SearchField, DataTable } from 'react-data-components';

import styles from './YRDataTable.scss';

class YRSearchField extends SearchField {

    static defaultProps = {
        value: ''
    };

    render() {
        return (
            <div>
                <label htmlFor={this.props.id}>{this.props.label}</label>
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
        }
    };

    render() {

        const page = this.buildPage();

        return (
            <div styleName='yrdatatable'>
                <div className="row">
                    <div className="options col-xs-4">
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
                            className="form-control searchfield"
                            id="search-field"
                            label="Zoeken:"
                            value={this.state.filterValues.globalSearch}
                            onChange={this.onFilter.bind(this, 'globalSearch')}
                        />
                    </div>
                    { page.totalPages > 0 &&
                        <div className="col-xs-8">
                            <Pagination
                                className="pagination pull-right"
                                currentPage={page.currentPage}
                                totalPages={page.totalPages}
                                onChangePage={this.onChangePage}
                            />
                        </div>
                    }
                </div>
                <Table
                    className="table table-bordered table-striped table-hover dataTable"
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
