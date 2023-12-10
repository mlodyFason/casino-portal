'use client';
import { useAuth } from './auth/AuthContextProvider';
import { useRouter } from 'next/navigation';
import { LoginScreen } from './components/LoginScreen';

export default function Home() {
  const auth = useAuth();
  const router = useRouter();

  if (auth.player) {
    router.push('/games');
  } else {
    return <LoginScreen />;
  }
}
