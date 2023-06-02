import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import EventCard from '../../components/event/eventCard';
import { getEvents, deleteEvent } from '../../utils/data/eventData';

function EventsHome() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  const getAllEvents = () => {
    getEvents().then((data) => setEvents(data));
  };

  useEffect(() => {
    getAllEvents();
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
          <EventCard eventObj={event} onUpdate={getAllEvents} />
          <Button
            onClick={() => {
              router.push(`/events/edit/${event.id}`);
            }}
          >Edit
          </Button>
          <Button
            onClick={() => {
              deleteEvent(event.id);
            }}
            onUpdate={getAllEvents}
          >Delete
          </Button>
        </section>
      ))}
    </article>
  );
}

export default EventsHome;
