import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import EventCard from '../../components/event/eventCard';
import { getEvents } from '../../utils/data/eventData';

function EventsHome() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  return (
    <article className="events">
      <h1>Events</h1>
      <Button
        onClick={() => {
          router.push('/events/new');
        }}
      >Add New Event
      </Button>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard description={event.description} date={event.date} time={event.time} organizer={event.organizer.bio} game={event.game.title} />
        </section>
      ))}
    </article>
  );
}

export default EventsHome;
