import { useEffect, useState } from "react";
import { Card, Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useParams, withRouter } from "react-router";
import { Link } from "react-router-dom";

function Information({ history }) {

    const params = useParams();

    const [vaisseau, setVaisseau] = useState({});
    const [pilots, setPilots] = useState([])



    // Fonction récupérant les noms des pilotes qui ont piloté le vaisseau actuel
    const getCharactersName = (array) => {
        var stringArray = [];
        let iterations = array.length;

        if (array) {
            array.map(url =>
                fetch(url)
                    .then(response => {
                        response.json().then(character => {
                            stringArray.push({ 'name': character.name, 'url': character.url });
                            if (!--iterations) {
                                setPilots(stringArray);
                            }
                        })
                    })
            )
        }
    }

    // Fonction permettant le routage des pilotes lors du cloc de ces derniers
    const pilotOnClick = (v) => {
        var id = v.substring(
            v.lastIndexOf("people") + 7,
            v.lastIndexOf("/")
        );
        history.push(`/character/${id}`);
    }

    // Récupération des informations du vaisseau une seule fois
    useEffect(() => {
        fetch("http://swapi.dev/api/starships/" + params.id)
            .then(response => {
                response.json().then(vaisseau => {
                    setVaisseau(vaisseau);
                    getCharactersName(vaisseau.pilots)
                })
            })
    }, [params.id])

    return (
        <>
            <h1>Bienvenue sur la page du vaisseau <b>{vaisseau.name}</b></h1>

            <Container>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col>
                                <ListGroup>
                                    <ListGroupItem><b>Nom : </b>{vaisseau.name}</ListGroupItem>
                                    <ListGroupItem><b>Modèle : </b>{vaisseau.model}</ListGroupItem>
                                    <ListGroupItem><b>Fabriquant : </b>{vaisseau.manufacturer}</ListGroupItem>
                                    <ListGroupItem><b>Pilotes ayant piloté ce vaisseau : </b>
                                        {
                                            pilots !== undefined && pilots.map(v =>
                                                <Link key={v.name} to="#" onClick={() => pilotOnClick(v.url)}>{v.name + ', '}</Link>
                                            )
                                        }
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default withRouter(Information);