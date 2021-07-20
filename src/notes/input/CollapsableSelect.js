import { CardHeader, Collapse, makeStyles, MenuItem } from "@material-ui/core";
import { Select } from "mui-rff";
import { PEOPLE } from "../../shared/constants";

const useStyles = makeStyles({
  header: {
    padding: "16px 0px 0px 0px",
  },
  avatar: {
    width: '100%',
  }
});

const data = {
  [PEOPLE.NONE]: 'None',
  [PEOPLE.ALMA]: 'Alma',
  [PEOPLE.ALOJZ]: 'Alojz',
};

const SelectComponent = <Select
  multiline
  name="owner"
  label={"Owner"}
>
  {Object.entries(data).map(([key, value], index) => (
    <MenuItem
      key={index + key}
      value={key}>{value}
    </MenuItem>
  ))}
</Select>

export interface Props {
  formIsOpen: boolean,
}

export const CollapsableSelect = ({ formIsOpen }: Props) => {
  const classes = useStyles();

  return (
    <Collapse in={formIsOpen}>
      <CardHeader className={classes.header} classes={{ avatar: classes.avatar }} avatar={SelectComponent}/>
    </Collapse>
  );
}