import React, { FC } from 'react';
import {
  Card,
  Header,
  Item,
  Button,
  Icon,
  ItemImage,
  ItemContent,
  CardDescription,
  Divider,
} from 'semantic-ui-react';
import Link from 'next/link';
import { CasinoGame } from '../games/page';

type GameCardProps = Omit<CasinoGame, 'categoryIds'>;

export const GameCard: FC<GameCardProps> = ({
  name,
  description,
  code,
  icon,
}) => {
  return (
    <Card fluid className="!shadow-none">
      <Item className="flex p-4 flex-wrap md:flex-nowrap game-launch">
        <ItemImage
          src={icon}
          alt="game-icon"
          size="medium"
          className="flex-[1_1_100%] min-w-[230px] md:m-4"
        />
        <ItemContent>
          <Header>{name}</Header>
          <CardDescription className="mb-4">{description}</CardDescription>
          <div>
            <Link href={`/games/${code}`}>
              <Button
                className="play"
                floated="right"
                secondary={true}
                inverted={true}
                type="button"
                onClick={() => {}}
              >
                Play
                <Icon name="chevron right" />
              </Button>
            </Link>
          </div>
        </ItemContent>
      </Item>
      <Divider />
    </Card>
  );
};
