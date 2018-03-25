import React, { Component } from 'react';
import { Form, FormGroup, Col, Row, FormControl, ControlLabel, Button } from 'react-bootstrap';
import fire from '../../fire.js';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] }; // <- set up react state
  }
  componentWillMount(){
    /* Create reference to messages in Firebase Database */
    let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
    messagesRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    })
  }
  addMessage(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire.database().ref('messages').push( this.inputEl.value );
    this.inputEl.value = ''; // <- clear the input
  }
  render() {
    return (
      <Form>
        <FormGroup>
            <Row>
            <Col sm={2} componentClass={ControlLabel}>
            Request 
            </Col>
            <Col sm={10}>
            <FormControl
                type="text"
                ref={ el => this.inputEl = el }
                name="message"
            />
            </Col>
            </Row>
        </FormGroup>
        <Button onClick={this.addMessage.bind(this)}>Submit
        </Button>
        <FormGroup>
        <ul>
          { /* Render the list of messages */
            this.state.messages.map( message => <li key={message.id}>{message.text}</li> )
          }
        </ul>
        </FormGroup>
    </Form>

    );
  }
}

export default Account;