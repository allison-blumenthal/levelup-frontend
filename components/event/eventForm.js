import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createEvent, updateEvent } from '../../utils/data/eventData';
import { getGames } from '../../utils/data/gameData';
import { getGamers } from '../../utils/data/gamerData';

const initialState = {
  description: '',
  date: '',
  time: '',
  game: 0,
  userId: '',
};

function EventForm({ eventObj }) {
  const [games, setGames] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    getGames().then(setGames);
    getGamers().then(setOrganizers);

    if (eventObj.id) {
      setCurrentEvent({
        id: eventObj.id,
        description: eventObj.description,
        date: eventObj.date,
        time: eventObj.time,
        game: eventObj.game?.id,
        userId: eventObj.organizer.id,
      });
    }
  }, [eventObj]);

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
        game: Number(currentEvent.game),
        userId: currentEvent.organizer.id,
      };

      updateEvent(updatedEvent).then(() => router.push(`/events/${eventObj.id}`));
    } else {
      const event = {
        description: currentEvent.description,
        date: currentEvent.date,
        time: currentEvent.time,
        game: Number(currentEvent.game),
        userId: currentEvent.organizer?.id,
      };

      createEvent(event).then(() => router.push('/events'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Game</Form.Label>
          <Form.Select name="game" required value={currentEvent.game} onChange={handleChange}>
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
          <Form.Select name="userId" required value={currentEvent.userId} onChange={handleChange}>
            <option value="">Select organizer:</option>
            {
            organizers.map((organizer) => (
              <option
                key={organizer.id}
                value={organizer.id}
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
    }),
    organizer: PropTypes.shape({
      id: PropTypes.number,
      bio: PropTypes.string,
    }),
  }),
};

EventForm.defaultProps = {
  eventObj: initialState,
};

export default EventForm;
