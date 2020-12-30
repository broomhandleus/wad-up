import React from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import { Layer, LeafletMouseEventHandlerFn } from 'leaflet';
import { Feature, Geometry } from 'geojson';


// need to define an interface for the props if we use it
interface props {
  states: any,
  eventMarkers: JSX.Element[]
}

export default function MapDetails(props: props) {
  const states = props.states;
  const eventMarkers = props.eventMarkers;
  const map = useMap();

  // Adds the ability to zoom to each state area when clicked
  const zoomToFeature: LeafletMouseEventHandlerFn = (e) => {
    const bounds = e.target._bounds;
    map.fitBounds(bounds);
  }
  const onEachFeature = (feature: Feature<Geometry, any>, layer: Layer) => {
    layer.on({
      click: zoomToFeature
    });
  }

  // Styling GeoJSON requires a function according to leaflet docs - https://leafletjs.com/reference-1.7.1.html#geojson
  // so use this method if we want to style it in the future
  // const stateStyle = () => {
  //   return {
  //     fillColor: 'blue',
  //     color: 'blue'
  //   }
  // }

  return (
    <div>
      <GeoJSON data={states} onEachFeature={onEachFeature}></GeoJSON>
      {eventMarkers}
    </div>
  );
}