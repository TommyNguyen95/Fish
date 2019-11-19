import React, { useState } from 'react';
import axios from 'axios';
import {
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  Form,
  Input,
  InputGroup,
  Button
} from 'reactstrap';

const AdminPage = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const getUser = async e => {
    e.preventDefault();
    console.log(searchQuery);

    const res = await axios.post(`http://localhost:3001/api/users`, { email: searchQuery });
    setUser(res.data)
  }
  console.log(user);

  const renderUser = () => {
    const { firstname, lastname, _id } = user;
    return <ListGroupItem key={_id}>{firstname} {lastname}</ListGroupItem>
  }

  const handleInput = e => setSearchQuery(e.target.value);
  console.log('USER', user);

  return (
    <Row>
      <Col>
        <Form onSubmit={getUser}>
          <InputGroup>
            <Input placeholder="Sök användare..." onChange={handleInput} />
            <Button>Sök</Button>
          </InputGroup>
        </Form>
        <ListGroup>
          {user ? renderUser() : null}
        </ListGroup>
      </Col>
    </Row >
  );
}

export default AdminPage;
