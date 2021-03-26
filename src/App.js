import logo from './logo.svg';
import './App.css';
import { Route, Switch, NavLink, Link } from 'react-router-dom'
import Home from './components/Home/Home';
import ListAll from './components/Characters/ListAll';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">

      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>

        <Route exact path="/characters/all">
          <ListAll></ListAll>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
