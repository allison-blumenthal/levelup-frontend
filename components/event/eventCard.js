import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deleteEvent } from '../../utils/data/eventData';

function EventCard({ eventObj, onUpdate }) {
  const router = useRouter();

  const deleteThisEvent = () => {
    if (window.confirm('Delete this event?')) {
      deleteEvent(eventObj.id).then(() => onUpdate());
    }
  };

  return (
    <>
      <Card className="text-center">
        <Card.Header>{eventObj.game.title}</Card.Header>
        <Card.Body>
          <Card.Title>Organized by: {eventObj.organizer.bio}</Card.Title>
          <Card.Text>{eventObj.description}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">Date: {eventObj.date} Time: {eventObj.time}</Card.Footer>
        <Button
          onClick={() => {
            router.push(`/events/edit/${eventObj.id}`);
          }}
        >Edit
        </Button>
        <Button
          onClick={deleteThisEvent}
        >
          Delete
        </Button>

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
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
