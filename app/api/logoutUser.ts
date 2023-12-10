export const logoutUser = async (username: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/logout`,
      {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      },
    );

    if (!response.ok) throw new Error('Logout failed');

    return true;
  } catch (error) {
    console.error('Error during logout', error);
    return false;
  }
};
