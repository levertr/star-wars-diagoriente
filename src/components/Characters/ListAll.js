/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Card, CardDeck, Col, Container, Form, Image, Row, Table } from "react-bootstrap";
import PaginationCharacters from '../../Pagination/PaginationCharacters';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import '../../web/css/characters/index.css';

function ListAll({ history }) {

    const [currentCharacters, setCurrentCharacters] = useState([]);
    const [previous, setPrevious] = useState(0);
    const [next, setNext] = useState(0);
    const [page, setPage] = useState(1);
    const [images, setImages] = useState([]);

    const imageStyle = {
        width: '100%',
        height: "15vw",
        objectFit: 'cover',
    }

    const getId = (url) => {
        return url.substring(
            url.lastIndexOf("people") + 7,
            url.lastIndexOf("/")
        );
    }

    const getResults = () => {
        fetch("https://swapi.dev/api/people/?page=" + page)
            .then(response => {
                handleResponse(response);
            })
    }

    const getBySearchedName = (searchedName) => {
        fetch("https://swapi.dev/api/people/?search=" + searchedName)
            .then(response => {
                handleResponse(response);
            })
    }

    const getImages = () => {
        let array = [];
        fetch("https://akabab.github.io/starwars-api/api/all.json")
            .then(response => {
                response.json().then(characters => {
                    characters.map(c => {
                        array.push({ name: c.name, image: c.image });
                        setImages(array);
                    })
                })
            })

    }

    const handleResponse = (response) => {
        response.json().then(characters => {
            setCurrentCharacters(characters.results);
            setNext(characters.next !== null ? characters.next.slice(-1) : 0);
            setPrevious(characters.previous !== null ? characters.previous.slice(-1) : 0);
        })
    }

    const onChange = (e) => {
        getBySearchedName(e.target.value)
    }

    const nameOnClick = (url) => {
        var id = getId(url);
        history.push(`/character/${id}`);
    }

    const nextPage = () => setPage(page + 1);
    const previousPage = () => setPage(page - 1);

    useEffect(() => {
        getImages();
        getResults();
    }, [page])

    return (
        <>
            <h1>Voici tous les personnages de
                <div>
                    <img width="9%" src="https://cssanimation.rocks/demo/starwars/images/star.svg" alt="Star" ></img>
                    <img width="9%" src="https://cssanimation.rocks/demo/starwars/images/wars.svg" alt="Wars" ></img>
                </div>
            </h1>

            <Container>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="searchForm">
                                <Form.Label><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon> Cherchez votre personnage</Form.Label><br></br>
                                <Form.Control size="sm" type="text" placeholder="Nom du personnage" onChange={onChange}></Form.Control>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>

            <Container fluid>
                <Row>
                    {currentCharacters.map((ch, index) =>
                        <Col key={index} lg={2} className="d-flex">
                            <CardDeck>
                                <Card style={{ width: '15rem' }} className="flex-fill" onClick={() => nameOnClick(ch.url)}>
                                    {
                                        images !== undefined && images.filter(i => i.name === ch.name).map(i => <Image className="card-img-top img-fluid" style={imageStyle} src={i.image}></Image>)
                                    }
                                    <Card.Body>
                                        <Card.Title><Link onClick={() => nameOnClick(ch.url)}>{ch.name}</Link></Card.Title>
                                    </Card.Body>
                                </Card>
                            </CardDeck>
                        </Col>
                    )}
                </Row>
            </Container>

            <PaginationCharacters previous={previous} next={next} previousPage={previousPage} nextPage={nextPage} paginate={setPage} currentPage={page}></PaginationCharacters>

        </>
    )
}

export default withRouter(ListAll);