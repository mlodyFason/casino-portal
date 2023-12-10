import React, { FC, useState } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import { useAuth } from '../auth/AuthContextProvider';

interface LoginScreenProps {}

interface FormData {
  username: string;
  password: string;
}

export const LoginScreen: FC<LoginScreenProps> = ({}) => {
  const auth = useAuth();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        const userData = await response.json();
        auth.login(userData);
      } else {
        console.error('Nieudane logowanie');
      }
    } catch (error) {
      console.error('Wystąpił błąd podczas logowania', error);
    }
  };
  return (
    <Grid centered columns={4} doubling>
      <GridColumn as={'section'}>
        <form className="ui form" method="post" onSubmit={handleSubmit}>
          <fieldset>
            <div className="flex flex-col items-center">
              <div className="required field">
                <div className="ui icon input">
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  <i className="user icon"></i>
                </div>
              </div>
              <div className="required field">
                <div className="ui icon input">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <i className="lock icon"></i>
                </div>
              </div>
              <div className="field">
                <div className="ui icon input">
                  <input type="submit" value="Login" />
                  <i className="right chevron icon"></i>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </GridColumn>
    </Grid>
  );
};
