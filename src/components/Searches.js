import React, { Component } from "react";
import { Col, Row, Container } from "react-bootstrap";
import Card from "./Card";

class Searches extends Component {
    setResults = () => {
      let pack;
      if (this.props.data.length <= 0) {
        pack = [
          <Col>
            <h4>No Results Found</h4>
          </Col>
        ];
      } else {
        pack = this.props.data.map((movie, index) => (
          <Col className="search-cols" key={Date.now()*Math.random() + index} lg={3} md={2} sm={1} >
            <Card
            
              data={{ movie, index }}
              getGenre={this.props.getGenre}
              getAll={this.props.getAll}
              history={this.props.history}
            />
          </Col>
        ));
      }
      return pack;
    };
    render() {
      return (
        <Container style={{paddingBottom: '60px'}}>
          <Row>{this.setResults()}</Row>
        </Container>
      );
    }
  }

  export default Searches;