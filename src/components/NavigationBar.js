import React, { Component } from "react";
import {faFilm} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar, Form, Button, FormControl } from "react-bootstrap";

class NaviBar extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }
  render() {
    return (
      <Navbar expand="lg" fixed="top" >
        <Navbar.Brand href="#home" />
        <div className='logo-bg'><FontAwesomeIcon icon={faFilm} className={'logo'} onClick={()=> {this.props.history.push('/');}} /></div>
        <Navbar.Collapse
          id="basic-navbar-nav"
          style={{ justifyContent: "center" }}
        >
          <Form
            ref={this.input}
            onKeyPress={event =>
              {if(event.key === 'Enter') {
                this.props.history.push(
                  "/search/" + this.input.current.children[0].value
                );
                this.props.search(event, this.input.current.children[0].value);
              }}
            }
            onSubmit={event => event.preventDefault()}
            inline
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button
              variant="outline-success"
              onClick={event => {
                this.props.history.push(
                  "/search/" + this.input.current.children[0].value
                );
                this.props.search(event, this.input.current.children[0].value);
              }}
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NaviBar;
