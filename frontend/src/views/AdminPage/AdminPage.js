import React, { useState } from 'react';
import axios from 'axios';
import './AdminPage.scss';
import {
  Col,
  Row,
  Form,
  Input,
  InputGroup,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardText
} from 'reactstrap';
import TransactionCard from './components/TransactionCard';


const AdminPage = () => {

  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const getUser = async e => {
    e.preventDefault();
    const res = await axios.post(`/api/users`, { email: searchQuery });
    setUser(res.data)
  }

  const handleInactivateAndActivate = async active => {
    await axios.patch(`/api/activate/${user._id}`, { active });
    setUser({ ...user, active });
  }

  const renderUserDetails = () => {
    const { username, firstname, lastname, created, balance, active } = user;
    return (
      <Card>
        <CardHeader className="font-weight-bold">{firstname} {lastname}</CardHeader>
        <CardBody>
          <CardText>
            <span className="font-weight-bold">{firstname} {lastname}</span> gick med <span className="font-weight-bold">{created.split("T")[0]}</span> och har e-postadressen <span className="font-weight-bold">{username}</span>
          </CardText>
          <CardText className="font-weight-bold">Saldo: {balance.toLocaleString()} sek</CardText>
          {active ?
            <Button outline color="danger" onClick={() => handleInactivateAndActivate(false)}>Inaktivera konto</Button> :
            <Button outline color="primary" onClick={() => handleInactivateAndActivate(true)}>Aktivera konto</Button>}

        </CardBody>
      </Card>
    )
  }

  const renderTransactions = () => user.transactions.map(({ _id, to, from, amount, date }) => (
    <TransactionCard key={_id} to={to} from={from} amount={amount} date={date} />
  ));

  const handleInput = e => setSearchQuery(e.target.value);
  return (
    <Row>
      <Col>
        <Form onSubmit={getUser}>
          <InputGroup>
            <Input placeholder="Sök användare..." onChange={handleInput} />
            <Button>Sök</Button>
          </InputGroup>
        </Form>
        <Row>
          <Col className="mb-1" xs="12" md="6">
            {user ? renderUserDetails() : null}
          </Col>
          <Col className="col-trans overflow-auto" xs="12" md="6">
            {user ? renderTransactions() : null}
          </Col>
        </Row>
      </Col>
    </Row >
  );
}

export default AdminPage;
