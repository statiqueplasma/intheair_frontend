import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
    var layer = {};
    fetch("/api/rasterdata/2");
    let x = { project_file: "2", raster: "21" };
    useEffect(() => {
        // Create a map instance
        const map = L.map("map", { minZoom: 11, maxZoom: 18 }).setView(
            [43.51668853502907, 2.08740234375],
            14
        );
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}", {
            foo: "bar",
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
        // Add TMS tile layer to the map
        layer = L.tileLayer(
            `http://127.0.0.1:8000/api/raster/tiles/5/{z}/{x}/{y}.png`
        );
        layer.addTo(map);

        return () => {
            // Clean up the map when the component is unmounted
            map.remove();
        };
    }, []);

    return (
        <div
            id="map"
            style={{ height: "900px", width: "80%", margin: "auto" }}
        />
    );
};

export default Map;
