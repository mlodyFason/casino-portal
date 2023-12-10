import { LoginFormData } from '../components/LoginScreen';
export const loginUser = async (formData: LoginFormData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      },
    );

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    throw new Error('Error occurred while logging in');
  }
};
