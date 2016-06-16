import React, { Component, PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Loading from './Loading';
import styles from './LoadingButton.scss';

export default class LoadingButton extends Component {
  render() {
    let {icon, label, loading, loadingLabel, ...props} = this.props;
    if (!loadingLabel) {
      loadingLabel = `${label}ing`
    }
    return <Button disabled={loading} {...props}>
      {loading
        ? <span><Loading inline delay={false}/> {icon && <img src={icon} className={styles.icon}/>} {loadingLabel}&hellip;</span>
        : <span>{icon && <img src={icon} className={styles.icon}/>} {label}</span>
      }
    </Button>
  }
}
