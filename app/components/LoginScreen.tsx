import React, { FC, useState } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import { useAuth } from '../auth/AuthContextProvider';
import { loginUser } from '../api/loginUser';

export interface LoginFormData {
  username: string;
  password: string;
}

export const LoginScreen: FC = ({}) => {
  const auth = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = await loginUser(formData);
      auth.login(userData);
    } catch (error: unknown) {
      console.error(error);
    }
  };
  return (
    <Grid centered columns={4} doubling className="bg-white">
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
                  <input
                    type="submit"
                    value="Login"
                    className="cursor-pointer"
                  />
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
