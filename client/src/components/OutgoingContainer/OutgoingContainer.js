import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import ReqBox from "../ReqBox";

const OutgoingContainer = props =>
             <div>
               <h1 className="received-wishes">Requests Sent</h1>
                {props.grants ?  
                props.requests.map((request => <ReqBox
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



export default OutgoingContainer;