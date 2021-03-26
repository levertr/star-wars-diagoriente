import { Link } from "react-router-dom";

export default function Home() {

    return (
        <>
            <h1>Page d'accueil du site</h1>

            <Link to="/characters/all">Link to characters all</Link>
        </>
    );
}