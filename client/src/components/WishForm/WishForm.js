import React from "react";
import { Form } from 'react-bootstrap';


const WishForm = props =>
    <Form horizontal>
        {props.children}
    </Form>

export default WishForm;