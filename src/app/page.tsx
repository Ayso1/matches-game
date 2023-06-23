'use client';
import Image from 'next/image';
import { Button } from 'antd';
import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.div}>
        <h1 className={styles.title}>Matches game</h1>
        <p>
          Introduction to the game: Two people are playing a game. From the pile
          of 25 matches, each player takes either 1, 2, or 3 matches on each
          turn. The game is over once all matches are taken. Whoever has an even
          number of matches wins.
        </p>
        <div className={styles.descriptions}>
          <div>
            <h2>First Game Mode</h2>
            <p>
              In the first game mode, the user has the first turn. You will be
              playing against an AI opponent, and each player can take 1, 2, or
              3 matches on their turn. The game will continue until all matches
              are taken. The player with an even number of matches wins.
            </p>
            <Link href="/firstmode">
              <Button style={{ margin: '0.5rem' }}>First Game Mode</Button>
            </Link>
          </div>
          <div>
            <h2>Second Game Mode</h2>
            <p>
              In the second game mode, the AI has the first turn. You will be
              playing against an AI opponent, and the rules are the same as the
              first game mode. Can you defeat the AI and have an even number of
              matches at the end?
            </p>
            <Link href="/secondmode">
              <Button style={{ margin: '0.5rem' }}>Second Game Mode</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
