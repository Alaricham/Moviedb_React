import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Icon extends Component {
    render() {
      let { icon, classes, onClick } = this.props;
      return (
        <FontAwesomeIcon icon={icon} className={classes} onClick={onClick} />
      );
    }
  }

  export default Icon;