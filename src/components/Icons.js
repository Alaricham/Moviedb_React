import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Icon extends Component {
    render() {
      let { icon, classes, onClick, anim='', offset=false } = this.props;
      return (
        <div data-aos={anim}  data-aos-offset={offset ? "-200": ''}>
        <FontAwesomeIcon icon={icon} className={classes} onClick={onClick} />
        </div>
      );
    }
  }

  export default Icon;