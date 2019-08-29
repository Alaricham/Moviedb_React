import React, { Component } from "react";
import { Col, Row, Container } from "react-bootstrap";
import Card from "./Card";
import {withRouter} from 'react-router-dom';

class Searches extends Component {
    setResults = () => {

      if (this.props.data.length <= 0) {
          return <Col>
            <h4>No Results Found</h4>
          </Col>
      } else {
        return this.props.data.map((movie, index) => 
          <Col key={index*Math.random()}  className="search-cols" lg={3} md={2} sm={1} >
            <Card
            key={index + 1000} 
              data={{ movie, index }}
              getGenre={this.props.getGenre}
              getAll={this.props.getAll}
              history={this.props.history}
            />
          </Col>
        );
      }
    };
    render() {
      if(!this.props.data.length) {
        this.props.history.push('/')
        this.props.link()
      }
      return (
        <Container style={{paddingBottom: '60px'}}>
          <Row>{this.setResults()}</Row>
        </Container>
      );
    }
  }

  export default withRouter(Searches);