import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StartPage from './views/StartPage';
import UserPage from './views/UserPage'
import VerifyPage from './views/VerifyPage';
import PaymentPage from './views/PaymentPage';
import CreateAccount from './views/CreateAccount'
import Store from '../src/state/store';
import { Container } from 'reactstrap';


// These can stay here, no need to import files
const Logo = () => {
  return (
    <Container className="logo">
      <img src="/images/fishlogo.svg" alt="" />
      <p className="text-center">När du vill skicka en lax eller en röding</p>
    </Container>
  )
}
const Footer = () => {
  return (
    <Container className="footer">
      <p className="text-center">Optional footer</p>
    </Container>
  )
}
// end of inline components

const App = props => {
  return (
    <Store>
      <main className="wrapper">
        <Router>
          <Logo />
          <Container>
            <Switch>
              <Route exact path="/" component={StartPage} />
              <Route exact path="/verify" component={VerifyPage} />
              <Route exact path="/userpage" component={UserPage} />
              <Route exact path="/skapa-konto" component={CreateAccount} />
              <Route exact path="/betala" component={PaymentPage} />
            </Switch>
          </Container>
          <Footer />
        </Router>
      </main>
    </Store>
  )
}

export default App;
