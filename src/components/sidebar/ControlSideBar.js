import React, {Component, PropTypes} from 'react';
import {skinChange} from '../../actions/AppActions';
import {connect} from 'react-redux';

export default class ControlSideBar extends Component {

    static propTypes = {
        isControlSideBarShown: PropTypes.bool.isRequired,
        onSkinChange: PropTypes.func.isRequired,
        skin: PropTypes.string.isRequired
    };

    componentWillReceiveProps(nextProps) {
        const body = document.body;
        body.className = `hold-transition ${nextProps.skin} sidebar-mini`;
    }

    render() {
        const {isControlSideBarShown, onSkinChange} = this.props;
        const cso = 'control-sidebar-open';
        return (

            <aside class={`control-sidebar control-sidebar-dark ${isControlSideBarShown ? cso : ''}`} >
                {/* Create the tabs */}
                <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
                    <li class="active"><a aria-expanded="true" href="#control-sidebar-theme-demo-options-tab"
                                          data-toggle="tab"><i class="fa fa-wrench"/></a></li>
                    <li class=""><a aria-expanded="false" href="#control-sidebar-home-tab" data-toggle="tab"><i
                        class="fa fa-home"/></a></li>
                    <li class=""><a aria-expanded="false" href="#control-sidebar-settings-tab" data-toggle="tab"><i
                        class="fa fa-gears"/></a></li>
                </ul>
                {/* Tab panes */}
                <div class="tab-content">
                    {/* Home tab content */}
                    <div class="tab-pane" id="control-sidebar-home-tab">
                        <h3 class="control-sidebar-heading">Recent Activity</h3>
                        <ul class="control-sidebar-menu">
                            <li>
                                <a href="javascript:void(0)">
                                    <i class="menu-icon fa fa-birthday-cake bg-red"/>

                                    <div class="menu-info">
                                        <h4 class="control-sidebar-subheading">Langdon's Birthday</h4>

                                        <p>Will be 23 on April 24th</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    <i class="menu-icon fa fa-user bg-yellow"/>

                                    <div class="menu-info">
                                        <h4 class="control-sidebar-subheading">Frodo Updated His Profile</h4>

                                        <p>New phone +1(800)555-1234</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    <i class="menu-icon fa fa-envelope-o bg-light-blue"/>

                                    <div class="menu-info">
                                        <h4 class="control-sidebar-subheading">Nora Joined Mailing List</h4>

                                        <p>nora@example.com</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    <i class="menu-icon fa fa-file-code-o bg-green"/>

                                    <div class="menu-info">
                                        <h4 class="control-sidebar-subheading">Cron Job 254 Executed</h4>

                                        <p>Execution time 5 seconds</p>
                                    </div>
                                </a>
                            </li>
                        </ul>
                        {/* /.control-sidebar-menu */}

                        <h3 class="control-sidebar-heading">Tasks Progress</h3>
                        <ul class="control-sidebar-menu">
                            <li>
                                <a href="javascript:void(0)">
                                    <h4 class="control-sidebar-subheading">
                                        Custom Template Design
                                        <span class="label label-danger pull-right">70%</span>
                                    </h4>

                                    <div class="progress progress-xxs">
                                        <div class="progress-bar progress-bar-danger" style={{width: '70%'}}></div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    <h4 class="control-sidebar-subheading">
                                        Update Resume
                                        <span class="label label-success pull-right">95%</span>
                                    </h4>

                                    <div class="progress progress-xxs">
                                        <div class="progress-bar progress-bar-success" style={{width: '95%'}}></div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    <h4 class="control-sidebar-subheading">
                                        Laravel Integration
                                        <span class="label label-warning pull-right">50%</span>
                                    </h4>

                                    <div class="progress progress-xxs">
                                        <div class="progress-bar progress-bar-warning" style={{width: '50%'}}></div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    <h4 class="control-sidebar-subheading">
                                        Back End Framework
                                        <span class="label label-primary pull-right">68%</span>
                                    </h4>

                                    <div class="progress progress-xxs">
                                        <div class="progress-bar progress-bar-primary" style={{width: '68%'}}></div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                        {/* /.control-sidebar-menu */}

                    </div>
                    <div class="tab-pane active" id="control-sidebar-theme-demo-options-tab">
                        <div><h4 class="control-sidebar-heading">Layout Options</h4>
                            <div class="form-group"><label class="control-sidebar-subheading"><input data-layout="fixed"
                                                                                                     class="pull-right"
                                                                                                     type="checkbox"/>
                                Fixed layout</label><p>Activate the fixed layout. You can't use fixed and boxed layouts
                                together</p></div>
                            <div class="form-group"><label class="control-sidebar-subheading"><input
                                data-layout="layout-boxed" class="pull-right" type="checkbox"/> Boxed Layout</label><p>
                                Activate the boxed layout</p></div>
                            <div class="form-group"><label class="control-sidebar-subheading"><input
                                data-layout="sidebar-collapse" class="pull-right" type="checkbox"/> Toggle
                                Sidebar</label><p>Toggle the left sidebar's state (open or collapse)</p></div>
                            <div class="form-group"><label class="control-sidebar-subheading"><input
                                data-enable="expandOnHover" class="pull-right" type="checkbox"/> Sidebar Expand on Hover</label>
                                <p>Let the sidebar mini expand on hover</p></div>
                            <div class="form-group"><label class="control-sidebar-subheading"><input
                                data-controlsidebar="control-sidebar-open" class="pull-right" type="checkbox"/> Toggle
                                Right Sidebar Slide</label><p>Toggle between slide over content and push content
                                effects</p></div>
                            <div class="form-group"><label class="control-sidebar-subheading"><input
                                data-sidebarskin="toggle" class="pull-right" type="checkbox"/> Toggle Right Sidebar Skin</label>
                                <p>Toggle between dark and light skins for the right sidebar</p></div>
                            <h4 class="control-sidebar-heading">Skins</h4>
                            <ul class="list-unstyled clearfix">
                                <li style={{float:'left', width: '33.33333%', padding: '5px'}}><a
                                    href="javascript:void(0);"
                                    onClick={() => onSkinChange('skin-blue')}
                                    data-skin="skin-blue"
                                    style={{display: 'block', boxShadow: '0 0 3px rgba(0,0,0,0.4)'}}
                                    class="clearfix full-opacity-hover">
                                    <div><span
                                        style={{display:'block', width: '20%', float: 'left', height: '7px', background: '#367fa9'}}/><span
                                        class="bg-light-blue"
                                        style={{display:'block', width: '80%', float: 'left', height: '7px'}}/>
                                    </div>
                                    <div><span
                                        style={{display:'block', width: '20%', float: 'left', height: '20px', background: '#222d32'}}/><span
                                        style={{display:'block', width: '80%', float: 'left', height: '20px', background: '#f4f5f7'}}/>
                                    </div>
                                </a><p class="text-center no-margin">Blue</p></li>
                                <li style={{float:'left', width: '33.33333%', padding: '5px'}}><a
                                    href="javascript:void(0);"
                                    onClick={() => onSkinChange('skin-black')}
                                    data-skin="skin-black"
                                    style={{display: 'block', boxShadow: '0 0 3px rgba(0,0,0,0.4)'}}
                                    class="clearfix full-opacity-hover">
                                    <div style={{boxShadow: '0 0 2px rgba(0,0,0,0.1)'}} class="clearfix"><span
                                        style={{display:'block', width: '20%', float: 'left', height: '7px', background: '#fefefe'}}/><span
                                        style={{display:'block', width: '80%', float: 'left', height: '7px', background: '#fefefe'}}/>
                                    </div>
                                    <div><span
                                        style={{display:'block', width: '20%', float: 'left', height: '20px', background: '#222'}}/><span
                                        style={{display:'block', width: '80%', float: 'left', height: '20px', background: '#f4f5f7'}}/>
                                    </div>
                                </a><p class="text-center no-margin">Black</p></li>
                                <li style={{float:'left', width: '33.33333%', padding: '5px'}}><a
                                    href="javascript:void(0);"
                                    onClick={() => onSkinChange('skin-purple')}
                                    data-skin="skin-purple"
                                    style={{display: 'block', boxShadow: '0 0 3px rgba(0,0,0,0.4)'}}
                                    class="clearfix full-opacity-hover">
                                    <div><span style={{display:'block', width: '20%', float: 'left', height: '7px'}}
                                               class="bg-purple-active"/><span class="bg-purple"
                                                                               style={{display:'block', width: '80%', float: 'left', height: '7px'}}/>
                                    </div>
                                    <div><span
                                        style={{display:'block', width: '20%', float: 'left', height: '20px', background: '#222d32'}}/><span
                                        style={{display:'block', width: '80%', float: 'left', height: '20px', background: '#f4f5f7'}}/>
                                    </div>
                                </a><p class="text-center no-margin">Purple</p></li>
                                <li style={{float: 'left', width: '33.33333%', padding: '5px'}}><a
                                    href="javascript:void(0);"
                                    onClick={() => onSkinChange('skin-green')}
                                    data-skin="skin-green"
                                    style={{display: 'block', boxShadow: '0 0 3px rgba(0,0,0,0.4)'}}
                                    class="clearfix full-opacity-hover">
                                    <div><span style={{display:'block', width: '20%', float: 'left', height: '7px'}}
                                               class="bg-green-active"/><span class="bg-green"
                                                                              style={{display:'block', width: '80%', float: 'left', height: '7px'}}/>
                                    </div>
                                    <div><span
                                        style={{display:'block', width: '20%', float: 'left', height: '20px', background: '#222d32'}}/><span
                                        style={{display:'block', width: '80%', float: 'left', height: '20px', background: '#f4f5f7'}}/>
                                    </div>
                                </a><p class="text-center no-margin">Green</p></li>
                                <li style={{float: 'left', width: '33.33333%', padding: '5px'}}><a
                                    href="javascript:void(0);"
                                    onClick={() => onSkinChange('skin-red')}
                                    data-skin="skin-red"
                                    style={{display: 'block', boxShadow: '0 0 3px rgba(0,0,0,0.4)'}}
                                    class="clearfix full-opacity-hover">
                                    <div><span style={{display:'block', width: '20%', float: 'left', height: '7px'}}
                                               class="bg-red-active"/><span class="bg-red"
                                                                            style={{display:'block', width: '80%', float: 'left', height: '7px'}}/>
                                    </div>
                                    <div><span
                                        style={{display:'block', width: '20%', float: 'left', height: '20px', background: '#222d32'}}/><span
                                        style={{display:'block', width: '80%', float: 'left', height: '20px', background: '#f4f5f7'}}/>
                                    </div>
                                </a><p class="text-center no-margin">Red</p></li>
                                <li style={{float: 'left', width: '33.33333%', padding: '5px'}}><a
                                    href="javascript:void(0);"
                                    onClick={() => onSkinChange('skin-yellow')}
                                    data-skin="skin-yellow"
                                    style={{display: 'block', boxShadow: '0 0 3px rgba(0,0,0,0.4)'}}
                                    class="clearfix full-opacity-hover">
                                    <div><span style={{display:'block', width: '20%', float: 'left', height: '7px'}}
                                               class="bg-yellow-active"/><span class="bg-yellow"
                                                                               style={{display:'block', width: '80%', float: 'left', height: '7px'}}/>
                                    </div>
                                    <div><span
                                        style={{display:'block', width: '20%', float: 'left', height: '20px', background: '#222d32'}}/><span
                                        style={{display:'block', width: '80%', float: 'left', height: '20px', background: '#f4f5f7'}}/>
                                    </div>
                                </a><p class="text-center no-margin">Yellow</p></li>
                                <li style={{float: 'left', width: '33.33333%', padding: '5px'}}><a
                                    href="javascript:void(0);"
                                    onClick={() => onSkinChange('skin-blue-light')}
                                    data-skin="skin-blue-light"
                                    style={{display: 'block', boxShadow: '0 0 3px rgba(0,0,0,0.4)'}}
                                    class="clearfix full-opacity-hover">
                                    <div><span
                                        style={{display:'block', width: '20%', float: 'left', height: '7px', background: '#367fa9'}}/><span
                                        class="bg-light-blue"
                                        style={{display:'block', width: '80%', float: 'left', height: '7px'}}/>
                                    </div>
                                    <div><span
                                        style={{display:'block', width: '20%', float: 'left', height: '20px', background: '#f9fafc'}}/><span
                                        style={{display:'block', width: '80%', float: 'left', height: '20px', background: '#f4f5f7'}}/>
                                    </div>
                                </a><p class="text-center no-margin" style={{fontSize: '12px'}}>Blue Light</p></li>
                                <li style={{float: 'left', width: '33.33333%', padding: '5px'}}><a
                                    href="javascript:void(0);"
                                    onClick={() => onSkinChange('skin-black-light')}
                                    data-skin="skin-black-light"
                                    style={{display: 'block', boxShadow: '0 0 3px rgba(0,0,0,0.4)'}}
                                    class="clearfix full-opacity-hover">
                                    <div style={{boxShadow: '0 0 2px rgba(0,0,0,0.1)'}} class="clearfix"><span
                                        style={{display:'block', width: '20%', float: 'left', height: '7px', background: '#fefefe'}}/><span
                                        style={{display:'block', width: '80%', float: 'left', height: '7px', background: '#fefefe'}}/>
                                    </div>
                                    <div><span
                                        style={{display:'block', width: '20%', float: 'left', height: '20px', background: '#f9fafc'}}/><span
                                        style={{display:'block', width: '80%', float: 'left', height: '20px', background: '#f4f5f7'}}/>
                                    </div>
                                </a><p class="text-center no-margin" style={{fontSize: '12px'}}>Black Light</p></li>
                                <li style={{float: 'left', width: '33.33333%', padding: '5px'}}><a
                                    href="javascript:void(0);"
                                    onClick={() => onSkinChange('skin-purple-light')}
                                    data-skin="skin-purple-light"
                                    style={{display: 'block', boxShadow: '0 0 3px rgba(0,0,0,0.4)'}}
                                    class="clearfix full-opacity-hover">
                                    <div><span style={{display:'block', width: '20%', float: 'left', height: '7px'}}
                                               class="bg-purple-active"/><span class="bg-purple"
                                                                               style={{display:'block', width: '80%', float: 'left', height: '7px'}}/>
                                    </div>
                                    <div><span
                                        style={{display:'block', width: '20%', float: 'left', height: '20px', background: '#f9fafc'}}/><span
                                        style={{display:'block', width: '80%', float: 'left', height: '20px', background: '#f4f5f7'}}/>
                                    </div>
                                </a><p class="text-center no-margin" style={{fontSize: '12px'}}>Purple Light</p></li>
                                <li style={{float: 'left', width: '33.33333%', padding: '5px'}}><a
                                    href="javascript:void(0);"
                                    onClick={() => onSkinChange('skin-green-light')}
                                    data-skin="skin-green-light"
                                    style={{display: 'block', boxShadow: '0 0 3px rgba(0,0,0,0.4)'}}
                                    class="clearfix full-opacity-hover">
                                    <div><span style={{display:'block', width: '20%', float: 'left', height: '7px'}}
                                               class="bg-green-active"/><span class="bg-green"
                                                                              style={{display:'block', width: '80%', float: 'left', height: '7px'}}/>
                                    </div>
                                    <div><span
                                        style={{display:'block', width: '20%', float: 'left', height: '20px', background: '#f9fafc'}}/><span
                                        style={{display:'block', width: '80%', float: 'left', height: '20px', background: '#f4f5f7'}}/>
                                    </div>
                                </a><p class="text-center no-margin" style={{fontSize: '12px'}}>Green Light</p></li>
                                <li style={{float: 'left', width: '33.33333%', padding: '5px'}}><a
                                    href="javascript:void(0);"
                                    onClick={() => onSkinChange('skin-red-light')}
                                    data-skin="skin-red-light"
                                    style={{display: 'block', boxShadow: '0 0 3px rgba(0,0,0,0.4)'}}
                                    class="clearfix full-opacity-hover">
                                    <div><span style={{display:'block', width: '20%', float: 'left', height: '7px'}}
                                               class="bg-red-active"/><span class="bg-red"
                                                                            style={{display:'block', width: '80%', float: 'left', height: '7px'}}/>
                                    </div>
                                    <div><span
                                        style={{display:'block', width: '20%', float: 'left', height: '20px', background: '#f9fafc'}}/><span
                                        style={{display:'block', width: '80%', float: 'left', height: '20px', background: '#f4f5f7'}}/>
                                    </div>
                                </a><p class="text-center no-margin" style={{fontSize: '12px'}}>Red Light</p></li>
                                <li style={{float: 'left', width: '33.33333%', padding: '5px'}}><a
                                    href="javascript:void(0);"
                                    onClick={() => onSkinChange('skin-yellow-light')}
                                    data-skin="skin-yellow-light"
                                    style={{display: 'block', boxShadow: '0 0 3px rgba(0,0,0,0.4)'}}
                                    class="clearfix full-opacity-hover">
                                    <div><span style={{display:'block', width: '20%', float: 'left', height: '7px'}}
                                               class="bg-yellow-active"/><span class="bg-yellow"
                                                                               style={{display:'block', width: '80%', float: 'left', height: '7px'}}/>
                                    </div>
                                    <div><span
                                        style={{display:'block', width: '20%', float: 'left', height: '20px', background: '#f9fafc'}}/><span
                                        style={{display:'block', width: '80%', float: 'left', height: '20px', background: '#f4f5f7'}}/>
                                    </div>
                                </a><p class="text-center no-margin" style={{fontSize: '12px'}}>Yellow Light</p></li>
                            </ul>
                        </div>
                    </div>
                    {/* /.tab-pane */}

                    {/* Settings tab content */}
                    <div class="tab-pane" id="control-sidebar-settings-tab">
                        <form method="post">
                            <h3 class="control-sidebar-heading">General Settings</h3>

                            <div class="form-group">
                                <label class="control-sidebar-subheading">
                                    Report panel usage
                                    <input class="pull-right" checked="" type="checkbox"/>
                                </label>

                                <p>
                                    Some information about this general settings option
                                </p>
                            </div>
                            {/* /.form-group */}

                            <div class="form-group">
                                <label class="control-sidebar-subheading">
                                    Allow mail redirect
                                    <input class="pull-right" checked="" type="checkbox"/>
                                </label>

                                <p>
                                    Other sets of options are available
                                </p>
                            </div>
                            {/* /.form-group */}

                            <div class="form-group">
                                <label class="control-sidebar-subheading">
                                    Expose author name in posts
                                    <input class="pull-right" checked="" type="checkbox"/>
                                </label>

                                <p>
                                    Allow the user to show his name in blog posts
                                </p>
                            </div>
                            {/* /.form-group */}

                            <h3 class="control-sidebar-heading">Chat Settings</h3>

                            <div class="form-group">
                                <label class="control-sidebar-subheading">
                                    Show me as online
                                    <input class="pull-right" checked="" type="checkbox"/>
                                </label>
                            </div>
                            {/* /.form-group */}

                            <div class="form-group">
                                <label class="control-sidebar-subheading">
                                    Turn off notifications
                                    <input class="pull-right" type="checkbox"/>
                                </label>
                            </div>
                            {/* /.form-group */}

                            <div class="form-group">
                                <label class="control-sidebar-subheading">
                                    Delete chat history
                                    <a href="javascript:void(0)" class="text-red pull-right"><i
                                        class="fa fa-trash-o"/></a>
                                </label>
                            </div>
                            {/* /.form-group */}
                        </form>
                    </div>
                    {/* /.tab-pane */}
                </div>
            </aside>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isControlSideBarShown: state.appState.isControlSideBarShown,
        skin: state.appState.skin
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSkinChange: (skin) => dispatch(skinChange(skin))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ControlSideBar)
