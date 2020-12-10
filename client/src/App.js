import './App.css';
import Links from './components/links/Links';
import Dashboard from './components/dashboard/Dashboard';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import LinkId from './components/links/components/LinkId';
import About from './components/about/About';
import Footer from './components/footer/Footer';

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
          <Route exact path="/links/:id" component={LinkId} />
          <Route exact path="/about" component={About} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
