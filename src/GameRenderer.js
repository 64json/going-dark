import React, { useEffect, useRef, useState } from 'react';
import { classes } from './utils';
import Character from './Character';
import { Pos } from './beans';
import {
  BORDER_BOTTOM,
  BORDER_BOTTOM_LEFT,
  BORDER_BOTTOM_RIGHT,
  BORDER_LEFT,
  BORDER_RIGHT,
  BORDER_TOP,
  BORDER_TOP_LEFT,
  BORDER_TOP_RIGHT,
  DIVIDER,
  JAIL,
  KEY,
  ROCK0,
  ROCK1,
  ROCK2,
  TOWER,
  TREE,
} from './blocks';
import './GameRenderer.scss';

const obstacles = [ROCK0, ROCK1, ROCK2, TREE, JAIL,
  BORDER_TOP,
  BORDER_BOTTOM,
  BORDER_LEFT,
  BORDER_RIGHT,
  BORDER_TOP_LEFT,
  BORDER_TOP_RIGHT,
  BORDER_BOTTOM_LEFT,
  BORDER_BOTTOM_RIGHT];
const FPS = 30;

export function GameRenderer({ game }) {
  const { me, map, teams } = game;
  const [frame, setFrame] = useState(0);
  const reversed = me.teamId === 0;

  useEffect(() => {
    const onKeyDown = e => {
      e.preventDefault();
      let dx = 0;
      let dy = 0;
      switch (e.key) {
        case 'ArrowDown':
          dx++;
          break;
        case 'ArrowUp':
          dx--;
          break;
        case 'ArrowLeft':
          dy--;
          break;
        case 'ArrowRight':
          dy++;
          break;
        default:
      }
      dx /= 1;
      dy /= 1;
      if (reversed) {
        dx *= -1;
        dy *= -1;
      }
      me.delta = new Pos(dx, dy);
    };

    const onKeyUp = e => {
      me.delta = new Pos(0, 0);
    };

    const onTilt = e => {
      const beta = e.beta;
      const gamma = e.gamma;
      let dx = -gamma / 360;
      let dy = beta / 360;
      if (reversed) {
        dx *= -1;
        dy *= -1;
      }
      me.delta = new Pos(dx, dy);
    };

    const onResize = () => {
      game._window.resize();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    window.addEventListener('resize', onResize);
    window.addEventListener('deviceorientation', onTilt, true);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('deviceorientation', onTilt);
    };
  }, [game._window, me]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFrame(Math.random());
    }, 1000 / FPS);
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (me.isScanning) {
      const aimingAngle = me.angle;
      let currentAngle = teams[me.pos.teamId].scanAngle;
      const unit = Math.PI / 300;
      const delta = aimingAngle - currentAngle;
      const magnitude = Math.abs(delta);
      if (magnitude === 0) return;
      if (magnitude > Math.PI) {
        currentAngle -= delta / magnitude * unit;
      } else {
        currentAngle += delta / magnitude * unit;
      }
      currentAngle %= Math.PI * 2;
      teams[me.pos.teamId].scanAngle = currentAngle;
    } else {
      const currentPos = me.pos;
      const nextPos = me.nextPos;
      const myObstacles = [...obstacles];
      if (me.hasOwnKey) {
        myObstacles.push(DIVIDER);
      }
      if (myObstacles.some(obstacle => map.has(new Pos(nextPos.x, currentPos.y), obstacle))) {
        nextPos.x = currentPos.x;
      }
      if (myObstacles.some(obstacle => map.has(new Pos(currentPos.x, nextPos.y), obstacle))) {
        nextPos.y = currentPos.y;
      }
      let stop = false;
      const [offsetI, offsetJ] = crop.indices;
      const offset = new Pos(offsetI, offsetJ);
      croppedMap.forEach((row, i) => {
        row.forEach((flag, j) => {
          const blockPos = offset.plus(new Pos(i, j));
          if ((flag & TOWER) > 0 && blockPos.distanceTo(nextPos) < 2) {
            me.isScanning = true;
            stop = true;
          }
        });
      });
      if (!stop) {
        me.pos = nextPos;
        if (me.hasStolenKey && me.teamId === me.pos.teamId) {
          me.hasStolenKey = false;
          teams[me.teamId].achievedKeyCount++;
        }
        if (me.isOurBase(me.pos)) {
          const caughtEnemy = game.enemies.find(enemy => enemy.pos.distanceTo(me.pos) < 1);
          if (caughtEnemy) {
            if (caughtEnemy.hasStolenKey) {
              map.add(caughtEnemy.pos, KEY);
              caughtEnemy.hasStolenKey = false;
            }
            caughtEnemy.pos = game.getJailPos(me.teamId);
          }
        }
      }
    }
  }, [frame]);

  const pad = 6;
  const crop = me.pos.minus(game.window.center).minus(new Pos(pad, pad));
  const croppedMap = map.crop(crop, game.window.height + pad * 2, game.window.width + pad * 2);
  const offsetX = (Math.round(crop.x) - crop.x) - pad;
  const offsetY = (Math.round(crop.y) - crop.y) - pad;

  const minimapRef = useRef(null);
  const canvas = minimapRef.current;
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const attrMap = {
      [TOWER]: ['#ffe300', 2],
      [JAIL]: ['#606060', 1],
      [DIVIDER]: ['#808080', 1],
      [KEY]: ['#ff6600', 1],
    };
    const blocks = Object.keys(attrMap);
    map.forEach((row, i) => {
      row.forEach((flag, j) => {
        const block = blocks.find(block => (block & flag) > 0);
        if (block === KEY.toString() && !me.isOurBase(new Pos(i, j))) {
          return;
        }
        if (block in attrMap) {
          const [color, size] = attrMap[block];
          ctx.fillStyle = color;
          ctx.fillRect(j - size, i - size, size * 2 + 1, size * 2 + 1);
        }
      });
    });

    game.allies.forEach(user => {
      ctx.fillStyle = user.teamId === me.teamId ? '#00FF00' : '#FF0000';
      ctx.fillRect(user.pos.y - 1, user.pos.x - 1, 3, 3);
    });

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(me.pos.y - 1, me.pos.x - 1, 3, 3);

    ctx.strokeStyle = '#FFFFFF';
    ctx.strokeRect(me.pos.y - game.window.center.y - 1, me.pos.x - game.window.center.x - 1, game.window.width + 2, game.window.height + 2);
  }


  return (
    <div className="GameRenderer"
         onTouchStart={() => me.isFlashing = true} onTouchEnd={() => me.isFlashing = false}
         onMouseDown={() => me.isFlashing = true} onMouseUp={() => me.isFlashing = false}
         onClick={() => {
           const closeImprisonedAllies = game.allies.filter(ally => ally.isInJail() && ally.pos.distanceTo(me.pos) < 5);
           if (me.isScanning) {
             me.isScanning = false;
           } else if (me.hasOwnKey) {
             map.add(me.pos, KEY);
             me.hasOwnKey = false;
           } else if (closeImprisonedAllies.length > 0) {
             closeImprisonedAllies.forEach((ally, i) => {
               ally.pos = game.getSpawnPos(me.teamId, i);
             });
           } else if (!me.hasStolenKey) {
             croppedMap.forEach((row, i) => {
               row.forEach((flag, j) => {
                 const pos = new Pos(crop.x + i, crop.y + j);
                 if ((flag & KEY) > 0 && me.pos.distanceTo(pos) < 1 && pos.teamId !== me.teamId) {
                   map.remove(pos, KEY);
                   me.hasStolenKey = true;
                 }
               });
             });
           }
         }}>
      <div className={classes('grid', me.isScanning && 'scan')}>
        {
          croppedMap.map((row, i) => (
            <div className="row" key={i} style={{
              [reversed ? 'bottom' : 'top']: `calc(${i + offsetX} * ${game.window.gridSize})`,
            }}>
              {
                row.map((flag, j) => {
                  const blocks = ['divider', 'rock0', 'rock1', 'rock2', 'tree', 'tower', 'jail', 'key',
                    reversed ? 'border_bottom' : 'border_top',
                    reversed ? 'border_top' : 'border_bottom',
                    reversed ? 'border_right' : 'border_left',
                    reversed ? 'border_left' : 'border_right',
                    reversed ? 'border_bottom_right' : 'border_top_left',
                    reversed ? 'border_bottom_left' : 'border_top_right',
                    reversed ? 'border_top_right' : 'border_bottom_left',
                    reversed ? 'border_top_left' : 'border_bottom_right']
                    .filter((_, k) => (flag & (1 << k)) > 0);
                  return blocks.length > 0 && (
                    <div className="col" key={j} style={{
                      [reversed ? 'right' : 'left']: `calc(${j + offsetY} * ${game.window.gridSize}${me.isScanning ? ' + (100vh - 100vw) / 2' : ''})`,
                    }}>
                      {
                        blocks.map(block => (
                          <div key={block} className={classes('block', block)} style={{
                            zIndex: ['divider', 'key'].includes(block) ? 0 : (crop.indices[0] + i) * (reversed ? -1 : 1) + game.map.height * 2,
                          }}>
                          </div>
                        ))
                      }
                    </div>
                  );
                })
              }
            </div>
          ))
        }
      </div>
      {
        game.users.map((user, i) => (
          <Character key={i} className="character" user={user} style={{
            zIndex: user.pos.indices[0] * (reversed ? -1 : 1) + game.map.height * 2,
            [reversed ? 'bottom' : 'top']: `calc(${(user.pos.x - me.pos.x) + game.window.center.x} * ${game.window.gridSize})`,
            [reversed ? 'right' : 'left']: `calc(${(user.pos.y - me.pos.y) + game.window.center.y} * ${game.window.gridSize}${me.isScanning ? ' + (100vh - 100vw) / 2' : ''})`,
          }} reversed={reversed}/>
        ))
      }
      {
        !me.isScanning &&
        <div className={classes('illumination', me.isFlashing && 'flash')} style={{
          marginTop: `calc(${game.window.center.x} * ${game.window.gridSize})`,
          marginLeft: `calc(${game.window.center.y} * ${game.window.gridSize})`,
        }}/>
      }
      {
        me.isScanning &&
        <div className="spotlight" style={{
          transform: `rotate(${teams[me.pos.teamId].scanAngle / Math.PI * 180}deg)`,
        }}/>
      }
      {
        !me.isScanning &&
        <div className={classes('minimap', reversed && 'reversed')}>
          <canvas ref={minimapRef} className="canvas" height={map.height} width={map.width}/>
        </div>
      }
      {
        !me.isScanning &&
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress enemy" style={{
              width: `${game.getProgress(1 - me.teamId) * 100}%`,
            }}/>
          </div>
          <div className="progress-bar">
            <div className="progress ally" style={{
              width: `${game.getProgress(me.teamId) * 100}%`,
            }}/>
          </div>
        </div>
      }
      {
        game.done && (
          game.win ? (
            <div className="done win"/>
          ) : (
            <div className="done lose"/>
          )
        )
      }
    </div>
  );
}