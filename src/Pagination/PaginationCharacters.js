/* eslint-disable jsx-a11y/anchor-is-valid */
import { Pagination } from "react-bootstrap";

export default function PaginationCharacters(props) {

    const pageNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const style = {
        margin: '10px',
        display: 'inline-flex'
    }

    return (
        <>
            {
                <Pagination style={style} size="lg">
                    {
                        props.previous !== 0 && (
                            <Pagination.Prev onClick={() => props.previousPage()}></Pagination.Prev>
                        )
                    }

                    {
                        pageNumbers.map(page => 
                            <Pagination.Item key={page} active={props.currentPage === page} onClick={() => props.paginate(page)}>{page}</Pagination.Item>
                        )
                    }

                    {
                        props.next !== 0 && (
                            <Pagination.Next onClick={() => props.nextPage()}></Pagination.Next>
                        )
                    }
                </Pagination>
            }
        </>
    )
}