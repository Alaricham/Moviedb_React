import React, { Component } from "react";
import { Col, Row} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

class Footer extends Component {
    render() {
      return (
        <Row
          style={{
            zIndex: 1,
            background:
              "linear-gradient(to right, rgb(30, 5, 43), rgb(38, 14, 45), rgb(22, 6, 31))",
            width: "100%",
            height: "200px",
            margin: 0,
            padding: "30px"
          }}
        >
          <Col className="footer">
            <Row data-aos='info' >
              <Col
                lg={3}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end"
                }}
              >
                <FontAwesomeIcon icon={faLinkedin} />
                <FontAwesomeIcon icon={faGithub} />
              </Col>
              <Col className="footer" lg={9} style={{ textAlign: "left" }}>
                <h4>Moviedb</h4>
                <h6 style={{ textAlign: "left" }}>By Alarich Alvarez Mahl</h6>
                <h6 style={{ textAlign: "left" }}>alarichmahl.com</h6>
                <p>Copyright @2019</p>
              </Col>
            </Row>
          </Col>
          <Col data-aos='logos' style={{ textAlign: "center" }}>
            <img
              style={{ width: "300px", height: "auto" }}
              src={process.env.PUBLIC_URL + "/tmdblogo.png"}
              alt=""
            />
          </Col>
        </Row>
      );
    }
  }

export default Footer