import logo from './logo.svg';
import './App.css';
import { Route, Switch, NavLink, Link } from 'react-router-dom'
import Home from './components/Home/Home';
import ListAll from './components/Characters/ListAll';
import 'bootstrap/dist/css/bootstrap.min.css';
import InformationCharacter from './components/Characters/Information';
import InformationStarship from './components/Starships/Information';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faListUl } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <div className="App">
      
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
          </Nav>
        </Navbar.Collapse>
      </Navbar>

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
      </Switch>
    </div>
  );
}

export default App;
