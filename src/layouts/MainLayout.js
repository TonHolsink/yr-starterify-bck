//De AdminLTE css moet als eerste worden geimporteerd (in ieder geval voor de andere componenten met aangepaste css),
//omdat anders de overige css deze niet kan overschrijven

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import './AdminLTE.css';
import './skins/yellow.css';
import '../../node_modules/react-redux-toastr/lib/css/react-redux-toastr.min.css';
import '../css/custom.css';
import React, { Component, PropTypes } from 'react';
import SidebarLayout from './SidebarLayout';
import TopNavLayout from './TopNavLayout';

import './MainLayout.scss';

class MainLayout extends Component {
    render() {
        const { children } = this.props;
        let condition = true;
        return (
            condition ? <SidebarLayout children={children}/> : <TopNavLayout children={children}/>

        );
    }
}

MainLayout.propTypes = {
    children: React.PropTypes.object
};

export default MainLayout;
