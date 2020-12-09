import './App.css';
import Links from './components/links/Links';
import Dashboard from './components/dashboard/Dashboard';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Header />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/links" component={Links} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
