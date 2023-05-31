import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import GameCard from '../../components/game/gameCard';
import { getGames } from '../../utils/data/gameData';

function Home() {
  const [games, setGames] = useState([]);
  const router = useRouter();

  const getAllGames = () => {
    getGames().then((data) => setGames(data));
  };

  useEffect(() => {
    getAllGames();
  }, []);

  return (
    <article className="games">
      <h1>Games</h1>
      <Button
        onClick={() => {
          router.push('/games/new');
        }}
      >Register New Game
      </Button>
      {games.map((game) => (
        <section key={`game--${game.id}`} className="game">
          <GameCard gameObj={game} onUpdate={getAllGames} />
        </section>
      ))}
    </article>
  );
}

export default Home;
