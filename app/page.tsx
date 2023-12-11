'use client';
import { useAuth } from './auth/AuthContextProvider';
import { useRouter } from 'next/navigation';
import { LoginScreen } from './components/LoginScreen';
import { useEffect } from 'react';

export default function Home() {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.player) {
      router.push('/games');
    }
  }, [auth.player, router]);

  return <LoginScreen />;
}
