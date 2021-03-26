/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react"

export default function PaginationCharacters(props) {

    useEffect(() => {
        console.log(props);
    }, [props])

    return (
        <>
            <nav>
                <ul>
                    {
                        props.previous !== 0 && (
                            <li className="page-item">
                                <a className="page-link" href="#">Précédent</a>
                            </li>
                        )
                    }

                    {
                        
                    }

                    {
                        props.next !== 0 && (
                            <li className="page-item">
                                <a className="page-link" href="#">Suivant</a>
                            </li>
                        )
                    }
                </ul>
            </nav>
        </>
    )
}