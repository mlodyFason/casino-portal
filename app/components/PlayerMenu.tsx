import React, { FC, useState, useEffect } from 'react';
import {
  GridColumn,
  List,
  ListItem,
  Image,
  Button,
  Icon,
  ListContent,
} from 'semantic-ui-react';
import { logoutUser } from '../api/logoutUser';
import { useAuth } from '../auth/AuthContextProvider';

export const PlayerMenu: FC = ({}) => {
  const auth = useAuth();
  const { player } = auth;
  const handleLogout = async () => {
    const username = player?.name.split(' ')[0].toLowerCase();
    const success = await logoutUser(username!);

    if (success) auth.logout();
  };

  // used to remove hydration errors
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <GridColumn width={12}>
      <List>
        <ListItem>
          {mounted && (
            <>
              <Image className="avatar" src={player?.avatar} alt="avatar" />
              <ListContent>
                <List.Header>{player?.name}</List.Header>
                <span>{player?.event}</span>
              </ListContent>
            </>
          )}
        </ListItem>
      </List>
      <Button onClick={handleLogout}>
        <Icon name="chevron left" /> Log Out
      </Button>
    </GridColumn>
  );
};
