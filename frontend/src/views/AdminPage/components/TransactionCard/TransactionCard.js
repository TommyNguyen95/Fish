import React from 'react';
import {
  Card,
  CardTitle,
  CardText
} from 'reactstrap';

const TransactionCard = ({
  to: {
    username: toEmail,
    firstname: toFirstName,
    lastname: toLastName
  },
  from: {
    username,
    firstname,
    lastname
  },
  amount,
  date
}) => {
  const formatDate = () => date ? date.split('T')[0] : 'Inget datum';

  return (
    <Card body outline color="primary">
      <CardTitle className="font-weight-bold">Avsändare</CardTitle>
      <CardText>E-post: {username}</CardText>
      <CardText>Namn: {firstname} {lastname}</CardText>
      <CardTitle className="font-weight-bold">Mottagare</CardTitle>
      <CardText>E-post: {toEmail}</CardText>
      <CardText>Namn: {toFirstName} {toLastName}</CardText>
      <CardText className="font-weight-bold">Summa: {amount} kr</CardText>
      <CardText className="font-weight-bold">Datum: {formatDate()}</CardText>
    </Card>
  );
}

export default TransactionCard;
