'use client';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Grid, GridRow, GridColumn, Button, Icon } from 'semantic-ui-react';
import Link from 'next/link';

declare global {
  interface Window {
    comeon: {
      game: {
        launch: (code: string) => void;
      };
    };
  }
}

export default function InGame() {
  const { game } = useParams();

  useEffect(() => {
    const startGame = () => {
      if (
        window.comeon &&
        window.comeon.game &&
        typeof window.comeon.game.launch === 'function'
      ) {
        game && window.comeon.game.launch(game.toString());
      } else {
        throw new Error('Launch error');
      }
    };

    startGame();

    return () => {
      const iframe = document.querySelector('#game');

      if (iframe) {
        iframe.remove();
      }
    };
  }, [game]);

  return (
    <Grid centered>
      <GridRow>
        <GridColumn width="15" textAlign="center">
          <Link href="/games">
            <Button size="small">
              <Icon name="chevron left" />
              Browse games
            </Button>
          </Link>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn width={16}>
          <div id="game-launch"></div>
        </GridColumn>
      </GridRow>
    </Grid>
  );
}
