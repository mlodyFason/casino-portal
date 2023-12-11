'use client';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Grid, GridRow, GridColumn, Button, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import { useAuth } from '@/app/auth/AuthContextProvider';
import { useRouter } from 'next/navigation';

export default function InGame() {
  const { game } = useParams();

  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    const startGame = () => {
      if (
        window.comeon &&
        window.comeon.game &&
        typeof window.comeon.game.launch === 'function'
      ) {
        game && window.comeon.game.launch(game.toString());
      } else if (!auth.player) {
        router.push('/');
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

  if (!auth.player) return null;

  return (
    <Grid centered className="bg-white">
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
