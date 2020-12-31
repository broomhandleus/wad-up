import React from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import { Layer, LeafletMouseEventHandlerFn } from 'leaflet';
import { Feature, Geometry } from 'geojson';
import { debounce } from 'lodash';


// need to define an interface for the props if we use it
interface props {
  states: any,
  eventMarkers: JSX.Element[],
  getEvents: Function
}

export default function MapDetails(props: props) {
  const states = props.states;
  const eventMarkers = props.eventMarkers;
  const getEvents = props.getEvents;
  // Hook to grab the Leaflet Map instance. Can be done on any children of MapContainer
  const map = useMap();

  // Send new bounds to get new events whenever the map is moved
  // Map.on caused this event to double each time... very odd
  map.once('moveend', debounce(() => {
    getEvents(map.getBounds());
  }, 2000, { 'leading': true, 'trailing': false }));

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