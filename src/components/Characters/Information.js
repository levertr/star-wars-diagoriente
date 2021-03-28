import moment from 'moment';
import 'moment/locale/fr';
import { useEffect, useState } from "react";
import { Card, Col, Container, Image, Jumbotron, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useParams, withRouter } from "react-router";
import { Link } from "react-router-dom";

function Information({ history }) {
    const params = useParams();

    const [character, setCharacter] = useState({});
    const [image, setImage] = useState("");
    const [colorInFrench, setColorInFrench] = useState("");
    const [starships, setStarships] = useState([]);

    // Utilisation de moment pour les dates
    moment.locale();

    // Fonction qui écrit la date récupérée en français
    const getTimeInFrench = (string) => {
        return moment(new Date(string)).format('dddd D MMMM YYYY à LTS');
    }

    // Fonction utilisant une API de traduction pour la couleur des yeux
    const getTranslatedInput = (input) => {
        if (input !== "" && input !== undefined) {
            fetch("https://libretranslate.com/translate", {
                method: 'POST',
                body: JSON.stringify({
                    q: input,
                    source: "en",
                    target: 'fr'
                }),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json().then(res => {
                    setColorInFrench(res.translatedText.charAt(0).toUpperCase() + res.translatedText.slice(1));
                }))
        }
    }

    // Fonction récupérant tous les vaisseaux du personnage
    const getStarshipsName = (array) => {
        var stringArray = [];
        let iterations = array.length;

        if (array) {
            array.map(url =>
                fetch(url)
                    .then(response => {
                        response.json().then(starship => {
                            stringArray.push({ 'name': starship.name, 'url': starship.url });
                            if (!--iterations) {
                                setStarships(stringArray);
                            }
                        })
                    })
            )
        }
    }

    // Fonction permettant le routage du vaisseau lors du clic sur le nom de ce dernier
    const nameOnClick = (url) => {
        var id = url.substring(
            url.lastIndexOf("starships") + 10,
            url.lastIndexOf("/")
        );
        history.push(`/starship/${id}`);
    }

    // Récupération des infos du personnage ainsi que son image
    useEffect(() => {

        // Fonction récupérant les informations du personnage
        fetch("https://swapi.dev/api/people/" + params.id)
            .then(response => {
                response.json().then(character => {
                    setCharacter(character);
                    getTranslatedInput(character.eye_color);
                    getStarshipsName(character.starships);
                })
            })


        // Fonction utilisant une API qui récupère un lien vers une image selon le nom du personnage
        fetch("https://akabab.github.io/starwars-api/api/id/" + params.id + ".json")
            .then(response => {
                response.json().then(character => {
                    setImage(character.image);
                })
            })
    }, [params.id])

    return (
        <>
            <h2>Bienvenue sur la page de <b>{character.name}</b></h2>

            <Container>
                <Card>
                    <Jumbotron fluid>
                        <Image src={image} alt="Image du personnage" title="Image du personnage" width="25%"></Image>
                    </Jumbotron>

                    <Card.Body>
                        <Row>
                            <Col>
                                <ListGroup>
                                    <ListGroupItem><b>Nom : </b>{character.name}</ListGroupItem>
                                    <ListGroupItem><b>Genre : </b>{character.gender !== undefined && character.gender.charAt(0).toUpperCase() + character.gender.slice(1)}</ListGroupItem>
                                    <ListGroupItem><b>Année de naissance : </b>{character.birth_year === 'unknown' ? 'Inconnue' : character.birth_year}</ListGroupItem>
                                    <ListGroupItem><b>Couleur des yeux : </b>{colorInFrench}</ListGroupItem>
                                    <ListGroupItem><b>Vaisseau(s) spatial(aux) piloté(s): </b>
                                        {
                                            starships !== undefined && (starships.length !== 0 ?
                                                starships.map(s =>
                                                    <Link key={s.name} to="#" onClick={() => nameOnClick(s.url)}>{s.name + ', '}</Link>
                                                ) : 'Aucun vaisseau'
                                            )
                                        }
                                    </ListGroupItem>
                                    <ListGroupItem><b>Date de création : </b>{getTimeInFrench(character.created)}</ListGroupItem>
                                    <ListGroupItem><b>Dernier modification : </b>{getTimeInFrench(character.edited)}</ListGroupItem>
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