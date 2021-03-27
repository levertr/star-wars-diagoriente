import { useEffect, useState } from "react";
import { useParams } from "react-router"

export default function Information() {

    const params = useParams();

    const [vaisseau, setVaisseau] = useState({});

    const getVaisseau = () => {
        fetch("http://swapi.dev/api/starships/" + params.id)
            .then(response => {
                response.json().then(vaisseau => {
                    setVaisseau(vaisseau);
                })
            })
    }

    useEffect(() => {
        getVaisseau();
    }, [])

    return (
        <>
            <h1>Bienvenue sur la page du vaisseau <b>{vaisseau.name}</b></h1>
        </>
    )
}