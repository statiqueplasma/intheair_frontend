import { useEffect } from 'react';
import { MapContainer, LayerGroup, LayersControl, Circle, Rectangle, Marker, Polygon, useMap, GeoJSON } from 'react-leaflet';
import "leaflet.layerscontrol-minimap";
import 'leaflet.layerscontrol-minimap/control.layers.minimap.css';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';

import sample from '../data/sample4.json';
import markerImage from '../images/marker_rouge.png';

//import "leaflet-side-by-side"; //TODO: for later
import "../styles/GeoData.css";

function MapControl() {
	const map = useMap();

	const classicOSM = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	});

	classicOSM.addTo(map);

	const stamenLayer = L.tileLayer(
	"https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png",
	{
		attribution:
		'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' +
		'<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' +
		`Map data ${classicOSM.getAttribution()}`,
		minZoom: 1,
		maxZoom: 16
	});

	const baseMaps = {
		'OpenStreetMaps': classicOSM,
		'Stamen': stamenLayer
	};

	useEffect(() => {
		L.control.layers.minimap(baseMaps).addTo(map);
	}, [map])

	return;
}

function TestGeoData() {
	const center = [0.328620478699496, 47.2502610398728];
	const geojsonMarker = {radius: 8};
	const icon = L.icon({
		iconUrl: markerImage,
		iconSize: [38, 95]
	});

	return (
		<MapContainer center={center} zoom={3}>
			<MapControl/>

			<LayersControl position="topright">					
				<LayersControl.Overlay name="uk">
					<LayerGroup>
						<GeoJSON markerIcon={icon} data={sample.features}/>	
					</LayerGroup>
				</LayersControl.Overlay>
			</LayersControl>

            
			
		</MapContainer>
	);
}

export default TestGeoData;
