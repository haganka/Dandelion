import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import MatchBox from '../../components/MatchBox';

const MatchContainer = props =>
             <div>
                {props.wish ? <h1 className="match">Grant Match List</h1> : <h1 className="match">Wish Match List</h1>}
                {props.matches.map((match => <MatchBox
                    name={match.name}
                    rating={match.rating}
                    location={match.location}
                    id={match._id} 
                    key={match._id} 
                    cb={props.onClick}
                    />))}
            </div>



export default MatchContainer;