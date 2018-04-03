import React from "react";
import "./MatchModal.css";
import { Link } from "react-router-dom";
import { Modal, Col, Row, Form, Button, Radio, FormGroup, FormControl, Jumbotron, Grid, Panel } from 'react-bootstrap';


const MatchModal = props => 
    <div className="static-modal">
    <Modal.Dialog show={props.show}>
        <Modal.Header>
            <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <div id="match-modal-box">
                <h3 id="match-modal-body">You have a new match!</h3>
            </div>
        </Modal.Body>

        <Modal.Footer>
            <Button onClick={props.close}>Close</Button>
            <Button onClick={props.viewMatches}>View My Matches</Button>
        </Modal.Footer>
  </Modal.Dialog>
</div>;

export default MatchModal;