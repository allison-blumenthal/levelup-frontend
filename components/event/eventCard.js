import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

function EventCard({ eventObj }) {
  return (
    <>
      <Card className="text-center">
        <Card.Header>{eventObj.game.title}</Card.Header>
        <Card.Body>
          <Card.Title>Organized by: {eventObj.organizer.bio}</Card.Title>
          <Card.Text>{eventObj.description}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">Date: {eventObj.date} Time: {eventObj.time}</Card.Footer>
      </Card>
    </>
  );
}

EventCard.propTypes = {
  eventObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    game: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    organizer: PropTypes.shape({
      bio: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default EventCard;
