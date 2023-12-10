import React, { FC } from 'react';
import { GridColumn, Input } from 'semantic-ui-react';

export const Search: FC = () => {
  return (
    <GridColumn width={4}>
      <Input icon={'search'} type="text" placeholder={'Search...'} fluid />
    </GridColumn>
  );
};
