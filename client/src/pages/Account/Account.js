import React from "react";
import { Col, Row, Grid } from 'react-bootstrap';
import CompletePanel from '../../components/CompletePanel';
import './Account.css';

const Account = props =>
      <div>
        {/* <NavBar accountClick={props.account} /> */}
        <Grid>
          <Row>
            <Col sm={4} className="account-name">{props.name} 's Account Details
            </Col>
          </Row>
          <Row>
            <Col sm={4} className="account-rating">Your current rating is {props.rating} 
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6} className="account-wishes">Completed Wishes 
                {props.completedWishes.map((wish => <CompletePanel 
                request={wish.request}
                grantedBy={wish.grantedBy}
                location={wish.location}
                key={wish.key}
                wish={true}
                />))}
            </Col>

            <Col xs={12} sm={6} className="account-grants">Completed Grants 
                {props.completedGrants.map((grant => <CompletePanel 
                request={grant.request}
                grantedFor={grant.wishFrom}
                key={grant.key}
                location={grant.location}
                />))}
            </Col>
          </Row>

        </Grid>
      </div>



export default Account;