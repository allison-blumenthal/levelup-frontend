import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import EventCard from '../../components/event/eventCard';
import { getEvents } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

function EventsHome() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const getAllEvents = () => {
    getEvents(user.uid).then(setEvents);
  };

  useEffect(() => {
    getAllEvents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
          <EventCard eventObj={event} onUpdate={getAllEvents} joined={event.joined} />
        </section>
      ))}
    </article>
  );
}

export default EventsHome;
