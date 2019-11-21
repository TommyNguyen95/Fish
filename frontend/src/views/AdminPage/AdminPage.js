import React, { useState } from 'react';
import axios from 'axios';
import './AdminPage.scss';
import {
  Col,
  Row,
  ListGroupItem,
  Form,
  Input,
  InputGroup,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap';
import TransactionCard from './components/TransactionCard';

const AdminPage = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  const getUser = async e => {
    e.preventDefault();
    const res = await axios.post(`http://localhost:3001/api/users`, { email: searchQuery });
    setUser(res.data)
  }

  const renderUserDetails = () => {
    const { username, firstname, lastname, created } = user;
    return (
      <Card>
        <CardHeader className="font-weight-bold">{firstname} {lastname}</CardHeader>
        <CardBody>
          <CardText>
            <span className="font-weight-bold">{firstname} {lastname}</span> gick med <span className="font-weight-bold">{created.split("T")[0]}</span> och har e-postadressen <span className="font-weight-bold">{username}</span>
          </CardText>
          <Button outline color="danger">Ta bort konto</Button>
        </CardBody>
      </Card>
    )
  }

  const renderTransactions = () => user.transactions.map(({ _id, to, from, amount, date }) =>
    <TransactionCard key={_id} to={to} from={from} amount={amount} date={date} />
  )

  const handleInput = e => setSearchQuery(e.target.value);
  console.log(user);

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
          <Col className="col-trans overflow-auto" xs="12" md="6">{
            user ? renderTransactions() : null
          }</Col>
        </Row>
      </Col>
    </Row >
  );
}

export default AdminPage;
