import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {

    const styles = {
        largeFont: {
            fontSize: "1.5em"
        },
        smallerFont: {
            fontSize: "1.2em"
        },
        homeFont: {
            fontFamily: "Starjedi",
            fontSize: "2em"
        },
        image: {
            paddingTop: '1em'
        }
    }

    return (
        <>
            <img width="10%" src="https://cssanimation.rocks/demo/starwars/images/star.svg" alt="Star" ></img>
            <img width="10%" src="https://cssanimation.rocks/demo/starwars/images/wars.svg" alt="Wars" ></img>

            <Row className="col-12 d-flex mt-5">
                <Col className="col-12">
                    <div style={styles.homeFont}>Bienvenue sur la page d'accueil</div>
                </Col>
            </Row>

            <Row className="d-flex mt-5">
                <Col className="col-6">
                    <div style={styles.largeFont}>Retrouvez sur ce site une liste complète de tous les personnages de l'univers Star Wars!</div>
                    <div style={styles.smallerFont}>Consultez chaque personnage en détails ainsi que leurs vaisseaux spaciaux!</div>
                    <Image style={styles.image} width="55%" src="star-wars-characters.jpg"></Image>
                    <div>
                        <Link style={styles.largeFont} to="/characters/all">Cliquez ici pour la liste!</Link>
                    </div>
                </Col>

                <Col className="col-6">
                    <div style={styles.largeFont}>Retrouvez également la position en temps réél* de la Station Spaciale Internationale</div>
                    <div><em>*avec un taux de rafraîchissement de 10 secondes dû à l'API</em></div>
                    <Image style={styles.image} width="50%" src="star-wars-ssi.jpg"></Image>
                    <div>
                        <Link style={styles.largeFont} to="/geocoding/">Cliquez ici pour la géolocalisation avec carte!</Link>
                    </div>
                </Col>
            </Row>
        </>
    );
}