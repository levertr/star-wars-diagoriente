import React, { useEffect, useState } from "react";
import { Card, CardDeck, Col, Container, Row } from "react-bootstrap";
import ReactMapGL, { Marker } from 'react-map-gl';
import '../../web/css/Geocoding/index.css';

export default function ReverseGeocoding() {
    // Bibliothèque de l'API de la carte
    const opencage = require('opencage-api-client');

    // Clef d'autorisation pour l'accès à l'API
    // Cette API a un accès limité de 2500 requêtes par jour, ce pourquoi je limite le nombre de requêtes en mettant un interval de 10 secondes
    const MAPBOX_TOKEN = "pk.eyJ1IjoienJhYXlhbiIsImEiOiJja21zOXdtbGEwZnBxMnJwYmc3djdvbHFnIn0.UouMKEY3-VriuYSUgGEowg";

    const [nameLocation, setNameLocation] = useState('');
    const [issLocation, setIssLocation] = useState({})

    const [viewport, setViewport] = useState({
        width: 1140,
        height: 900,
        latitude: 0,
        longitude: 0,
        zoom: 3
    });

    // Je récupère la position de la station toutes les 10 secondes
    useEffect(() => {
        const interval = setInterval(() => {
            // Requête récupérant la position de la station spatiale
            fetch("http://api.open-notify.org/iss-now.json")
                .then(response => {
                    response.json().then(res => {
                        if (res.message === "success") {
                            setIssLocation({ latitude: parseFloat(res.iss_position.latitude), longitude: parseFloat(res.iss_position.longitude) });
                            setViewport({ ...viewport, latitude: parseFloat(res.iss_position.latitude), longitude: parseFloat(res.iss_position.longitude) });

                            // Requête récupérant le nom du lieu où se trouve la station spatiale
                            opencage
                                .geocode({ q: [res.iss_position.latitude, res.iss_position.longitude], key: '9dfe934e29f246c382a45b83f9979c11', language: 'fr', })
                                .then((data) => {
                                    setNameLocation(data.results[0].formatted);
                                })
                                .catch((error) => {
                                    console.log('error', error.message);
                                });
                        }
                    })
                })

        }, 10000);
        return () => {
            clearInterval(interval);
        }
    }, [issLocation, opencage, viewport])

    return (
        <>
            <h1>Vous êtes à présent sur la page de géolocalisation de la Station Spatiale</h1>

            <div>La station spatiale se trouve actuellement en </div>
            <div><b>{nameLocation === '' ? 'Patientez 10 secondes...' : nameLocation}</b></div>

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