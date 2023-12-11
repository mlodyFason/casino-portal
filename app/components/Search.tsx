import React, { FC } from 'react';
import { GridColumn, Input } from 'semantic-ui-react';

interface SearchProps {
  onSearchChange: (value: string) => void;
}

export const Search: FC<SearchProps> = ({ onSearchChange }) => {
  return (
    <GridColumn width={4}>
      <Input
        icon={'search'}
        type="text"
        placeholder={'Search...'}
        fluid
        onChange={e => onSearchChange(e.target.value)}
      />
    </GridColumn>
  );
};
