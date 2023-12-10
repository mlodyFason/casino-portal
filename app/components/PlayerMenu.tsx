import React, { FC } from 'react';
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

interface PlayerMenuProps {
  avatar: string;
  name: string;
  event: string;
  logout: () => void;
}

export const PlayerMenu: FC<PlayerMenuProps> = ({
  avatar,
  name,
  event,
  logout,
}) => {
  const handleLogout = async () => {
    const username = name?.split(' ')[0].toLowerCase();
    const success = await logoutUser(username);

    if (success) logout();
  };

  return (
    <GridColumn width={12}>
      <List>
        <ListItem>
          <Image className="avatar" src={avatar} alt="avatar" />
          <ListContent>
            <List.Header>{name}</List.Header>
            <span>{event}</span>
          </ListContent>
        </ListItem>
      </List>
      <Button onClick={handleLogout}>
        <Icon name="chevron left" /> Log Out
      </Button>
    </GridColumn>
  );
};
