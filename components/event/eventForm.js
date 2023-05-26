import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createEvent } from '../../utils/data/eventData';
import { getGames } from '../../utils/data/gameData';
import { getGamers } from '../../utils/data/gamerData';

const initialState = {
  description: '',
  date: '',
  time: '',
  gameId: 0,
  userId: 0,
};

const EventForm = () => {
  const [games, setGames] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    getGames().then(setGames);
    getGamers().then(setOrganizers);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const event = {
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      gameId: Number(currentEvent.gameId),
      userId: Number(currentEvent.userId),
    };

    createEvent(event).then(() => router.push('/events'));
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
};

export default EventForm;
