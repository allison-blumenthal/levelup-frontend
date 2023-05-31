import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

function GameCard({ gameObj }) {
  const router = useRouter();

  console.warn(gameObj);

  return (
    <>
      <Card className="text-center">
        <Card.Header>{gameObj.title}</Card.Header>
        <Card.Body>
          <Card.Title>By: {gameObj.maker}</Card.Title>
          <Card.Text>{gameObj.number_of_players} players needed</Card.Text>
          <Card.Text>Type: {gameObj.game_type.label}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">Skill Level: {gameObj.skill_level}</Card.Footer>
        <Button
          onClick={() => {
            router.push(`/games/edit/${gameObj.id}`);
          }}
        >Edit Game
        </Button>
      </Card>
    </>
  );
}

GameCard.propTypes = {
  gameObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    maker: PropTypes.string.isRequired,
    number_of_players: PropTypes.number.isRequired,
    skill_level: PropTypes.number.isRequired,
    game_type: PropTypes.shape({
      label: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default GameCard;
