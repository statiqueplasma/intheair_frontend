import ViewGeo from "./ViewGeo";
import LayerSideBar from "../global/layersSideBar";
import { ProSidebarProvider } from "react-pro-sidebar";
import { useData } from "../../../contexts/DataContext";
import Control from "react-leaflet-custom-control";
import {
    Box,
    inputClasses,
    useTheme,
    Button,
    Stack,
    Typography,
} from "@mui/material";
import { useEffect, useState, useContext, createContext } from "react";
import { MapContainer, useMap, Pane, TileLayer } from "react-leaflet";
import Loading from "../global/loading";
import * as olSource from "ol/source";
import L, { LatLng, divIcon } from "leaflet";
import LayerViewer from "../global/layerViewer";
import TileLayerViewer from "../global/TileLayerViewer";
import Slide from "@mui/material/Slide";
import { useParams } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StraightenIcon from "@mui/icons-material/Straighten";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import ReactDOMServer from "react-dom/server";
import calcArea from "../global/utilities";
import "leaflet-mouse-position";
const layerContext = createContext();
export function useLayerContext() {
    return useContext(layerContext);
}
const Coordinates = L.control.mousePosition({
    prefix: "LatLng = ",
});
function stringify(obj) {
    let cache = [];
    let str = JSON.stringify(obj, function (key, value) {
        if (typeof value === "object" && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // Circular reference found, discard key
                return;
            }
            // Store value in our collection
            cache.push(value);
        }
        return value;
    });
    cache = null; // reset the cache
    return str;
}
function MapControl({ called, setCalled }) {
    const map = useMap();
    const OpenStreetMap_France = L.tileLayer(
        "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
        {
            maxZoom: 22,
            attribution:
                '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
    );

    const OpenTopoMap = L.tileLayer(
        "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 22,
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        }
    );

    const Thunderforest_Landscape = L.tileLayer(
        "https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey={apikey}",
        {
            attribution:
                '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            apikey: "<your apikey>",
            maxZoom: 22,
        }
    );

    const GeoportailFrance_plan = L.tileLayer(
        "https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
        {
            attribution:
                '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
            bounds: [
                [-75, -180],
                [81, 180],
            ],
            minZoom: 2,
            maxZoom: 22,
            apikey: "choisirgeoportail",
            format: "image/png",
            style: "normal",
        }
    );
    const GeoportailFrance_orthos = L.tileLayer(
        "https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
        {
            attribution:
                '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
            bounds: [
                [-75, -180],
                [81, 180],
            ],
            minZoom: 2,
            maxZoom: 22,
            apikey: "choisirgeoportail",
            format: "image/jpeg",
            style: "normal",
        }
    );
    const Esri_WorldTopoMap = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        {
            attribution:
                "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community",
        }
    );
    const Esri_WorldStreetMap = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
        {
            attribution:
                "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012",
        }
    );
    const GeoportailFrance_parcels = L.tileLayer(
        "https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=CADASTRALPARCELS.PARCELLAIRE_EXPRESS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
        {
            attribution:
                '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
            bounds: [
                [-75, -180],
                [81, 180],
            ],
            minZoom: 2,
            maxZoom: 22,
            apikey: "choisirgeoportail",
            format: "image/png",
            style: "PCI vecteur",
        }
    );
    var baseMaps = {
        "OpenStreetMaps France": OpenStreetMap_France,
        "Topographie Map": OpenTopoMap,
        "Thunderforest Landscape": Thunderforest_Landscape,
        "Geoportail France plan": GeoportailFrance_plan,
        "GeoportailFrance Orthophoto": GeoportailFrance_orthos,
        "Esri World Topo Map": Esri_WorldTopoMap,
        "Esri World Street Map": Esri_WorldStreetMap,
        "GeoportailFrance Parcels": GeoportailFrance_parcels,
    };

    if (called) {
        L.control.layers.minimap(baseMaps).addTo(map);

        Coordinates.addTo(map);
        GeoportailFrance_orthos.addTo(map);
        setCalled(false);
    }

    return;
}
function ChangeView({
    center,
    zoom,
    AllowChangeView,
    blockChangeView,
    collapseState,
}) {
    const map = useMap();
    if (AllowChangeView) {
        map.setView(center, zoom);
        blockChangeView();
    }
    useEffect(() => {
        if (collapseState) {
            console.log("full");
            L.DomUtil.removeClass(map._container, "map-resize");
        } else {
            console.log("small");
            L.DomUtil.addClass(map._container, "map-resize");
        }
    }, [collapseState]);

    return null;
}

