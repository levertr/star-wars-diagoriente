/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react"
import { Col, Container, Pagination, Row } from "react-bootstrap";

export default function PaginationCharacters(props) {

    useEffect(() => {
    }, [props])

    const pageNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <>
            <Container>
                <Row>
                    <Col md={{ span: 5, offset: 5 }}>
                        {
                            <Pagination size="lg" className="text-center">
                                {
                                    props.previous !== 0 && (
                                        <Pagination.Prev onClick={() => props.previousPage()}></Pagination.Prev>
                                    )
                                }

                                {
                                    pageNumbers.map(page => (
                                        <Pagination.Item key={page} active={props.currentPage === page} onClick={() => props.paginate(page)}>{page}</Pagination.Item>
                                    ))
                                }

                                {
                                    props.next !== 0 && (
                                        <Pagination.Next onClick={() => props.nextPage()}></Pagination.Next>
                                    )
                                }
                            </Pagination>
                        }
                    </Col>
                </Row>
            </Container>


            {

            }
        </>
    )
}