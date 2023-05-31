import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleGame } from '../../utils/data/gameData';

export default function ViewGame() {
  const [gameDetails, setGameDetails] = useState({});
  const router = useRouter();

  const { id } = router.query;

  const getGameDetails = () => {
    getSingleGame(id).then(setGameDetails);
  };

  console.warn(gameDetails);

  useEffect(() => {
    getGameDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <h1>Game: {gameDetails.title}</h1>
      <h2>Made by: {gameDetails.maker}</h2>
      <h2>Number of Players: {gameDetails.number_of_players}</h2>
      <h2>Skill Level: {gameDetails.skill_level}</h2>
      <h2>GameType: {gameDetails.game_type?.label}</h2>
    </>
  );
}
