import React, { FC, useState, useEffect } from 'react';
import { GridColumn, List, Header, Loader, ListItem } from 'semantic-ui-react';
import { getCategories } from '../api/getCategories';

type CategoryItem = {
  id: number;
  name: string;
};

interface CategoriesProps {
  onClick: (categoryId: number) => void;
  selectedCategories: number[];
}

export const Categories: FC<CategoriesProps> = ({
  onClick,
  selectedCategories,
}) => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const categories: CategoryItem[] = await getCategories();
        setCategories(categories);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <GridColumn width={4}>
      <Header as="h3" dividing>
        {' '}
        Categories
      </Header>
      {isLoading ? (
        <Loader active inline="centered" size="big" />
      ) : (
        <List selection animated>
          {categories.map(category => (
            <ListItem
              key={category.id}
              onClick={() => onClick(category.id)}
              active={selectedCategories.includes(category.id)}
            >
              {category.name}
            </ListItem>
          ))}
        </List>
      )}
    </GridColumn>
  );
};
