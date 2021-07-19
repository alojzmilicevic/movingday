import React from 'react';
import { IconButton, makeStyles, Tooltip } from "@material-ui/core";
import Done from '@material-ui/icons/Done';
import { ROOM_STRINGS } from "./constants";

const useStyles = makeStyles({
  root: { flex: 1, margin: -11 },
  shape: {
    borderRadius: '50%',
    width: 24,
    height: 24,
    border: '1px solid rgba(0, 0, 0, 0.2)',
    "&:hover": {
      border: '1px solid rgba(0, 0, 0, 0.8)',
    }
  },
  icon: { width: 20, color: 'rgba(0, 0, 0, 0.6)' },
  button: { padding: 0, marginRight: 8 }
});

const Check = () => {
  const classes = useStyles();
  return <Done className={classes.icon}/>;
}

export const ColorPicker = ({ color, setColor }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}> {
      Object.keys(ROOM_STRINGS).map((cur, index) => (
          <Tooltip
            key={cur + index}
            title={ROOM_STRINGS[cur]}>
            <IconButton onClick={() => setColor(cur)} className={classes.button}>
              <div style={{ backgroundColor: cur }} className={classes.shape}>
                {color === cur ? <Check/> : null}
              </div>
            </IconButton>
          </Tooltip>
        )
      )
    }
    </div>
  )
}