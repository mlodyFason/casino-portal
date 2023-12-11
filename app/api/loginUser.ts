import { LoginFormData } from '../components/LoginScreen';
import { addHeaders, fetchData } from './fetcher';

export const loginUser = async (formData: LoginFormData) => {
  try {
    const data = await fetchData('login', {
      method: 'POST',
      headers: addHeaders(),
      body: JSON.stringify(formData),
    });

    return data;
  } catch (error) {
    console.error('Error during login', error);
    alert('Invalid username or password');
    throw error;
  }
};
