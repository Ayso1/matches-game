'use client';
import { Button } from 'antd';
import styles from './index.module.css';
import AppLink from '@/сomponents/link';
import { Layout } from '@/сomponents/layout';
import '../app/globals.css';

export default function HomePage() {
  return (
    <Layout>
      <main className={styles.main}>
        <div className={styles.div} style={{ maxWidth: '1000px' }}>
          <h1 className={styles.title}>Matches game</h1>
          <p>
            Introduction to the game: Two people are playing a game. From the
            pile of 25 matches, each player takes either 1, 2, or 3 matches on
            each turn. The game is over once all matches are taken. Whoever has
            an even number of matches wins.
          </p>
          <div className={styles.descriptions}>
            <div>
              <h2>First Game Mode</h2>
              <p>
                In the first game mode, the user has the first turn. You will be
                playing against an AI opponent, and each player can take 1, 2,
                or 3 matches on their turn. The game will continue until all
                matches are taken. The player with an even number of matches
                wins.
              </p>
              <p>
                You can customize the number of matches available (n) and the
                maximum number of matches a player can take on each turn (m) in
                this mode.
              </p>
              <AppLink href="/firstmode">
                <Button style={{ margin: '0.5rem' }}>First Game Mode</Button>
              </AppLink>
            </div>
            <div>
              <h2>Second Game Mode</h2>
              <p>
                In the second game mode, the AI has the first turn. You will be
                playing against an AI opponent, and the rules are the same as
                the first game mode. Can you defeat the AI and have an even
                number of matches at the end?
              </p>
              <p>
                You can customize the number of matches available (n) and the
                maximum number of matches a player can take on each turn (m) in
                this mode.
              </p>
              <AppLink href="/secondmode">
                <Button style={{ margin: '0.5rem' }}>Second Game Mode</Button>
              </AppLink>
            </div>
          </div>
          <div className={styles.center}>
            <h2>Third Game Mode</h2>
            <p>
              In the third game mode, the user has the first turn. You will be
              playing against an AI opponent, and the rules are the same as the
              first two game modes. However, in this mode, you can customize the
              number of matches available (n) and the maximum number of matches
              a player can take on each turn (m) to increase or decrease the
              game's difficulty.
            </p>
            <p>
              You can customize the values of n and m to create different game
              scenarios and test your skills against the AI.
            </p>
            <AppLink href="/thirdmode">
              <Button style={{ margin: '0.5rem' }}>Third Game Mode</Button>
            </AppLink>
          </div>
        </div>
      </main>
    </Layout>
  );
}
