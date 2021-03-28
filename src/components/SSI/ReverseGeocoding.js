import React, { useEffect, useState } from "react";
import { Alert, Button, Card, CardDeck, Col, Container, Form, Image, Row } from "react-bootstrap";
import ReactMapGL, { Marker } from 'react-map-gl';
import '../../web/css/Geocoding/index.css';

export default function ReverseGeocoding() {

    const MAPBOX_TOKEN = "pk.eyJ1IjoienJhYXlhbiIsImEiOiJja21zOXdtbGEwZnBxMnJwYmc3djdvbHFnIn0.UouMKEY3-VriuYSUgGEowg";

    const opencage = require('opencage-api-client');
    const [nameLocation, setNameLocation] = useState('');
    const [issLocation, setIssLocation] = useState({})

    const [viewport, setViewport] = useState({
        width: 1140,
        height: 900,
        latitude: 0,
        longitude: 0,
        zoom: 3
    });

    const getIssPosition = () => {
        fetch("http://api.open-notify.org/iss-now.json")
            .then(response => {
                response.json().then(res => {
                    if (res.message === "success") {
                        setIssLocation({latitude: parseFloat(res.iss_position.latitude), longitude: parseFloat(res.iss_position.longitude)});
                        setViewport({ ...viewport, latitude: parseFloat(res.iss_position.latitude), longitude: parseFloat(res.iss_position.longitude) });
                        // getLocation(res.iss_position);
                    }
                })
            })
    }

    const getLocation = (issPosition) => {
        opencage
            .geocode({ q: [issPosition.latitude, issPosition.longitude], key: '9dfe934e29f246c382a45b83f9979c11', language: 'fr', })
            .then((data) => {
                setNameLocation(data.results[0].formatted);
            })
            .catch((error) => {
                console.log('error', error.message);
            });
    }

    useEffect(() => {
        // getIssPosition();
        // const interval = setInterval(() => {
        //     getIssPosition();
        // }, 10000);
        // return () => {
        //     clearInterval(interval);
        // }
    }, [])

    return (
        <>
            <h1>Vous êtes à présent sur la page de géolocalisation de la Station Spatiale</h1>

            <div>La station spatiale se trouve actuellement en <b>{nameLocation}</b></div>
            <Container>
                <Row>
                    <Col>
                        <CardDeck style={{ width: '2rem', paddingTop: '5px' }}>
                            <Card className="flex-fill">
                                <ReactMapGL
                                    {...viewport}
                                    mapboxApiAccessToken={MAPBOX_TOKEN}
                                    onViewportChange={nextViewport => setViewport(nextViewport)}
                                >
                                    {
                                        issLocation.longitude !== undefined && issLocation.latitude !== undefined && (
                                            <Marker latitude={issLocation.latitude} longitude={issLocation.longitude} offsetLeft={-20} offsetTop={-10}>
                                                <div className="marker"></div>
                                            </Marker>
                                        )
                                    }

                                </ReactMapGL>
                            </Card>
                        </CardDeck>
                    </Col>
                </Row>
            </Container>



        </>
    )
}