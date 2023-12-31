'use client';
import React, { useCallback, useState } from 'react';
import { Button } from 'antd';
import styles from './index.module.css';
import { Layout } from '@/сomponents/layout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../app/globals.css';

const GameAIFirst = () => {
  const [matches, setMatches] = useState(25);
  const [playerTurn, setPlayerTurn] = useState(false);
  const [userMatches, setUserMatches] = useState(0);
  const [aiMatches, setAIMatches] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const handleAIMove = useCallback(
    (numMatches: number) => {
      let aiChoose;
      if (numMatches <= 3) {
        aiChoose = numMatches;
      } else {
        aiChoose = (numMatches - 1) % 4;
        if (aiChoose === 0) {
          aiChoose = Math.floor(Math.random() * 3) + 1;
        }
      }
      const remainingMatches = numMatches - aiChoose;
      if (aiChoose === 0) {
        setAIMatches(aiChoose);
      } else {
        setAIMatches(aiMatches + aiChoose);
      }
      setMatches(remainingMatches);
      setPlayerTurn(true);
    },
    [matches, setMatches, aiMatches, setAIMatches, userMatches]
  );

  const handlePlayerMove = useCallback(
    (numMatches: number) => {
      const remainingMatches = matches - numMatches;
      if (userMatches === 0) {
        setUserMatches(numMatches);
      } else {
        setUserMatches(userMatches + numMatches);
      }
      setPlayerTurn(false);
      handleAIMove(remainingMatches);
    },
    [
      matches,
      setMatches,
      setPlayerTurn,
      userMatches,
      setUserMatches,
      handleAIMove,
    ]
  );

  const checkGameStatus = useCallback(() => {
    if (matches === 0) {
      const userEven = userMatches % 2 === 0;
      const aiEven = aiMatches % 2 === 0;

      if (userEven && !aiEven) {
        declareWinner('Player');
      } else if (!userEven && aiEven) {
        declareWinner('AI');
      }
    }
  }, [matches, userMatches, aiMatches]);

  const declareWinner = (winner: string) => {
    if (winner === 'Player') {
      toast.success('Congratulations! You win.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
    } else {
      toast.error('AI wins. Better luck next time.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
    }
  };

  const restartGame = () => {
    setMatches(25);
    setPlayerTurn(false);
    setUserMatches(0);
    setAIMatches(0);
    setGameStarted(false);
  };

  const startGame = () => {
    setGameStarted(true);
    handleAIMove(matches);
  };

  checkGameStatus();

  const disableButtons3 = matches < 3 && playerTurn;
  const disableButtons2 = matches < 2 && playerTurn;

  return (
    <Layout>
      <div className={styles.div}>
        {gameStarted ? (
          <div className={styles.div}>
            <h1>
              Matches: {matches} {Array(matches).fill('|').join('')}
            </h1>
            <h2>Turn: {playerTurn ? 'Player' : 'AI'}</h2>
            <p>
              User Matches: {userMatches}{' '}
              {Array(userMatches).fill('🔥').join('')}
            </p>
            <p>
              AI Matches: {aiMatches} {Array(aiMatches).fill('💻').join('')}
            </p>
            {matches > 0 && playerTurn && (
              <div>
                <Button
                  style={{ margin: '0.5rem' }}
                  onClick={() => handlePlayerMove(1)}
                >
                  Take 1 Match
                </Button>
                <Button
                  disabled={disableButtons2}
                  style={{ margin: '0.5rem' }}
                  onClick={() => handlePlayerMove(2)}
                >
                  Take 2 Matches
                </Button>
                <Button
                  disabled={disableButtons3}
                  style={{ margin: '0.5rem' }}
                  onClick={() => handlePlayerMove(3)}
                >
                  Take 3 Matches
                </Button>
              </div>
            )}
            <div>
              <Button
                style={{ margin: '0.5rem', width: '200px' }}
                onClick={restartGame}
              >
                Restart Game
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Button
              className={styles.center}
              style={{ margin: '0.5rem', width: '200px' }}
              onClick={startGame}
            >
              Start Game
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default GameAIFirst;
