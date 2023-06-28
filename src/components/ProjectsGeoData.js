import { useEffect } from 'react';
import { MapContainer, LayerGroup, LayersControl, Circle, Rectangle, Marker, Polygon, useMap, GeoJSON, TileLayer } from 'react-leaflet';
import "leaflet.layerscontrol-minimap";
import 'leaflet.layerscontrol-minimap/control.layers.minimap.css';
import L, { latLng } from "leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';

import data from '../data/dronefields.json';

function onEachFeature(feature, layer) {
	function readProperties(feature) {
		let text = '<b>' + "Properties" + '</b>';
		for (let [key, value] of Object.entries(feature.properties)){
			text += '<br>' + key + " : " + value;
		}
		return text;
	}

	layer.bindPopup(readProperties(feature));

    layer.on({
		mouseover: (event) => {
			event.target.setStyle({
				fillColor: "purple"
			})
		},
		mouseout: (event) => {
			event.target.setStyle({
				fillColor: "#ff7800"
			})
		}
	})
}

function GeoData({data}) {
	const map = useMap();
	
	const layer1 = L.geoJSON(data.features, {
		// pointToLayer: function (feature, latlng) {
		// 	return L.circleMarker(latlng, geojsonMarkerOptions);
		// },
		onEachFeature: onEachFeature	
	});

	const layerControl = L.control.layers(null, null, {position: 'bottomright'}).addTo(map);
	layerControl.addOverlay(layer1, data.type);
}

function ProjectsGeoData() {
	const center = [
		46.227638, 2.213749
	];

	return (
		<MapContainer center={center} zoom={5}>
			<TileLayer
                attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
			<GeoData data={data}/>			
		</MapContainer>
	);
}

export default ProjectsGeoData;