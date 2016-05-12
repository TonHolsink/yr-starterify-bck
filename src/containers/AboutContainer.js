import React, { Component, PropTypes } from 'react';
import { selectReddit, fetchPostsIfNeeded } from '../actions/RedditActions';
import { connect } from 'react-redux';
import { version } from '../../package.json';
import Picker from '../components/RedditPicker';
import Posts from '../components/RedditPosts';
import styles from './AboutContainer.scss';

class About extends Component {
    
    static propTypes = {
        selectedReddit: PropTypes.string.isRequired,
        posts: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        lastUpdated: PropTypes.number,
        dispatch: PropTypes.func.isRequired
    };
    
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }

    componentDidMount() {
        const { dispatch, selectedReddit } = this.props;
        dispatch(fetchPostsIfNeeded(selectedReddit));
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedReddit !== this.props.selectedReddit) {
            const { dispatch, selectedReddit } = nextProps;
            dispatch(fetchPostsIfNeeded(selectedReddit));
        }
    }

    handleChange(nextReddit) {
        this.props.dispatch(selectReddit(nextReddit));
    }

    handleRefreshClick(e) {
        e.preventDefault();

        const { dispatch, selectedReddit } = this.props;
        dispatch(fetchPostsIfNeeded(selectedReddit));
    }

    render() {
        const { selectedReddit, posts, isFetching, lastUpdated } = this.props;
        const isEmpty = posts.length === 0;

        return (
            <div>
                <Picker
                    value = {selectedReddit}
                    onChange = {this.handleChange}
                    options = {['reactjs', 'frontend']}
                />
                <p>
                    {lastUpdated &&
                    <span>
                      Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                        {' '}
                    </span>
                    }
                    {
                        !isFetching &&
                        <a href="#"
                           onClick={this.handleRefreshClick}>
                            Refresh
                        </a>
                    }
                </p>
                {isEmpty
                    ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
                    : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                    <Posts posts={posts} />
                </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {

    // Bind reducer functions, where state.reddit is the reducer
    const { selectedReddit, postsByReddit } = state.reddit;

    console.log(postsByReddit[selectedReddit]);

    const {
        isFetching,
        lastUpdated,
        items: posts
    } = postsByReddit[selectedReddit] || {
        isFetching: true,
        items: []
    };
    
    return {
        selectedReddit,
        posts,
        isFetching,
        lastUpdated
    };
}

export default connect(mapStateToProps)(About);
