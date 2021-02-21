import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Save from '@material-ui/icons/Save';
import Event from '@material-ui/icons/Event';
// TODO: maybe custom icons for these
import SaveLocationDialog from './MapActionDialogs/SaveLocationDialog';
import CreateEventDialog from './MapActionDialogs/CreateEventDialog';

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    alignSelf: "flex-end",
    zIndex: 1250 // puts it above the map but below any modals that pop up
  },
  speedDial: {
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(4),
  }
}));

export default function MapActions() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openSave, setOpenSave] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);


  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const saveLocation = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setOpenSave(true);
  }
  const setOpenSaveHandler = (newBool: boolean) => {
    setOpenSave(newBool);
  }
  const createEvent = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setOpenCreate(true);
  }
  const setOpenCreateHandler = (newBool: boolean) => {
    setOpenCreate(newBool);
  }

  return (
    <div className={classes.container}>
      <SpeedDial
        ariaLabel="Map Actions"
        className={classes.speedDial}
        icon={<SpeedDialIcon/>}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="up"
      >
        <SpeedDialAction
          key="save"
          icon={<Save/>}
          tooltipTitle="Save Default Location"
          tooltipPlacement="right"
          onClick={saveLocation}
        />
        <SpeedDialAction
          key="addEvent"
          icon={<Event/>}
          tooltipTitle="Create Event"
          tooltipPlacement="right"
          onClick={createEvent}
        />
      </SpeedDial>
      <SaveLocationDialog open={openSave} setOpen={setOpenSaveHandler}/>
      <CreateEventDialog open={openCreate} setOpen={setOpenCreateHandler}></CreateEventDialog>
    </div>
  );
}