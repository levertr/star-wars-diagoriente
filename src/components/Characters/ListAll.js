/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Table } from "react-bootstrap";
import PaginationCharacters from '../../Pagination/PaginationCharacters';

export default function ListAll() {

    const [currentCharacters, setCurrentCharacters] = useState([]);
    const [previous, setPrevious] = useState(0);
    const [next, setNext] = useState(0);
    const [page, setPage] = useState(1);

    const getResults = () => {
        fetch("https://swapi.dev/api/people/?page=" + page)
            .then(response => {
                response.json().then(characters => {
                    console.log(characters);
                    setCurrentCharacters(characters.results);
                    setNext(characters.next !== null ? characters.next.slice(-1) : 0);
                    setPrevious(characters.previous !== null ? characters.previous.slice(-1) : 0);
                })
            })
    }

    const nextPage = () => setPage(page + 1);
    const previousPage = () => setPage(page - 1);

    useEffect(() => {
        getResults();
    }, [page])

    return (
        <>
            <h1>Voici tous les personnages de Star Wars</h1>

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
                                    {ch.name}<br />
                                </td>
                                <td>{ch.created}</td>
                                <td>{ch.edited}</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>

            <nav>
                <ul>
                    {
                        previous !== 0 && (
                            <li className="page-item">
                                <a className="page-link" href="#" onClick={() => previousPage()}>Précédent</a>
                            </li>
                        )
                    }

                    {

                    }

                    {
                        next !== 0 && (
                            <li className="page-item">
                                <a className="page-link" href="#" onClick={() => nextPage()}>Suivant</a>
                            </li>
                        )
                    }
                </ul>
            </nav>

            {/* <PaginationCharacters current previous={previous} next={next}></PaginationCharacters> */}
        </>
    )
}