function MeasureControl({
    lineState,
    setLineState,
    AreaState,
    setAreaState,
    saveLineMesure,
    saveAreaMesure,
}) {
    const map = useMap();
    const [first, setFirst] = useState(true);
    const [distance, setDistance] = useState([]);
    const [newMeasure, setNewMeasure] = useState(false);
    const [addTooltip, setAddTooltip] = useState(false);
    const [Line, setLine] = useState([]);
    const [Polygone, setPolygone] = useState([]);
    const [desactivateMouseEvent, setDesactivateMouseEvent] = useState(false);
    const [toolTips, setToolTips] = useState([]);
    const [linePoints, setLinePoints] = useState([]);
    const [AreaPoints, setAreaPoints] = useState([]);
    const [perimetre, setPerimetre] = useState(0);
    const [surface, setsurface] = useState(0);
    const ButtonLineSX = {
        backgroundColor: lineState ? "#7d52b4" : "white",
        color: lineState ? "white" : "gray",
        width: "50px",
    };
    const ButtonAreaSX = {
        backgroundColor: AreaState ? "#7d52b4" : "white",
        color: AreaState ? "white" : "gray",
        width: "50px",
    };
    let _length = 0;
    function savePolygone() {
        console.log("saving poly....");
        saveAreaMesure(AreaPoints, surface, perimetre);
        setPolygone([]);
        setPerimetre(0);
        setsurface(0);
    }
    function saveLine() {
        saveLineMesure(linePoints);
        setLine([]);
        setToolTips([]);
    }
    function OnMoveMesure(e) {
        var buff = AreaPoints;
        if (AreaPoints.length > 0) {
            var location = e.latlng;
            buff.push(location);
            map.getPane("measure-pane").style.zIndex = 700;
            var polygone = new L.Polygon(buff, {
                color: "red",
                pane: "measure-pane",
            });
            buff.pop();
            if (Polygone.length > 0) {
                map.removeLayer(Polygone[Polygone.length - 1]);
                Polygone.pop();
            }
            map.addLayer(polygone);
            Polygone.push(polygone);
        }
    }
    function AddMesureLinear(e) {
        var buff = linePoints;
        var location = e.latlng;
        var added = false;
        if (buff.length === 0) {
            var tooltip = L.tooltip({
                permanent: true,
                direction: "top",
            });
            tooltip.setContent(`Start`);
            tooltip.setLatLng(new L.LatLng(e.latlng.lat, e.latlng.lng));
            tooltip.addTo(map);
            toolTips.push(tooltip);
        }
        if (buff[buff.length - 1] !== location) {
            setAddTooltip(true);
            buff.push(location);
        }
        setLinePoints(buff);
        var polyline = new L.Polyline(buff, {
            color: "red",
            weight: 3,
            opacity: 0.5,
            smoothFactor: 1,
        });
        if (Line.length > 0) {
            map.removeLayer(Line[Line.length - 1]);
            Line.pop();
        }

        let btn = document.createElement("button");
        btn.innerText = "Supprimer";
        btn.onclick = function () {
            for (var i = 0; i < toolTips.length; i++) {
                toolTips[i].remove();
            }
            map.removeLayer(polyline);
            setDesactivateMouseEvent(true);
        };
        map.getPane("popup-pane").style.zIndex = 800;
        polyline.bindPopup(btn, {
            maxWidth: "auto",
            pane: "popup-pane",
        });
        Line.push(polyline);
        if (buff.length > 1) {
            _length = map.distance(buff[buff.length - 2], location);
            _length = Math.round((_length + Number.EPSILON) / 10) / 100;
            if (addTooltip) {
                var tooltip = L.tooltip({
                    permanent: true,
                    direction: "top",
                });
                var Centertooltip = L.tooltip({
                    className: "tooltip-mesure-center",
                    permanent: true,
                    direction: "center",
                    backgroundColor: "red",
                    opacity: 0.5,
                });

                var new_distance = _length;
                for (var i = 0; i < distance.length; i++) {
                    new_distance =
                        Math.round(
                            (new_distance + distance[i] + Number.EPSILON) * 100
                        ) / 100;
                }

                var polylineForCenter = new L.Polyline(
                    [buff[buff.length - 2], location],
                    {}
                );
                var center = polylineForCenter.getBounds().getCenter();
                Centertooltip.setContent(`${_length} Km`);
                Centertooltip.setLatLng(new L.LatLng(center.lat, center.lng));
                Centertooltip.addTo(map);
                tooltip.setContent(`${new_distance} Km`);
                tooltip.setLatLng(new L.LatLng(e.latlng.lat, e.latlng.lng));
                tooltip.addTo(map);
                toolTips.push(tooltip);
                toolTips.push(Centertooltip);
                setAddTooltip(false);
                distance.push(_length);
            }
        }
        console.log(distance);
        map.addLayer(polyline);
    }
    function AddMesureArea(e) {
        var buff = AreaPoints;
        var location = e.latlng;
        var polygone;
        var surface = 0;
        var perimetre = 0;
        if (buff[buff.length - 1] !== location) {
            buff.push(location);
        }
        setAreaPoints(buff);

        map.getPane("measure-pane").style.zIndex = 700;
        polygone = new L.Polygon(buff, {
            color: "red",
            pane: "measure-pane",
        });

        if (Polygone.length > 0) {
            map.removeLayer(Polygone[Polygone.length - 1]);
            Polygone.pop();
        }

        if (buff.length > 1) {
            surface = Math.round((calcArea(buff) + Number.EPSILON) / 10) / 1000;
            setsurface(surface);
            for (var i = 1; i < buff.length; i++) {
                perimetre = perimetre + map.distance(buff[i], buff[i - 1]);
            }
            perimetre = Math.round(perimetre + Number.EPSILON) / 1000;
            setPerimetre(perimetre);
        }
        let element = ReactDOMServer.renderToString(
            <Box>
                <Typography variant="h5">Mesure</Typography>
                <Box display={"flex"}>
                    <Typography fontWeight={"bold"}>Surface :</Typography>
                    <Typography>{surface} ha</Typography>
                </Box>
                <Box display={"flex"}>
                    <Typography fontWeight={"bold"}>Perimetre :</Typography>
                    <Typography>{perimetre} km</Typography>
                </Box>
            </Box>
        );
        let block = document.createElement("div");
        let btn = document.createElement("button");
        btn.innerText = "Supprimer";
        btn.onclick = function () {
            map.removeLayer(polygone);
        };
        block.innerHTML = element;
        block.append(btn);
        map.getPane("popup-pane").style.zIndex = 800;
        polygone
            .bindPopup(block, {
                maxWidth: "auto",
                pane: "popup-pane",
            })
            .openPopup();
        Polygone.push(polygone);
        map.addLayer(polygone);
    }
    useEffect(() => {
        if (desactivateMouseEvent) {
            map.off("click");
            map.off("click");
            map.off("mousemove");
            setDesactivateMouseEvent(false);
            map.removeControl(Coordinates);
            Coordinates.addTo(map);
        }
    }, [desactivateMouseEvent]);
    useEffect(() => {
        if (!lineState) {
            setDesactivateMouseEvent(true);
            setNewMeasure(false);
            setDistance([]);
            setLinePoints([]);
            setAddTooltip(false);
            if (Line.length > 0) {
                saveLine();
            }
            L.DomUtil.removeClass(map._container, "crosshair-cursor-enabled");
        } else {
            L.DomUtil.addClass(map._container, "crosshair-cursor-enabled");
        }
    }, [lineState]);
    useEffect(() => {
        if (!AreaState) {
            setDesactivateMouseEvent(true);
            console.log("desactivated mouse....");
            setNewMeasure(false);
            console.log("newmesurement set....");
            setAreaPoints([]);
            L.DomUtil.removeClass(map._container, "crosshair-cursor-enabled");
            if (Polygone.length > 0) {
                savePolygone();
            }
        } else {
            L.DomUtil.addClass(map._container, "crosshair-cursor-enabled");
        }
    }, [AreaState]);
    useEffect(() => {
        if (newMeasure) {
            setDesactivateMouseEvent(true);
            setNewMeasure(false);
            setDistance([]);
            setLinePoints([]);
            setAddTooltip(false);
            setAreaPoints([]);
            if (Line.length > 0) {
                saveLine();
            }
            if (Polygone.length > 0) {
                savePolygone();
            }
        }
    }, [newMeasure]);
    if (lineState) {
        map.on("click", AddMesureLinear, false);
    }
    if (AreaState) {
        map.doubleClickZoom.disable();
        map.on("mousemove", OnMoveMesure);
        map.on("dblclick", function (e) {
            setNewMeasure(true);
        });
        map.on("click", AddMesureArea);
    }
    return (
        <Control position="topright">
            <Stack direction="column" spacing={1} alignItems={"end"}>
                <Button
                    onClick={() => setLineState(!lineState)}
                    sx={ButtonLineSX}
                    variant="contained"
                    color="inherit"
                >
                    <StraightenIcon style={{ color: "gray", m: "0" }} />
                </Button>
                {lineState && (
                    <Box
                        width={"100px"}
                        height={"50px"}
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "10px",
                        }}
                        color="black"
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setNewMeasure(true)}
                        >
                            new
                        </Button>
                    </Box>
                )}
                <Button
                    sx={ButtonAreaSX}
                    variant="contained"
                    color="inherit"
                    onClick={() => {
                        setAreaState(!AreaState);
                    }}
                >
                    <SquareFootIcon />
                </Button>
                {AreaState && (
                    <Box
                        width={"100px"}
                        height={"50px"}
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "10px",
                        }}
                        color="black"
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setNewMeasure(true)}
                        >
                            new
                        </Button>
                    </Box>
                )}
            </Stack>
        </Control>
    );
}
function DrawLineMesures({
    LineMesure,
    index,
    called,
    finishedDrawing,
    deleteLine,
}) {
    const map = useMap();
    if (called) {
        let toolTips = [];
        let cumulDist = 0;
        var buff = LineMesure.linePoints;
        var startToolTip = L.tooltip({
            permanent: true,
            direction: "top",
        });
        startToolTip.setContent(`Start`);
        startToolTip.setLatLng(
            new L.LatLng(
                LineMesure.linePoints[0].lat,
                LineMesure.linePoints[0].lng
            )
        );
        startToolTip.addTo(map);
        toolTips.push(startToolTip);
        var polyline = new L.Polyline(buff, {
            color: "red",
            weight: 3,
            opacity: 0.5,
            smoothFactor: 1,
        });

        for (var j = 1; j < LineMesure.linePoints.length; j++) {
            var _length = map.distance(
                LineMesure.linePoints[j - 1],
                LineMesure.linePoints[j]
            );
            _length = Math.round(_length + Number.EPSILON) / 1000;
            cumulDist = Math.round((cumulDist + _length) * 1000) / 1000;
            var tooltip = L.tooltip({
                permanent: true,
                direction: "top",
            });
            var Centertooltip = L.tooltip({
                className: "tooltip-mesure-center",
                permanent: true,
                direction: "center",
                backgroundColor: "red",
                opacity: 0.5,
            });
            var polylineForCenter = new L.Polyline(
                [LineMesure.linePoints[j - 1], LineMesure.linePoints[j]],
                {}
            );
            var center = polylineForCenter.getBounds().getCenter();
            Centertooltip.setContent(`${_length} Km`);
            Centertooltip.setLatLng(new L.LatLng(center.lat, center.lng));
            Centertooltip.addTo(map);
            tooltip.setContent(`${cumulDist} Km`);
            tooltip.setLatLng(
                new L.LatLng(
                    LineMesure.linePoints[j].lat,
                    LineMesure.linePoints[j].lng
                )
            );
            tooltip.addTo(map);
            toolTips.push(tooltip);
            toolTips.push(Centertooltip);
        }

        let btn = document.createElement("button");
        btn.innerText = "Supprimer";

        btn.onclick = function () {
            for (var t = 0; t < toolTips.length; t++) {
                toolTips[t].remove();
            }
            map.removeLayer(polyline);
            deleteLine(index);
        };
        map.getPane("popup-pane").style.zIndex = 800;
        polyline.bindPopup(btn, {
            maxWidth: "auto",
            pane: "popup-pane",
        });
        map.addLayer(polyline);
        finishedDrawing(index);
    }
}
function DrawAreaMesures({
    AreaMesure,
    index,
    called,
    finishedDrawing,
    deleteArea,
}) {
    const map = useMap();
    if (called) {
        map.getPane("measure-pane").style.zIndex = 700;
        var polygone = new L.Polygon(AreaMesure.AreaPoints, {
            color: "red",
            pane: "measure-pane",
        });

        let element = ReactDOMServer.renderToString(
            <Box>
                <Typography variant="h5">Mesure</Typography>
                <Box display={"flex"}>
                    <Typography fontWeight={"bold"}>Surface :</Typography>
                    <Typography>{AreaMesure.surface} ha</Typography>
                </Box>
                <Box display={"flex"}>
                    <Typography fontWeight={"bold"}>Perimetre :</Typography>
                    <Typography>{AreaMesure.perimetre} km</Typography>
                </Box>
            </Box>
        );
        let block = document.createElement("div");
        let btn = document.createElement("button");
        btn.innerText = "Supprimer";
        btn.onclick = function () {
            map.removeLayer(polygone);
            deleteArea(index);
        };
        block.innerHTML = element;
        block.append(btn);
        map.getPane("popup-pane").style.zIndex = 800;
        polygone
            .bindPopup(block, {
                maxWidth: "auto",
                pane: "popup-pane",
            })
            .openPopup();
        map.addLayer(polygone);
        finishedDrawing(index);
    }
}
function getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    let red_letters = 0;
    for (let i = 0; i < 6; i++) {
        let got = Math.floor(Math.random() * 16);
        if (i === 0 && got === "E") {
            red_letters++;
        }
        if (i === 1 && got === "B" && red_letters === 1) {
            red_letters++;
        }
        if (i === 2 && parseInt(got) < 9 && red_letters === 2) {
            while (parseInt(got) < 9) {
                got = Math.floor(Math.random() * 16);
            }
        }
        color += letters[got];
    }
    return color;
}

