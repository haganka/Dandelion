import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import './IncomingContainer.css';
import ReqBox from "../ReqBox";

const IncomingContainer = props =>
             <div>
               <h1 className="received-wishes">Requests Received</h1>
                {props.receivedReqs ?  
                props.receivedReqs.map((request => <ReqBox
                    name={request.name}
                    location={request.location}
                    request={request.request}
                    id={request.id} 
                    key={request.key}
                    fireKey={request.key} 
                    // cb={props.onClick}
                    />))
                    : null }
            </div>



export default IncomingContainer;