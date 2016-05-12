import React, { Component } from 'react';
import ContentHeader from '../components/ContentHeader';
import './HomeContainer.scss';

import Overlay from 'react-bootstrap/lib/Overlay';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Button from 'react-bootstrap/lib/Button';
import Popover from 'react-bootstrap/lib/Popover';

class HomeContainer extends Component {
    render() {

        const tooltip = <div style={{position: 'absolute'}}>asdsd</div>;

        return (
            <div>

                <ContentHeader title="Dasboard"/>

                {/* Main content */}
                <section className="content">

                    <div class="box">


                        <OverlayTrigger trigger="click" placement="bottom" overlay={tooltip}>
                            <Button bsStyle="default">Click</Button>
                        </OverlayTrigger>


                    </div>
                </section>
            </div>
        );
    }
}

export default HomeContainer;