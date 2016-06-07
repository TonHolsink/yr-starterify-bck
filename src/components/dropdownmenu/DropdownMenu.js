import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router';

/**
 * Een dropdownmenu
 */
export default class DropdownMenu extends Component {

    static propTypes = {
        cssClass: PropTypes.string
    };

    static defaultProps = {
        cssClass: ''
    };

    constructor(props) {
        super(props);
        this.state = {toggle: false};
        this.onBlur = this.onBlur.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    /**
     * OnBlur event afhandeling
     * Het menu verdwijnt zodra je er buiten klikt.
     * onBlur event treedt op zodra er buiten de link om de dropdown te openen en te sluiten wordt geklikt.
     * Dus ook als je binnen het dropdownmenu zelf klikt.
     * De toggle state wordt op false gezet, zodat het menu wordt verborgen
     *
     * SetTimeout verklaring:
     * Zie https://facebook.github.io/react/docs/events.html:
     * Event pooling
     * The SyntheticEvent is pooled.
     * This means that the SyntheticEvent object will be reused and all properties will be nullified after the event
     * callback has been invoked. This is for performance reasons. As such, you cannot access the event in an
     * asynchronous way.
     *
     * Zie http://stackoverflow.com/questions/11592966/get-the-newly-focussed-element-if-any-from-the-onblur-event/11592974#11592974
     * Unfortunately the new element isn't focused as the blur event happens, so this will report body.
     * So you are gonna have to hack it with flags and focus event, or use setTimeout.
     *
     * @param e SyntheticEvent
     */
    onBlur(e) {
        const currentTarget = e.currentTarget;
        const that = this;

        setTimeout(function() {
            if (!currentTarget.contains(document.activeElement)) {
                that.setState({toggle: false});
            }
        }, 0);
    }

    /**
     * OnKeyUp event afhandeling
     * De escape key verbergt het menu
     *
     * @param e SyntheticEvent
     */
    onKeyUp(e)  {
        // escape key
        if (e.which === 27) {
            this.setState({toggle: false});
        }
    };

    /**
     * Toont of verbergt het dropdownmenu.
     */
    toggleMenu = () => {
        this.setState({toggle: !this.state.toggle});
    };

    /**
     * Verbergt het menu
     */
    hideMenu = () => {
        this.setState({toggle: false});
    };

    /**
     * De header (de 'knop' om het dropdownmenu te openen)
     * @returns {XML}
     */
    renderHeader() {
        return(
            <a onClick={this.toggleMenu} aria-expanded={this.state.toggle ? "true" : "false"} href="javascript:;"
               class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-envelope-o"/>
                <span class="label label-success">0</span>
            </a>
        );
    }

    /**
     * Het dropdownmenu
     * @returns {XML}
     */
    renderMenu() {
        return(
            <ul class="dropdown-menu">
                <li class="header">HEADER</li>
                <li>
                    <ul style={{overflowX: 'hidden', overflowY: 'auto', width: '100%', height: '200px'}}
                        class="menu">
                        <Link onClick={this.hideMenu} to="/">ITEM</Link>
                    </ul>
                </li>
                <li class="footer">FOOTER</li>
            </ul>
        )
    }

    /**
     * Renderen van het component
     * @returns {XML}
     */
    render() {
        const { cssClass, ...props } = this.props;
        const css = "dropdown " + cssClass;
        return (
            <li onBlur={this.onBlur} onKeyUp={this.onKeyUp} {...props}
                class={this.state.toggle ? css + " open" : css}>
                {this.renderHeader()}
                {this.renderMenu()}
            </li>
        );
    }
}
