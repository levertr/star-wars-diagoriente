/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row, Table } from "react-bootstrap";
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
        var id = url.substring(
            url.lastIndexOf("people") + 7,
            url.lastIndexOf("/")
        );
        history.push(`/character/${id}`);
    }

    const nextPage = () => setPage(page + 1);
    const previousPage = () => setPage(page - 1);

    useEffect(() => {
        getResults();
    }, [page])

    return (
        <>
            <h1>Voici tous les personnages de <div className="starwarsFont">Star Wars</div></h1>

            <Container>
                <Row>
                    <Col md={{ span: 5, offset: 10 }} >
                        <Form>
                            <Form.Group controlId="searchForm">
                                <Form.Label><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon> Cherchez votre personnage</Form.Label>
                                <Form.Control size="sm" type="text" placeholder="Nom du personnage" onChange={onChange}></Form.Control>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>


            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Personnage</th>
                        <th>Créé le</th>
                        <th>Derniere modification le</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        currentCharacters.map((ch, index) =>
                            <tr key={index}>
                                <td>
                                    <Link onClick={() => nameOnClick(ch.url)}>{ch.name}</Link><br />
                                </td>
                                <td>{ch.created}</td>
                                <td>{ch.edited}</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>

            <PaginationCharacters previous={previous} next={next} previousPage={previousPage} nextPage={nextPage} paginate={setPage} currentPage={page}></PaginationCharacters>

        </>
    )
}

export default withRouter(ListAll);