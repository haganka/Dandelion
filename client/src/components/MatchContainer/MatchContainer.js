import React from "react";
import MatchBox from '../MatchBox';
import { Row } from 'react-bootstrap';

const MatchContainer = props =>
             <div>
                 <Row>
                    {props.matches ? 
                    props.matches.map((match => <MatchBox
                        header={props.button}
                        name={match.name}
                        rating={match.rating}
                        location={match.location}
                        request={match.request}
                        id={match._id} 
                        matchId={match.id}
                        key={match.fire}
                        finalKey={match.key}
                        fire={match.fire} 
                        cb={props.onClick}
                        grant={props.grant}
                        match={props.match}
                        incoming={props.incoming}
                        outgoing={props.outgoing}
                        wish={props.wish}
                        complete={props.markComplete}
                        readyForComplete={props.finalMatch}
                        markedComplete={props.complete}
                        ratingVal={props.ratingVal}
                        onChange={props.onChange}
                        ratingSubmit={props.ratingSubmit}
                        />)) : null}
                </Row>
            </div>



export default MatchContainer;