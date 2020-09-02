import React from "react";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PropTypes from "prop-types";
import {removeAlert} from '../../actions/alert';

const Alerts = ({ alerts, removeAlert }) =>
  alerts !== null &&
  alerts.length > 0 ?
  alerts.map((alert) => <Alert key={alert.id} className="alert" severity={alert.alertType}  onClose={() => {removeAlert(alert.id)}}>{alert.msg}</Alert>): null;

alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, {removeAlert} )(Alerts);
