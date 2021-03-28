import { faHome, faListUl, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import InformationCharacter from './components/Characters/Information';
import ListAll from './components/Characters/ListAll';
import Home from './components/Home/Home';
import ReverseGeocoding from './components/SSI/ReverseGeocoding';
import InformationStarship from './components/Starships/Information';

function App() {
  return (
    <div className="App">

      {/* Barre de navigation de l'application */}
      <Navbar>
        <Navbar.Brand><div className="navBrand">STAR WARS APi</div></Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/">
              <Nav.Link><FontAwesomeIcon icon={faHome}></FontAwesomeIcon> Page d'accueil</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/characters/all">
              <Nav.Link><FontAwesomeIcon icon={faListUl}></FontAwesomeIcon> Liste des personnages</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/geocoding">
              <Nav.Link><FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon> Position du SSI</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Switch contenant toutes les routes de l'application */}
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>

        <Route exact path="/characters/all">
          <ListAll></ListAll>
        </Route>

        <Route exact path="/character/:id">
          <InformationCharacter></InformationCharacter>
        </Route>

        <Route exact path="/starship/:id">
          <InformationStarship></InformationStarship>
        </Route>

        <Route exact path="/geocoding">
          <ReverseGeocoding></ReverseGeocoding>
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
