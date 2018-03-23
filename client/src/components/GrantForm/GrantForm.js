import React from "react";
import { Form } from 'react-bootstrap';
// import Jumbotron from "../../components/Jumbotron";


const GrantForm = props =>
    <Form horizontal>
        {props.children}
    </Form>

export default GrantForm;