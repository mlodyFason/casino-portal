'use client';
import { useAuth } from '../auth/AuthContextProvider';
import { Grid, Header, Loader, GridColumn } from 'semantic-ui-react';
import { Search } from '../components/Search';
import { PlayerMenu } from '../components/PlayerMenu';
import { useState, useEffect } from 'react';
import { Categories } from '../components/Categories';
import { getGames } from '../api/getGames';
import { useDebouncedCallback } from 'use-debounce';
import { GameCard } from '../components/GameCard';
import { useRouter } from 'next/navigation';

const DEBOUNCE_TIME = 500;

export type CasinoGame = {
  name: string;
  description: string;
  code: string;
  icon: string;
  categoryIds: number[];
};

export default function GamesPage() {
  const auth = useAuth();

  const router = useRouter();

  const [games, setGames] = useState<CasinoGame[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  useEffect(() => {
    const fetchGamesData = async () => {
      setIsLoading(true);

      try {
        const gamesData: CasinoGame[] = await getGames();
        setGames(gamesData);
      } catch (error: unknown) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGamesData();
  }, []);

  useEffect(() => {
    if (!auth.player) {
      router.push('/');
    }
  }, [auth.player, router]);

  const debouncedHandleSearchChange = useDebouncedCallback((value: string) => {
    setSearchTerm(value);
  }, DEBOUNCE_TIME);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategories(prevCategories => {
      if (prevCategories.includes(categoryId)) {
        return prevCategories.filter(id => id !== categoryId);
      } else {
        return [...prevCategories, categoryId];
      }
    });
  };

  const filteredGames = games.filter(game => {
    const matchesSearch = game.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (selectedCategories.length === 0) {
      return matchesSearch;
    }

    return (
      matchesSearch &&
      game.categoryIds.some(id => selectedCategories.includes(id))
    );
  });

  if (!auth.player) return;

  return (
    <Grid className="bg-white">
      <PlayerMenu />
      <Search onSearchChange={debouncedHandleSearchChange} />
      <GridColumn width={12}>
        <Header as="h3" dividing>
          Games
        </Header>
        {isLoading ? (
          <Loader active inline="centered" />
        ) : (
          <section>
            {filteredGames.map(game => (
              <GameCard {...game} key={game.code} />
            ))}
          </section>
        )}
      </GridColumn>
      <Categories
        onClick={handleCategoryClick}
        selectedCategories={selectedCategories}
      />
    </Grid>
  );
}
