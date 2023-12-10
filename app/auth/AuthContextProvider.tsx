'use client';
import { createContext, useContext, ReactNode, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useRouter } from 'next/navigation';

type PlayerData = {
  name: string;
  avatar: string;
  event: string;
};

type AuthContextProps = {
  player: PlayerData | null;
  login: (data: { player: PlayerData }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [player, setPlayer] = useLocalStorage<PlayerData | null>(
    'player',
    null,
  );
  const router = useRouter();

  const login = async (data: { player: PlayerData }) => {
    setPlayer(data.player);
    router.push('/games');
  };

  const logout = () => {
    setPlayer(null);
    router.push('/');
  };

  const memoizedContextData = useMemo(
    () => ({
      player,
      login,
      logout,
    }),
    [player],
  );

  return (
    <AuthContext.Provider value={memoizedContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
