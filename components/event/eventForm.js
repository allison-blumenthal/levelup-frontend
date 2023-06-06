import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createEvent, updateEvent } from '../../utils/data/eventData';
import { getGames } from '../../utils/data/gameData';
import { getGamers } from '../../utils/data/gamerData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  description: '',
  date: '',
  time: '',
  gameId: 0,
  organizerId: '',
};

function EventForm({ eventObj }) {
  const [games, setGames] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getGames().then(setGames);
    getGamers().then(setOrganizers);

    if (eventObj.id) {
      setCurrentEvent({
        id: eventObj.id,
        description: eventObj.description,
        date: eventObj.date,
        time: eventObj.time,
        gameId: eventObj.game?.id,
        organizerId: eventObj.organizer?.uid,
      });
    }
  }, [eventObj, user]);

  console.warn(currentEvent);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (eventObj.id) {
      const updatedEvent = {
        id: eventObj.id,
        description: currentEvent.description,
        date: currentEvent.date,
        time: currentEvent.time,
        gameId: Number(currentEvent.gameId),
        organizerId: currentEvent.organizerId,
      };

      updateEvent(updatedEvent).then(() => router.push(`/events/${eventObj.id}`));
    } else {
      const event = {
        description: currentEvent.description,
        date: currentEvent.date,
        time: currentEvent.time,
        gameId: Number(currentEvent.gameId),
        organizerId: currentEvent.organizerId,
      };

      createEvent(event).then(() => router.push('/events'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Game</Form.Label>
          <Form.Select name="gameId" required value={currentEvent.gameId} onChange={handleChange}>
            <option value="">Select game:</option>
            {
                games.map((game) => (
                  <option
                    key={game.id}
                    value={game.id}
                  >
                    {game.title}
                  </option>
                ))
              }
          </Form.Select>

          <Form.Label>Event Description</Form.Label>
          <Form.Control name="description" required value={currentEvent.description} onChange={handleChange} />

          <Form.Label>Date (YYYY-MM-DD)</Form.Label>
          <Form.Control name="date" required value={currentEvent.date} onChange={handleChange} />

          <Form.Label>Time (HH:MM::SS)</Form.Label>
          <Form.Control name="time" required value={currentEvent.time} onChange={handleChange} />

          <Form.Label>Organizer</Form.Label>
          <Form.Select name="organizerId" required value={currentEvent.organizerId} onChange={handleChange}>
            <option value="">Select organizer:</option>
            {
            organizers.map((organizer) => (
              <option
                key={organizer.uid}
                value={organizer.uid}
              >
                {organizer.bio}
              </option>
            ))
          }
          </Form.Select>

        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

EventForm.propTypes = {
  eventObj: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    game: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    }),
    organizer: PropTypes.shape({
      id: PropTypes.number,
      uid: PropTypes.string,
      bio: PropTypes.string,
    }),
  }),
};

EventForm.defaultProps = {
  eventObj: initialState,
};

export default EventForm;
