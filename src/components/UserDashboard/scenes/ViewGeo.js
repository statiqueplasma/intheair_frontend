import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { LayerGroup, MapContainer, useMap } from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";

import "leaflet-measure";
import "leaflet-measure/dist/leaflet-measure.css";

//import MeasureControl from "react-leaflet-measure";

import "leaflet.layerscontrol-minimap";
import "leaflet.layerscontrol-minimap/control.layers.minimap.css";

import L, { layerGroup } from "leaflet";
import "leaflet/dist/leaflet.css";

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";

import Bouton from "../../Bouton";
import Loading from "../global/loading";

import { useData } from "../../../contexts/DataContext";

import "../../../styles/GeoData.css";
import { Box } from "@mui/system";
function MapControl({ called, setCalled }) {
    const map = useMap();
    const OpenStreetMap_France = L.tileLayer(
        "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
        {
            maxZoom: 20,
            attribution:
                '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
    );

    OpenStreetMap_France.addTo(map);

    const OpenTopoMap = L.tileLayer(
        "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 17,
            attribution:
                'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        }
    );

    const baseMaps = {
        "OpenStreetMaps France": OpenStreetMap_France,
        Topographie: OpenTopoMap,
    };

    const options = {
        position: "topright",
        primaryLengthUnit: "meters",
        secondaryLengthUnit: "kilometers",
        primaryAreaUnit: "sqmeters",
        secondaryAreaUnit: "hectares",
        activeColor: "#db4a29",
        completedColor: "#9b2d14",
    };

    if (called) {
        L.control.layers.minimap(baseMaps).addTo(map);
        var measureControl = new L.Control.Measure(options);
        measureControl.addTo(map);

        setCalled(false);
    }

    return;
}

function MeasureControl2({ called, setCalled }) {
    const map = useMap();

    const options = {
        primaryLengthUnit: "meters",
        secondaryLengthUnit: "kilometers",
        primaryAreaUnit: "sqmeters",
        secondaryAreaUnit: "hectares",
        activeColor: "#db4a29",
        completedColor: "#9b2d14",
    };
    if (called) {
        const measureControl = L.control.Measure(options);
        measureControl.addTo(map);
        setCalled(false);
    }
}

function onEachFeature(feature, layer) {
    function readProperties(feature) {
        let text = '<b style="font-size:15px;}">' + "Propreties" + "</b><hr>";
        for (let [key, value] of Object.entries(feature.properties)) {
            text += "<b>" + key + " : </b>" + value + "</br>";
        }
        return text;
    }

    layer.bindPopup(readProperties(feature));

    layer.on({
        mouseover: (event) => {
            event.target.setStyle({
                fillColor: "purple",
            });
        },
        mouseout: (event) => {
            event.target.setStyle({
                fillColor: "#ff7800",
            });
        },
    });
}

function getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function GeoData({ id, projectfile, setCenterMap }) {
    // const center = [43.5166, 2.0874];
    const map = useMap();
    console.log("projectfile = ", projectfile);
    const geojsonMarkerOptions = {
        radius: 8,
        fillColor: getRandomColor(),
        color: getRandomColor(),
        weight: 1,
        opacity: 1,
        fillOpacity: 0.3,
    };

    const {
        files,
        fetchFiles,
        dataFile,
        fetchData,
        rasterFile,
        fetchRaster,
    } = useData();
    const [loading, setLoading] = useState(true);
    const [endLoop, setEndLoop] = useState(false);
    const [layerControl, setLayerControl] = useState();
    const [fileName, setFileName] = useState();
    const [shapefiles, setShapefiles] = useState([]);
    const [rasters, setRasters] = useState([]);
    const [indexrast, setIndexrast] = useState(0);
    const [indexshape, setIndexshape] = useState(0);
    const [loadingState, setLoadingState] = useState(true);

    useEffect(() => {
        if (loading) {
            fetchFiles(id);
            setLayerControl(
                L.control.layers(null, null, { position: "bottomright" })
            );

            setLoading(false);
        } else if (files) {
            traitementType();
        }
        if (layerControl) {
            layerControl.addTo(map);
        }
    }, [loading, files, layerControl]);

    useEffect(() => {
        //executé pour chaque retour de fetchFile
        if (dataFile) {
            setLoadingState(true);
            let layer = L.geoJSON(dataFile, {
                pointToLayer: function(feature, latlng) {
                    return L.circleMarker(latlng, geojsonMarkerOptions);
                },
                onEachFeature: onEachFeature,
            });
            layerControl.addOverlay(layer, files[shapefiles[indexshape]].name);

            if (files[shapefiles[indexshape]].id == projectfile) {
                console.log(
                    "center shapefile = ",
                    dataFile.features[0].geometry.coordinates[0]
                );
                setCenterMap(
                    dataFile.features[0].geometry.coordinates[0].reverse()
                );
            }
            if (indexshape < shapefiles.length - 1) {
                fetchData(files[shapefiles[indexshape + 1]].id);
                setIndexshape(indexshape + 1);
            }
        }
    }, [dataFile]);

    useEffect(() => {
        if (rasterFile) {
            setLoadingState(true);
            console.log(
                "in function adding raster  ",
                files.find((element) => {
                    return element.id === rasterFile[0].project_file;
                }).name
            );
            let layer_raster = L.tileLayer(
                `http://127.0.0.1:8000/api/raster/tiles/${rasterFile[0].raster}/{z}/{x}/{y}.png`,
                { maxZoom: 21, nativeZooms: [18, 19, 20, 21] }
            );
            map.on("click", function(e) {
                get_raster_pixel(
                    rasterFile[0].raster,
                    e.latlng.lat,
                    e.latlng.lng,
                    map.getZoom()
                ).then((data) => {
                    if (data == "not found") {
                        L.popup(e.latlng, {
                            content:
                                '<b style="font-size:16px;">No raster Here</b>',
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
            });
            layerControl.addOverlay(
                layer_raster,
                files.find((element) => {
                    return element.id === rasterFile[0].project_file;
                }).name
            );

            console.log(
                "added raster  ",
                files.find((element) => {
                    return element.id === rasterFile[0].project_file;
                }).name
            );
            if (projectfile && files[rasters[indexrast]].id == projectfile) {
                setCenterMap([rasterFile[0].lat, rasterFile[0].lon]);
            }
            if (indexrast < rasters.length - 1) {
                fetchRaster(files[rasters[indexrast + 1]].id);
                setIndexrast(indexrast + 1);
            }
        }
    }, [rasterFile]);

    function traitementType() {
        var shape = [];
        var rast = [];
        for (let i = 0; i < files.length; i++) {
            if (files[i].file_type.toLowerCase() === "geo_file") {
                if (files[i].files[0].file_type === "raster") {
                    console.log("adding index rast = ", i);
                    rast.push(i);
                } else {
                    shape.push(i);
                }
            }
        }
        setRasters(rast);
        setShapefiles(shape);
        fetchData(files[shape[0]].id);
        fetchRaster(files[rast[0]].id);
    }

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
    if (rasters.length === 0 && shapefiles.length === 0) {
        return <Loading />;
    }
    if (rasters.length > 0 && indexrast < rasters.length - 1 && !loadingState) {
        return <Loading />;
    }
    if (
        shapefiles.length > 0 &&
        indexshape !== shapefiles.length - 1 &&
        !loadingState
    ) {
        return <Loading />;
    }
}
function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

function ViewGeo() {
    const { id, projectfile } = useParams();
    const navigate = useNavigate();
    const [center, setCenter] = useState([43.5166, 2.0874]);

    //const [center, setCenter] = useState([
    //    47.28891342480353,
    //    -2.299432595991964,
    //]);
    const centerSet = (center) => {
        console.log("center = ", center);
    };

    const [calledMap, setCalledMap] = useState(true);
    const [calledMeasure, setCalledMeasure] = useState(true);
    const measureOptions = {
        position: "topright",
        primaryLengthUnit: "meters",
        secondaryLengthUnit: "kilometers",
        primaryAreaUnit: "sqmeters",
        secondaryAreaUnit: "acres",
        activeColor: "#db4a29",
        completedColor: "#9b2d14",
    };
    return (
        <Box width="95%" m="auto">
            <Stack direction="horizontal" gap={5}>
                <h1>Projet n°{id}</h1>
                <div className="ms-auto">
                    <Bouton
                        onClick={() => navigate("/")}
                        couleurFond={"#674CC0"}
                        couleurTexte={"white"}
                    >
                        <strong>Retour à l'accueil</strong>
                    </Bouton>
                </div>
            </Stack>

            <MapContainer center={center} zoom={14}>
                <ChangeView center={center} zoom={14} />
                {/* <MeasureControl
                    called={calledMeasure}
                    setCalled={setCalledMeasure}
                /> */}
                <MapControl called={calledMap} setCalled={setCalledMap} />
                <GeoData
                    id={id}
                    projectfile={projectfile}
                    setCenterMap={setCenter}
                />
            </MapContainer>
        </Box>
    );
}

export default ViewGeo;
