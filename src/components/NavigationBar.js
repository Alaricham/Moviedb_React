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
                let value = this.input.current.children[0].value;
                this.props.history.push("/search/" + value);
                this.props.search(event, value);
              }}
            }
            onSubmit={event => event.preventDefault()}
            inline
            className="form-nav"
          >
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button
              variant="outline-success"
              onClick={event => {
                let value = this.input.current.children[0].value;
                this.props.history.push("/search/" + value);
                this.props.search(event, value);
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
