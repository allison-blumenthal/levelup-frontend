import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createGame, getGameTypes, updateGame } from '../../utils/data/gameData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameType: '',
};

function GameForm({ gameObj }) {
  const [gameTypes, setGameTypes] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // TO-DO: Get the game types, then set the state
    getGameTypes().then(setGameTypes);

    if (gameObj.id) {
      setCurrentGame({
        id: gameObj.id,
        maker: gameObj.maker,
        title: gameObj.title,
        numberOfPlayers: gameObj.number_of_players,
        skillLevel: gameObj.skill_level,
        gameType: gameObj.game_type?.id,
        userId: user.uid,
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameObj, user]);

  console.warn(currentGame);

  const handleChange = (e) => {
    // TO-DO: Complete the onChange function
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    if (gameObj.id) {
      const updatedGame = {
        id: gameObj.id,
        maker: currentGame.maker,
        title: currentGame.title,
        numberOfPlayers: Number(currentGame.numberOfPlayers),
        skillLevel: Number(currentGame.skillLevel),
        gameType: Number(currentGame.gameType),
        userId: user.uid,
      };

      updateGame(updatedGame).then(() => router.push(`/games/${gameObj.id}`));
    } else {
      const game = {
        maker: currentGame.maker,
        title: currentGame.title,
        numberOfPlayers: Number(currentGame.numberOfPlayers),
        skillLevel: Number(currentGame.skillLevel),
        gameTypeId: Number(currentGame.gameType),
        userId: user.uid,
      };

      // Send POST request to your API
      createGame(game).then(() => router.push('/games'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">

          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={currentGame.title} onChange={handleChange} />

          <Form.Label>Maker</Form.Label>
          <Form.Control name="maker" required value={currentGame.maker} onChange={handleChange} />

          <Form.Label>Number of Players</Form.Label>
          <Form.Control name="numberOfPlayers" required value={currentGame.numberOfPlayers} onChange={handleChange} />

          <Form.Label>Skill Level</Form.Label>
          <Form.Control name="skillLevel" required value={currentGame.skillLevel} onChange={handleChange} />

          <Form.Label>Game Type</Form.Label>
          <Form.Select name="gameType" required value={currentGame.gameType} onChange={handleChange}>
            <option value="">Select game type:</option>
            {
                gameTypes.map((gameType) => (
                  <option
                    key={gameType.id}
                    value={gameType.id}
                  >
                    {gameType.label}
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

GameForm.propTypes = {
  gameObj: PropTypes.shape({
    id: PropTypes.number,
    number_of_players: PropTypes.number,
    skill_level: PropTypes.number,
    maker: PropTypes.string,
    title: PropTypes.string,
    game_type: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
  }),
};

GameForm.defaultProps = {
  gameObj: initialState,
};

export default GameForm;
