import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
    var layer = {};
    const getPixel = async (x, y) => {
        let response = await fetch(
            `/api/raster/pixel/-${x}/${y}?layers=a=36&formula=a`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        var success = response.ok;
        response.json().then((res) => {
            if (success) {
                console.log(res);
            }
        });
    };
    const get_raster_pixel = async (layer, lat, lon, zoom) => {
        let response = await fetch(
            `/api/raster/pixel?layer=${layer}&lat=${lat}&long=${lon}&zoom=${zoom}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        var success = response.ok;
        response.json().then((res) => {
            if (success) {
                console.log(res);
            }
        });
    };
    useEffect(() => {
        // Create a map instance
        const map = L.map("map", { maxZoom: 20 }).setView(
            [43.51454003042543, 2.1007617041350763],
            14
        );
        L.tileLayer(
            "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
        ).addTo(map);
        // Add TMS tile layer to the map
        layer = L.tileLayer(
            `http://127.0.0.1:8000/api/raster/tiles/15/{z}/{x}/{y}.png`,
            {}
        );
        layer.addTo(map);
        map.on("click", function(e) {
            var lat = e.latlng.lat;
            var lon = e.latlng.lng;
            get_raster_pixel(3, lat, lon, map.getZoom());
        });
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
