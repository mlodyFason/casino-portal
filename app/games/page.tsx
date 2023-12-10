'use client';
import { useAuth } from '../auth/AuthContextProvider';

export default function GamesPage() {
  const auth = useAuth();
  const { player } = auth;

  const handleLogout = async () => {
    try {
      const username = player?.name?.split(' ')[0].toLowerCase();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/logout`,
        {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
          }),
        },
      );

      if (!response.ok) return;

      auth.logout();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}
