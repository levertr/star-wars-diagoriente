import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {

    const styles = {
        largeFont: {
            fontSize: "1.5em"
        }
    }

    return (
        <>
            <img width="10%" src="https://cssanimation.rocks/demo/starwars/images/star.svg" alt="Star" ></img>
            <img width="10%" src="https://cssanimation.rocks/demo/starwars/images/wars.svg" alt="Wars" ></img>

            <Row className="col-12 d-flex mt-5">
                <Col className="col-12">
                    <div style={{ fontFamily: "Starjedi", fontSize: "2em" }}>Bienvenue sur la page d'accueil</div>
                </Col>
            </Row>

            <Row className="col-12 d-flex mt-5">
                <Col className="col-12">
                    <div style={styles.largeFont}>Retrouvez sur ce site une liste complète de tous les personnages de l'univers Star Wars!</div>
                    <div style={styles.largeFont}>Consultez chaque personnage en détails ainsi que leur vaisseaux spaciaux!</div>
                </Col>

                <Col style={{ paddingTop: "2em" }} className="col-12">
                    <Image width="35%" src="star-wars-characters.jpg"></Image>
                </Col>
                
                <Col>
                    <Link style={styles.largeFont} to="/characters/all">Cliquez ici pour la liste!</Link>
                </Col>
            </Row>

            <Row>
                <Col style={{ paddingTop: "3em" }} className="col-6 text-center">
                    
                </Col>
            </Row>
        </>
    );
}