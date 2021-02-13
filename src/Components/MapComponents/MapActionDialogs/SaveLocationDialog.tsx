import React from 'react';
import { useMap } from 'react-leaflet';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';

interface props {
  open: boolean,
  setOpen: Function
}

export default function SaveLocationDialog(props: props) {
  const map = useMap();

  const saveLocation = () => {
    // TODO: make API call to save location to the user. Use spinny wheel on save button until i get success response
    console.log("Use map state to save default location to user");
    console.log("Map Bounds: " + JSON.stringify(map.getBounds()));
    console.log("Map Center: " + map.getCenter());
    console.log("Map Zoom: " + map.getZoom());
    props.setOpen(false);
  }

  return (
    <Dialog open={props.open} onClose={() => props.setOpen(false)}>
      <DialogTitle>Save Current Location?</DialogTitle>
      <DialogContent>
        By clicking save, your current map location and zoom level will be saved to your account. So, whenever you open
        Wad-up, you will automatically be zoomed into this location. If you wish to change this in the future, you can
        either remove your saved location from the profile menu or just save a new location through this same process.
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={saveLocation} color="primary">
          Save
        </Button>
        <Button variant="outlined" onClick={() => props.setOpen(false)} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}