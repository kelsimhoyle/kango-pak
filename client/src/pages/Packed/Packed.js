import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Recommendation from "../../components/Recommendation/Recommendation";
import ClothingList from "../../components/ClothingList/ClothingList";
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_PACKINGLIST = gql`
   query getTrip($_id: String!) {
       trip(_id: $_id) {
           location
           length
           climate
           traveler
           luggage
           apparel
     }
   }`

export default function Packing(props) {

    const { loading, error, data } = useQuery(GET_PACKINGLIST, {
        variables: { _id: props.tripId }
    });
    if (loading) console.log('Loading...')
    if (error) console.log(error.message)
    if (data) console.log(data);
    

    return (
        <Container className="container-packing">
            <Row>
                <Col>
                <Recommendation />  
                </Col>
          
                {data ? 
                <ClothingList tripId={props.tripId} apparel={data.trip.apparel} climate={data.trip.climate} luggage={data.trip.luggage} location={data.trip.location} />
                : "loading..."
            }       
    
            </Row>
        </Container>
    )
};

