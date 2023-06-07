import "../styles/GeoData.css"
import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-side-by-side";
import data from '../data/sample4.json';
import { MapContainer, useMap } from "react-leaflet";

function Split() {
	const map = useMap();
	const [sideBySide, setSidebySide] = useState(null);

	const geojsonMarkerOptions = {
		radius: 8,
		fillColor: "#ff7800",
		color: "#000",
		weight: 1,
		opacity: 1,
		fillOpacity: 0.3
	};

	useEffect(() => {

		const osmLayer = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
		  attribution:
			'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);
	
		const stamenLayer = L.tileLayer(
		  "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png",
		  {
			attribution:
			  'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' +
			  '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' +
			  "Map data {attribution.OpenStreetMap}",
		  }
		).addTo(map);

		const layer1 = L.geoJSON(data.features, {
			pointToLayer: function (feature, latlng) {
				return L.circleMarker(latlng, geojsonMarkerOptions);
			},	
		}).addTo(map)

		// const group = L.layerGroup([stamenLayer, layer1]);
		// group.addTo(map);
	
		const sideBySide = L.control.sideBySide(stamenLayer, osmLayer).addTo(map);
		setSidebySide(sideBySide);
	}, [map]);
}

export default function SplitMap() {
	const position = [46.227638, 2.213749];
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (loading) {setLoading(false)}
	})
	return (
		<MapContainer center={position} zoom={5}>
			{!loading && (<Split/>)}
		</MapContainer>
	);
	
}
