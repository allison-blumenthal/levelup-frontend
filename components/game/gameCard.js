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
          <Card.Text>{gameObj.numberOfPlayers} players needed</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">Skill Level: {gameObj.skillLevel}</Card.Footer>
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
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    maker: PropTypes.string.isRequired,
    numberOfPlayers: PropTypes.number.isRequired,
    skillLevel: PropTypes.number.isRequired,
  }).isRequired,
};

export default GameCard;
