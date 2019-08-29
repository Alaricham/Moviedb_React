import React, { Component } from "react";
import { Col, Row} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {withRouter} from 'react-router-dom';

class Footer extends Component {
    render() {
      let linkedin = 'https://www.linkedin.com/in/alarichalvarezmahl/',
      github =  'https://github.com/Alaricham';
      return (
        <Row className="footer-bg">
          <Col className="footer">
            <Row data-aos='info' >
              <Col lg={3} className="flex-col">
                <a href={linkedin}><FontAwesomeIcon  icon={faLinkedin} /></a>
                <a href={github}><FontAwesomeIcon icon={faGithub} /></a>
              </Col>
              <Col className="aligned" lg={9}>
                <h4>Moviedb</h4>
                <h6 className="aligned">By Alarich Alvarez Mahl</h6>
                <h6 className="aligned">alarichmahl.com</h6>
                <p>Copyright @2019</p>
              </Col>
            </Row>
          </Col>
          <Col data-aos='logos' className='logo-cont'>
            <img
              className='img-logo'
              src={process.env.PUBLIC_URL + "/tmdblogo.png"}
              alt=""
            />
          </Col>
        </Row>
      );
    }
  }

export default withRouter(Footer);