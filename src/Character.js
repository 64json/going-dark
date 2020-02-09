import React from 'react';
import './Character.scss';
import { classes } from './utils';

function Character({ className, user, style }) {
  const movingThreshold = .05;
  const moving = user.delta.magnitude > movingThreshold;
  let direction;
  if (Math.abs(user.delta.x) > Math.abs(user.delta.y)) {
    direction = user.delta.x < 0 ? 'top' : 'bottom';
  } else {
    direction = user.delta.y < 0 ? 'left' : 'right';
  }
  return (
    <div className={classes('Character', `team_${user.teamId}`, moving && 'moving', direction, className)}
         style={style}>
      <div className={classes('holding', user.hasKey ? 'key' : 'lamp')}/>
    </div>
  );
}

export default Character;