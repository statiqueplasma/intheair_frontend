import { MapContainer, useMap, TileLayer } from 'react-leaflet';
import "leaflet.layerscontrol-minimap";
import 'leaflet.layerscontrol-minimap/control.layers.minimap.css';
import L from "leaflet";
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';

import drones from '../../data/dronefields.json'; //TODO : à inclure dynamique (via le backend ?)
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
//import drones from '../data/dronefields2.json'; //TODO : inclure la deuxième carte des restrictions UAS depuis API Géoportail

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
				fillColor: "red"
			})
		},
		mouseout: (event) => {
			event.target.setStyle({
				fillColor: "blue"
			})
		}
	})
}

function GeoData({ projects }) {
	const map = useMap();
	
	const dronesLayer = L.geoJSON(drones.features, {
		onEachFeature: onEachFeature,
		fillColor: "blue"
	});

	const layerControl1 = L.control.layers(null, null, {position: 'bottomright'}).addTo(map);
	layerControl1.addOverlay(dronesLayer, drones.type);
	// const layerControl2 = L.control.layers(null, null, {position: 'bottomright'}).addTo(map);
	// layerControl.addOverlay(layer2, data2.type);
}

function ProjectsMap() {
	const center = [46.227638, 2.213749];
	const { user } = useAuth();
	const [projects, setProjects] = useState(null);

	//* On suppose que la projectList aura cette tête :
	//const projectList = [1, 2, 3, 4];

	//* Au chargement du composant, on fait un call API pour récupérer les infos de chaque projet (fonction créée par Haitam dans DataContext) :
	useEffect(() => {
		// fetchUserProjects(user).then((data) => {
		// 	setProjects(data)});
	}, [])
	//* On suppose que ce call API retourne une liste des id des projets du client (il faudra faire d'autres call API pour récupérer chaque projet individuellement)

	return (
		<MapContainer center={center} zoom={5}>
			<TileLayer
			attribution= '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			url='https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'
            />
			<GeoData projects={projects}/>
		</MapContainer>
	);
}

export default ProjectsMap;