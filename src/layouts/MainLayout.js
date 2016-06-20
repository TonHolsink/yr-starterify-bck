//De AdminLTE css moet als eerste worden geimporteerd (in ieder geval voor de andere componenten met aangepaste css),
//omdat anders de overige css deze niet kan overschrijven

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import './AdminLTE.css';
import '../css/yr.scss';
import '../../node_modules/react-redux-toastr/lib/css/react-redux-toastr.min.css';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import SidebarLayout from './SidebarLayout';
import TopNavLayout from './TopNavLayout';

class MainLayout extends Component {

    static propTypes = {
        children: PropTypes.object,
        layout: PropTypes.string
    };

    render() {
        const {children, layout} = this.props;
        return (
            layout === 'sidebar' ? <SidebarLayout children={children}/> : <TopNavLayout children={children}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        layout: state.appState.layout
    }
};

export default connect(
    mapStateToProps
)(MainLayout)
