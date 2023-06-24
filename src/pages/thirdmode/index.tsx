'use client';
import React, { useCallback, useState } from 'react';
import { Button, Modal, Input, Form, Tooltip } from 'antd';
import styles from './index.module.css';
import { Layout } from '@/сomponents/layout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../app/globals.css';

const GameWithOptions = () => {
  const [n, setN] = useState(12); // Default value of n
  const [m, setM] = useState(3); // Default value of m
  const [matches, setMatches] = useState(2 * n + 1);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [userMatches, setUserMatches] = useState(0);
  const [aiMatches, setAIMatches] = useState(0);
  const [gameOver, setGameOver] = useState(false); // Track game over status

  const handleAIMove = useCallback(
    (numMatches: number) => {
      let aiChoose;
      if (numMatches <= m) {
        aiChoose = numMatches;
      } else {
        aiChoose = (numMatches - 1) % (m + 1);
        if (aiChoose === 0) {
          aiChoose = Math.floor(Math.random() * m) + 1;
        }
      }
      const remainingMatches = numMatches - aiChoose;
      if (userMatches === 0) {
        setAIMatches(aiChoose);
      } else {
        setAIMatches(aiMatches + aiChoose);
      }
      setMatches(remainingMatches);
      setPlayerTurn(true);
    },
    [matches, setMatches, aiMatches, setAIMatches, userMatches, m]
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
    setMatches(2 * n + 1);
    setPlayerTurn(true);
    setUserMatches(0);
    setAIMatches(0);
    setGameOver(false);
  };

  const handleFormSubmit = (values: any) => {
    const { n, m } = values;
    setN(n);
    setM(m);
    setMatches(2 * n + 1);
    restartGame();
  };

  checkGameStatus();
  //const disableButtons = matches < m && playerTurn;

  return (
    <Layout>
      <div className={styles.div}>
        <h1>
          Matches: {matches} {Array(matches).fill('|').join('')}
        </h1>
        <h2>Turn: {playerTurn ? 'Player' : 'AI'}</h2>
        <p>
          User Matches: {userMatches} {Array(userMatches).fill('🔥').join('')}
        </p>
        <p>
          AI Matches: {aiMatches} {Array(aiMatches).fill('💻').join('')}
        </p>
        {matches > 0 && playerTurn && (
          <div>
            {Array.from({ length: m }, (_, index) => {
              const num = index + 1;
              const disableButton = num > matches || num > m;
              return (
                <Button
                  key={num}
                  disabled={disableButton}
                  style={{ margin: '0.5rem' }}
                  onClick={() => handlePlayerMove(num)}
                >
                  Take {num} Match{num > 1 ? 'es' : ''}
                </Button>
              );
            })}
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
        <Form layout="inline" onFinish={handleFormSubmit}>
          <Form.Item
            label={
              <Tooltip title="Number of matches available">
                <label style={{ color: 'white' }}>n</label>
              </Tooltip>
            }
          >
            <Input
              type="number"
              value={n}
              onChange={(e) => setN(Number(e.target.value))}
              onKeyPress={(e) => e.preventDefault()}
              max={12}
              min={4}
              inputMode="none"
              style={{ width: '120px' }}
            />
          </Form.Item>
          <Form.Item
            label={
              <Tooltip title=" Maximum number of matches a player can take on each turn">
                <label style={{ color: 'white' }}>m</label>
              </Tooltip>
            }
          >
            <Input
              type="number"
              value={m}
              onChange={(e) => setM(Number(e.target.value))}
              max={4}
              min={2}
              inputMode="none"
              style={{ width: '120px' }}
            />
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};

export default GameWithOptions;
