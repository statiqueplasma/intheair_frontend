import { useEffect } from 'react';
import { MapContainer, useMap } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import "leaflet.layerscontrol-minimap";
import 'leaflet.layerscontrol-minimap/control.layers.minimap.css';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';

import data from '../../data/sample4.json';

import "../../styles/GeoData.css";

function MapControl() {
	const map = useMap();

	const OpenStreetMap_France = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
		maxZoom: 20,
		attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	});

	OpenStreetMap_France.addTo(map);

	const OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
		maxZoom: 17,
		attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
	});

	// const Thunderforest_Landscape = L.tileLayer('https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey={apikey}', {
	// 	attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	// 	apikey: '<your apikey>',
	// 	maxZoom: 22
	// });

	const baseMaps = {
		'OpenStreetMaps France': OpenStreetMap_France,
		'Topographie': OpenTopoMap,
		// 'Terrains': Thunderforest_Landscape
	};
	
	useEffect(() => {
		L.control.layers.minimap(baseMaps).addTo(map);
	}, [map])

	return;
}

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
};

function GeoData({data}) {
	const map = useMap();

	const geojsonMarkerOptions = {
		radius: 8,
		fillColor: "#ff7800",
		color: "#000",
		weight: 1,
		opacity: 1,
		fillOpacity: 0.3
	};
	
	const layer1 = L.geoJSON(data.features, {
		pointToLayer: function (feature, latlng) {
			return L.circleMarker(latlng, geojsonMarkerOptions);
		},
		onEachFeature: onEachFeature	
	});

	const layer2 = L.tileLayer(
		`http://127.0.0.1:8000/api/raster/tiles/21/{z}/{x}/{y}.png`
	);

	const layerControl = L.control.layers(null, null, {position: 'bottomright'}).addTo(map);
	layerControl.addOverlay(layer1, data.type);
	layerControl.addOverlay(layer2);

	map.on('click', function(e) {
		L.popup(e.latlng, {
			content: '<b>' + "Properties" + '</b>' + '<br>' + `lat: ${e.latlng.lat}` + '<br>' + `lng: ${e.latlng.lng}`
		}).openOn(map);
	});
}

function Project() {
	const { id } = useParams();

	const center = [
		43.51668853502907, 2.08740234375
	];

	return (
		<>
			<h1>Projet n°{id}</h1>
			<MapContainer center={center} zoom={14}>
				<MapControl/>
				<GeoData data={data}/>			
			</MapContainer>
		</>
	);
}

export default Project;