const MapView = () => {
    const { id, projectfile } = useParams();

    const theme = useTheme();
    const {
        files,
        fetchFiles,
        dataFile,
        fetchData,
        rasterFile,
        fetchRaster,
        fetchLayerOrder,
        layerOrder,
        updateLayerOrder,
    } = useData();
    const [loading, setLoading] = useState(true);
    const [shapefiles, setShapefiles] = useState([]);
    const [rasters, setRasters] = useState([]);
    const [indexrast, setIndexrast] = useState(0);
    const [indexshape, setIndexshape] = useState(0);
    const [loadingState, setLoadingState] = useState(true);
    const [calledMap, setCalledMap] = useState(true);
    const [Layers, setLayers] = useState([]);
    const [LayerShow, setLayerShow] = useState([]);
    const [endRaster, setEndRaster] = useState(false);
    const [endshapefile, setEndShapefile] = useState(false);
    const [center, setCenter] = useState([47.2490286842369, 0.322073008888639]);
    const [allowChangeView, setAllowChangeView] = useState(true);
    const [display, setDisplay] = useState(true);
    const [filterObject, setFilterObject] = useState([]);
    const [collapse, setCollapse] = useState(true);
    const [startMesureLinear, setStartMesureLinear] = useState(false);
    const [startMesureArea, setStartMesureArea] = useState(false);
    const [LineMesures, setLineMesures] = useState([]);
    const [AreaMesures, setAreaMesures] = useState([]);
    const [drawnLineElements, setDrawnLineElements] = useState(0);
    const [drawnAreaElements, setDrawnAreaElements] = useState(0);
    const [allowDrawLine, setAllowDrawLine] = useState([]);
    const [allowDrawArea, setAllowDrawArea] = useState([]);

    const SaveLineMesure = (linePoints) => {
        var buff = LineMesures;
        buff.push({ linePoints: linePoints });
        localStorage.setItem("LineMesures", JSON.stringify(buff));
        setLineMesures(buff);
    };
    const DeleteLine = (index) => {
        var buff = LineMesures;
        buff.splice(index, 1);
        localStorage.setItem("LineMesures", JSON.stringify(buff));
        setLineMesures(buff);
    };
    const SaveAreaMesure = (AreaPoints, surface, perimetre) => {
        var buff = AreaMesures;
        buff.push({
            AreaPoints: AreaPoints,
            surface: surface,
            perimetre: perimetre,
        });
        localStorage.setItem("AreaMesures", JSON.stringify(buff));
        setAreaMesures(buff);
    };
    const DeleteArea = (index) => {
        var buff = AreaMesures;
        buff.splice(index, 1);
        localStorage.setItem("AreaMesures", JSON.stringify(buff));
        setAreaMesures(buff);
    };
    const SaveAreMesure = () => {};
    const [distanceStored, setDistanceStored] = useState(0);
    const forceUpdate = useForceUpdate();
    useEffect(() => {
        if (loading) {
            fetchFiles(id);
            fetchLayerOrder(id);
            setLoading(false);
            document.getElementsByTagName("body")[0].style.overflow = "hidden";
            if (localStorage.getItem("LineMesures")) {
                var lines = JSON.parse(localStorage.getItem("LineMesures"));
                let buff = new Array(lines.length).fill(true);
                setLineMesures(lines);
                setAllowDrawLine(buff);
            }
            if (localStorage.getItem("AreaMesures")) {
                var areas = JSON.parse(localStorage.getItem("AreaMesures"));
                let buff = new Array(areas.length).fill(true);
                setAreaMesures(areas);
                setAllowDrawArea(buff);
            }
        } else if (files && layerOrder) {
            traitementType();
        }
    }, [loading, files, layerOrder]);

    function traitementType() {
        var shape = [];
        var rast = [];
        for (let i = 0; i < files.length; i++) {
            if (files[i].file_type.toLowerCase() === "geo_file") {
                if (files[i].files[0].file_type === "raster") {
                    rast.push(i);
                } else {
                    shape.push(i);
                }
            }
        }
        setRasters(rast);
        setShapefiles(shape);
        if (shape.length > 0) {
            fetchData(files[shape[0]].id);
        } else setEndShapefile(true);
        if (rast.length > 0) {
            fetchRaster(files[rast[0]].id);
        } else setEndRaster(true);
    }

    function useForceUpdate() {
        const [value, setValue] = useState(0); // integer state
        return () => setValue((value) => value + 1); // update state to force render
        // A function that increment 👆🏻 the previous state like here
        // is better than directly setting `setValue(value + 1)`
    }

    useEffect(() => {
        if (rasterFile) {
            try {
                setLoadingState(true);
                let buff = Layers;
                buff.push({
                    id: files[rasters[indexrast]].id,
                    data: {
                        id: rasterFile[0].raster,
                        lat: rasterFile[0].lat,
                        lon: rasterFile[0].lon,
                    },
                    type: "raster",
                    name: files[rasters[indexrast]].name,
                    order: layerOrder.find((layer) => {
                        return (
                            layer.project_file === files[rasters[indexrast]].id
                        );
                    }).order,
                    show: true,
                    color: getRandomColor(),
                });
                setLayers(buff);
                if (indexrast < rasters.length - 1) {
                    fetchRaster(files[rasters[indexrast + 1]].id);
                    setIndexrast(indexrast + 1);
                } else {
                    if (
                        projectfile &&
                        files[rasters[indexrast]].id == projectfile
                    ) {
                        setAllowChangeView(true);
                        setCenter([rasterFile[0].lat, rasterFile[0].lon]);
                    }
                    setEndRaster(true);
                    let buff = Layers;
                    buff = buff.sort((a, b) =>
                        a.order > b.order ? 1 : b.order > a.order ? -1 : 0
                    );
                    setLayers(buff);
                    setDisplay(false);
                }
            } catch (e) {
                console.log(e);
            }
        }
    }, [rasterFile]);

    useEffect(() => {
        if (startMesureLinear) {
            setStartMesureArea(false);
        }
    }, [startMesureLinear]);
    useEffect(() => {
        if (startMesureArea) {
            setStartMesureLinear(false);
        }
    }, [startMesureArea]);
    useEffect(() => {
        //executé pour chaque retour de fetchFile
        if (dataFile) {
            try {
                setLoadingState(true);
                let buff = Layers;
                buff.push({
                    id: files[shapefiles[indexshape]].id,
                    data: dataFile,
                    type: dataFile.features[0].geometry.type,
                    name: files[shapefiles[indexshape]].name,
                    order: layerOrder.find((layer) => {
                        return (
                            layer.project_file ===
                            files[shapefiles[indexshape]].id
                        );
                    }).order,
                    show: true,
                    color: getRandomColor(),
                });
                setLayers(buff);
                buff = filterObject;
                buff.push({
                    layer: files[shapefiles[indexshape]].id,
                    show: true,
                    operator: null,
                    prop: null,
                    value: null,
                    active: false,
                });
                setFilterObject(buff);
                if (indexshape < shapefiles.length - 1) {
                    fetchData(files[shapefiles[indexshape + 1]].id);
                    setIndexshape(indexshape + 1);
                } else {
                    if (
                        projectfile &&
                        files[shapefiles[indexshape]].id == projectfile
                    ) {
                        setAllowChangeView(true);
                        setCenter(
                            dataFile.features[0].geometry.coordinates[0].toReversed()
                        );
                    }
                    setEndShapefile(true);
                    let buff = Layers;
                    buff = buff.sort((a, b) =>
                        a.order > b.order ? 1 : b.order > a.order ? -1 : 0
                    );
                    setLayers(buff);
                    setDisplay(false);
                }
            } catch (e) {
                console.log(e);
            }
        }
    }, [dataFile]);

    useEffect(() => {
        if (!display) {
            setDisplay(true);
        }
    }, [display]);

    useEffect(() => {
        forceUpdate();
        setDisplay(false);
    }, [Layers]);

    const LayerControl = (index) => {
        let buff = Layers;
        buff[index].show = !buff[index].show;
        setLayerShow(buff);
        setDisplay(false);
        forceUpdate();
    };
    const FilterValues = (newFilterObject) => {
        setFilterObject(newFilterObject);
        forceUpdate();
        setDisplay(false);
    };
    const changePosition = (idOrigin, idTarget) => {
        let arr = Layers;
        let origin = Layers[idOrigin];
        let target = Layers[idTarget];
        origin.order = target.order;

        let inc = 1;
        for (let i = idTarget; i < Layers.length; i++) {
            if (i !== idOrigin) {
                arr[i].order = target.order + inc;
            }
            updateLayerOrder({
                project_file: arr[i].id,
                order: arr[i].order,
            });
        }
        for (let i = 0; i < idTarget; i++) {
            updateLayerOrder({
                project_file: arr[i].id,
                order: arr[i].order,
            });
        }
        arr = arr.sort((a, b) =>
            a.order > b.order ? 1 : b.order > a.order ? -1 : 0
        );
        setLayers(arr);
        forceUpdate();
    };

    const layerContextObject = {
        Layers: Layers,
        LayerState: LayerShow,
        LayerControl: LayerControl,
        FilterValues: FilterValues,
        filterObject: filterObject,
        changePosition: changePosition,
        changeCenter: setCenter,
    };

    return (
        <ProSidebarProvider>
            <Box
                width="100%"
                height="100%"
                display="flex"
                overflow={"hidden !important"}
            >
                <layerContext.Provider value={layerContextObject}>
                    {!(endRaster && endshapefile) && (
                        <Box
                            width={"100%"}
                            height={"100%"}
                            position={"absolute"}
                            zIndex={1000}
                            sx={{
                                backgroundColor: "black",
                                opacity: 0.7,
                            }}
                        >
                            <Loading />
                        </Box>
                    )}

                    <Box
                        position={"absolute"}
                        height={"100px"}
                        width={"100px"}
                        top={"100px"}
                        left={0}
                        zIndex={1000}
                    >
                        <Slide
                            direction="right"
                            in={collapse}
                            mountOnEnter
                            unmountOnExit
                        >
                            <Box
                                sx={{
                                    backgroundColor: "white",
                                    borderRadius: "10px",
                                    cursor: "pointer",
                                }}
                                height={"70px"}
                                width={"50px"}
                                color={"gray"}
                                fontSize={"40px"}
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                onClick={() => {
                                    setCollapse(false);
                                }}
                            >
                                <ArrowForwardIosIcon fontSize={"40px"} />
                            </Box>
                        </Slide>
                    </Box>

                    <Box display={"flex"} height={"100%"}>
                        <LayerSideBar
                            collapse={collapse}
                            setCollapse={(state) => setCollapse(state)}
                            setAllowChangeView={() => {
                                setAllowChangeView(true);
                            }}
                        />
                        <Box width={"100%"} height="100%">
                            <MapContainer
                                center={center}
                                zoom={8}
                                style={{
                                    position: "absolute",
                                    height: "100%",
                                }}
                            >
                                <MapControl
                                    called={calledMap}
                                    setCalled={setCalledMap}
                                />

                                {/* <TileLayer
                                url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png"
                                maxZoom={22}
                            /> */}
                                <ChangeView
                                    center={center}
                                    zoom={16}
                                    AllowChangeView={allowChangeView}
                                    blockChangeView={() =>
                                        setAllowChangeView(false)
                                    }
                                    collapseState={collapse}
                                />
                                {display && (
                                    <Pane
                                        name="base-pane"
                                        style={{
                                            zIndex: 500,
                                        }}
                                    >
                                        {Layers.toReversed().map(
                                            (layer, index) => {
                                                let filter_object =
                                                    filterObject.find(
                                                        (element) => {
                                                            return (
                                                                element.layer ===
                                                                layer.id
                                                            );
                                                        }
                                                    );

                                                if (layer.type === "raster") {
                                                    return (
                                                        layer.show && (
                                                            <TileLayerViewer
                                                                layer={layer}
                                                            />
                                                        )
                                                    );
                                                } else
                                                    return (
                                                        <LayerViewer
                                                            layer={layer}
                                                            index={index}
                                                            filterObject={
                                                                filter_object
                                                            }
                                                        />
                                                    );
                                            }
                                        )}
                                    </Pane>
                                )}
                                <MeasureControl
                                    lineState={startMesureLinear}
                                    setLineState={(value) =>
                                        setStartMesureLinear(value)
                                    }
                                    saveLineMesure={(Line, ToolTips) =>
                                        SaveLineMesure(Line, ToolTips)
                                    }
                                    AreaState={startMesureArea}
                                    setAreaState={(value) =>
                                        setStartMesureArea(value)
                                    }
                                    saveAreaMesure={(
                                        AreaPoints,
                                        surface,
                                        perimetre
                                    ) =>
                                        SaveAreaMesure(
                                            AreaPoints,
                                            surface,
                                            perimetre
                                        )
                                    }
                                />
                                <Pane
                                    name="measure-pane"
                                    style={{
                                        zIndex: 700,
                                    }}
                                ></Pane>
                                <Pane
                                    name="popup-pane"
                                    style={{
                                        zIndex: 800,
                                    }}
                                >
                                    {LineMesures.length > 0 &&
                                        LineMesures.map((linemesure, index) => {
                                            return (
                                                <DrawLineMesures
                                                    called={
                                                        allowDrawLine[index]
                                                    }
                                                    LineMesure={linemesure}
                                                    deleteLine={(index) =>
                                                        DeleteLine(index)
                                                    }
                                                    index={index}
                                                    finishedDrawing={(
                                                        index
                                                    ) => {
                                                        var buff =
                                                            allowDrawLine;
                                                        buff[index] = false;
                                                        setAllowDrawLine(buff);
                                                    }}
                                                />
                                            );
                                        })}
                                    {AreaMesures.length > 0 &&
                                        AreaMesures.map((linemesure, index) => {
                                            return (
                                                <DrawAreaMesures
                                                    called={
                                                        allowDrawArea[index]
                                                    }
                                                    AreaMesure={linemesure}
                                                    deleteArea={(index) =>
                                                        DeleteArea(index)
                                                    }
                                                    index={index}
                                                    finishedDrawing={(
                                                        index
                                                    ) => {
                                                        var buff =
                                                            allowDrawArea;
                                                        buff[index] = false;
                                                        setAllowDrawArea(buff);
                                                    }}
                                                />
                                            );
                                        })}
                                </Pane>
                            </MapContainer>
                        </Box>
                    </Box>
                </layerContext.Provider>
            </Box>
        </ProSidebarProvider>
    );
};
export default MapView;
