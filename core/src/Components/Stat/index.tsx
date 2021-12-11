import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import CountUp from 'react-countup';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import { IconSource } from '../../constants';
import { Color, Icon } from '../../types';
import { buildIcon } from '../StoriesAPI/Story/utils/icon';
import useStyles from './useStyles';

export enum StatType {
  list = 'list',
  number = 'number',
  string = 'string',
}

export interface StatNumberValue {
  amount: number;
  unit?: string;
}

export interface StatListValueItem {
  description?: string;
  icon?: Icon;
  label: string;
}

export interface StatProps {
  color: Color;
  description?: string;
  icon?: Icon;
  image?: string;
  label: string;
  type: StatType;
  url?: string;
  value: string | StatListValueItem[] | StatNumberValue;
}

export interface StatValueProps {
  classes: {
    list: string;
    listAvatar: string;
    listAvatarContainer: string;
    listItem: string;
    number: string;
    numberContainer: string;
    string: string;
    unit: string;
  };
  type: StatProps['type'];
  value: StatProps['value'];
}

export interface StatListItemAvatarProps {
  className: string;
  label: string;
  icon: Icon | undefined;
}

const countDecimals = (value: number) => {
  if (Math.floor(value) === value) return 0;
  return value.toString().split('.')[1].length || 0;
};

const StatListItemAvatar = ({ className, label, icon }: StatListItemAvatarProps) => {
  if (icon && icon.source === IconSource.Image) {
    return (
      <Avatar
        alt={label}
        className={className}
        src={icon.url}
      />
    );
  }
  return (
    <Avatar className={className}>
      {icon ? buildIcon(icon) : label[0].toUpperCase()}
    </Avatar>
  );
};

const StatValue = ({ classes, type, value }: StatValueProps) => {
  const isArray = Array.isArray(value);
  if (type === StatType.number && typeof value === 'object' && !isArray) {
    return (
      <div className={classes.numberContainer}>
        <Typography
          className={classes.number}
          variant="h3"
        >
          <CountUp
            decimals={countDecimals(value.amount)}
            delay={0.5}
            duration={Math.random() * 3}
            end={value.amount}
          />
        </Typography>
        {value.unit && (
          <Typography
            className={classes.unit}
            color="textSecondary"
            variant="body2"
          >
            {value.unit}
          </Typography>
        )}
      </div>
    );
  }
  const isList = type === StatType.list && isArray;
  const avatarCtrClass = (index: number) => {
    const base = classes.listAvatarContainer;
    if (isList && index === (value.length - 1)) {
      return `${base} last-item`;
    }
    return base;
  };
  return isList ? (
    <List className={classes.list}>
      {value.map(({ description, icon, label }, index) => (
        <ListItem
          alignItems="flex-start"
          className={classes.listItem}
          key={label}
        >
          <ListItemAvatar className={avatarCtrClass(index)}>
            <StatListItemAvatar
              className={classes.listAvatar}
              icon={icon}
              label={label}
            />
          </ListItemAvatar>
          <ListItemText
            primary={label}
            secondary={description}
          />
        </ListItem>
      ))}
    </List>
  ) : (
    <div className={classes.string}>
      {value}
    </div>
  );
};

const Stat = ({
  color,
  description,
  icon: iconData,
  image,
  label,
  type,
  url,
  value,
}: StatProps) => {
  const icon = iconData && buildIcon(iconData);
  const classes = useStyles({ accentColor: color.background });
  const hasAdditionalData = !!(image || description || url);
  return (
    <Card
      className={classes.root}
      raised
    >
      {icon && (
        <div className={classes.icon}>
          {icon}
        </div>
      )}
      <div className={classes.labelContainer}>
        <Typography
          className={classes.label}
          variant="overline"
        >
          {label}
        </Typography>
      </div>
      <CardContent className={classes.content}>
        <StatValue
          classes={classes}
          type={type}
          value={value}
        />
        {hasAdditionalData && (
          <Divider variant="middle" />
        )}
        {image && (
          <CardMedia
            component="img"
            image={image}
            title={label}
          />
        )}
        <Typography
          color="textSecondary"
          variant="caption"
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        {url && (
          <Button
            className={classes.button}
            color="primary"
            href={url}
            size="small"
            target="_blank"
            startIcon={(
              <AiOutlineInfoCircle />
            )}
            variant="text"
          >
            Learn More
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Stat;
