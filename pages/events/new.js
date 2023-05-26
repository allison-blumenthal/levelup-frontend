import EventForm from '../../components/event/eventForm';
import { useAuth } from '../../utils/context/authContext';

const NewEvent = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Add New Event</h2>
      <EventForm user={user} />
    </div>
  );
};

export default NewEvent;
