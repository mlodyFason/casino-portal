'use client';
import { useAuth } from '../auth/AuthContextProvider';
import {
  Card,
  Grid,
  Header,
  Image,
  Loader,
  GridColumn,
  Item,
  Button,
  Icon,
  ItemImage,
  ItemContent,
  CardDescription,
  Divider,
} from 'semantic-ui-react';
import { Search } from '../components/Search';
import { PlayerMenu } from '../components/PlayerMenu';
import { useState, useEffect } from 'react';
import { Categories } from '../components/Categories';
import Link from 'next/link';
import { getGames } from '../api/getGames';

type CasinoGame = {
  name: string;
  description: string;
  code: string;
  icon: string;
  categoryIds: number[];
};

export default function GamesPage() {
  const auth = useAuth();
  const { player } = auth;

  const [games, setGames] = useState<CasinoGame[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGamesData = async () => {
      setIsLoading(true);

      try {
        const gamesData = await getGames();
        setGames(gamesData);
      } catch (error: unknown) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGamesData();
  }, []);

  const handlePlay = () => {};

  return (
    <Grid>
      <PlayerMenu
        avatar={player?.avatar || ''}
        name={player?.name || ''}
        event={player?.event || ''}
        logout={auth.logout}
      />
      <Search />

      <GridColumn width={12}>
        <Header as="h3" dividing>
          Games
        </Header>
        {isLoading ? (
          <Loader active inline="centered" />
        ) : (
          <>
            <script src="lib/comeon.game-1.1.min.js" defer />
            <div className="ui relaxed divided game items links">
              {games.map(game => (
                <Card fluid className="!shadow-none">
                  <Item className="flex p-4 flex-wrap md:flex-nowrap game-launch">
                    <ItemImage
                      src={game.icon}
                      alt="game-icon"
                      size="medium"
                      className="flex-[1_1_100%] min-w-[230px] md:m-4"
                    />
                    <ItemContent>
                      <Header>{game.name}</Header>
                      <CardDescription className="mb-4">
                        {game.description}
                      </CardDescription>
                      <div>
                        <Link href={`/games/${game.code}`}>
                          <Button
                            className="play"
                            floated="right"
                            secondary={true}
                            inverted={true}
                            type="button"
                            onClick={handlePlay}
                          >
                            Play
                            <Icon name="chevron right" />
                          </Button>
                        </Link>
                      </div>
                    </ItemContent>
                  </Item>
                  <Divider />
                </Card>
              ))}
            </div>
          </>
        )}
      </GridColumn>

      <Categories />
    </Grid>
  );
}
