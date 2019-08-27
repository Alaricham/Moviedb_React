import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Icon extends Component {
    render() {
      let { icon, classes, onClick, anim='' } = this.props;
      return (
        <div data-aos={anim} >
        <FontAwesomeIcon icon={icon} className={classes} onClick={onClick} />
        </div>
      );
    }
  }

  export default Icon;