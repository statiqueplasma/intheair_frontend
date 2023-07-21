import L, { divIcon } from "leaflet";
import { GeoJSON } from "react-leaflet";
import { useEffect, useState, useF } from "react";
import { useMap, TileLayer } from "react-leaflet";

async function get_raster_pixel(layer, lat, lon, zoom) {
    let response = await fetch(
        `/api/raster/pixel?layer=${layer}&lat=${lat}&long=${lon}&zoom=${zoom}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    if (response.status === 200) return await response.json();
    else return null;
}

const TileLayerViewer = ({ layer }) => {
    const [display, setDisplay] = useState(true);
    const map = useMap();
    useEffect(() => {
        setDisplay(false);
        setDisplay(true);
    }, [layer]);
    useEffect(() => {
        if (!display) {
            setDisplay(true);
        }
    }, [display]);

    const RasterClick = (e, rasterID) => {
        get_raster_pixel(
            rasterID,
            e.latlng.lat,
            e.latlng.lng,
            map.getZoom()
        ).then((data) => {
            if (data == "not found") {
                L.popup(e.latlng, {
                    content: '<b style="font-size:16px;">No raster Here</b>',
                }).openOn(map);
            } else {
                L.popup(e.latlng, {
                    content:
                        '<b style="font-size:15px;}">' +
                        "Propreties" +
                        "</b><hr>" +
                        `<b>lat:</b> ${data.lat}` +
                        "<br>" +
                        `<b>long: </b>${data.long}` +
                        "<br>" +
                        `<b>x:</b> ${data.x}` +
                        "<br>" +
                        `<b>y:</b> ${data.y}` +
                        "<br>" +
                        "<b>" +
                        `<b>value:</b> ${data.value}` +
                        "</b>",
                }).openOn(map);
            }
        });
    };
    if (display)
        return (
            <TileLayer
                url={`http://127.0.0.1:8000/api/raster/tiles/${layer.data.id}/{z}/{x}/{y}.png`}
                maxZoom={22}
            />
        );
};

export default TileLayerViewer;
