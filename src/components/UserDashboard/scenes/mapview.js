import ViewGeo from "./ViewGeo";
import LayerSideBar from "../global/layersSideBar";
import { ProSidebarProvider } from "react-pro-sidebar";
import { useData } from "../../../contexts/DataContext";
import { Box, inputClasses, useTheme } from "@mui/material";
import { useEffect, useState, useContext, createContext } from "react";
import { MapContainer, useMap, Pane, TileLayer } from "react-leaflet";
import Loading from "../global/loading";
import * as olSource from "ol/source";
import L, { divIcon } from "leaflet";
import LayerViewer from "../global/layerViewer";
import TileLayerViewer from "../global/TileLayerViewer";
import { useParams } from "react-router-dom";
const layerContext = createContext();
export function useLayerContext() {
    return useContext(layerContext);
}

function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
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
    const [VectorLayers, setVectorLayers] = useState([]);
    const [VectorLayerShow, setVectorLayerShow] = useState([]);
    const [Layers, setLayers] = useState([]);
    const [LayerShow, setLayerShow] = useState([]);
    const [TileLayerShow, setTileLayerShow] = useState([]);
    const [TileLayers, setTileLayers] = useState([]);
    const [endRaster, setEndRaster] = useState(false);
    const [endshapefile, setEndShapefile] = useState(false);
    const [center, setCenter] = useState([47.2490286842369, 0.322073008888639]);
    const [display, setDisplay] = useState(true);
    const [filterObject, setFilterObject] = useState([]);

    useEffect(() => {
        if (loading) {
            fetchFiles(1);
            fetchLayerOrder(1);
            setLoading(false);
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
                    return layer.project_file === files[rasters[indexrast]].id;
                }).order,
                show: true,
                color: getRandomColor(),
            });
            setLayers(buff);
            if (indexrast < rasters.length - 1) {
                fetchRaster(files[rasters[indexrast + 1]].id);
                setIndexrast(indexrast + 1);
            } else {
                setEndRaster(true);
                let buff = Layers;
                buff = buff.sort((a, b) =>
                    a.order > b.order ? 1 : b.order > a.order ? -1 : 0
                );
                setLayers(buff);
                setDisplay(false);
            }
        }
    }, [rasterFile]);

    useEffect(() => {
        //executé pour chaque retour de fetchFile
        if (dataFile) {
            setLoadingState(true);
            let buff = Layers;
            buff.push({
                id: files[shapefiles[indexshape]].id,
                data: dataFile,
                type: dataFile.features[0].geometry.type,
                name: files[shapefiles[indexshape]].name,
                order: layerOrder.find((layer) => {
                    return (
                        layer.project_file === files[shapefiles[indexshape]].id
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
                setEndShapefile(true);
                let buff = Layers;
                buff = buff.sort((a, b) =>
                    a.order > b.order ? 1 : b.order > a.order ? -1 : 0
                );
                setLayers(buff);
                setDisplay(false);
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

    const forceUpdate = useForceUpdate();
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
            <Box width="100%" height="100%" display="flex">
                <layerContext.Provider value={layerContextObject}>
                    {!(endRaster && endshapefile) && (
                        <Box
                            width={"100%"}
                            height={"100%"}
                            position={"absolute"}
                            zIndex={1000}
                            sx={{
                                backgroundColor:
                                    theme.palette.mode === "light"
                                        ? "white"
                                        : "black",
                                opacity: 0.6,
                            }}
                        >
                            <Loading />
                        </Box>
                    )}

                    <LayerSideBar />
                    <Box width="100%" height="100%">
                        <MapContainer
                            center={center}
                            zoom={15}
                            style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <TileLayer
                                url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png"
                                maxZoom={21}
                            />
                            <ChangeView center={center} zoom={16} />
                            {display && (
                                <Pane
                                    name="base-pane"
                                    style={{
                                        zIndex: 500,
                                    }}
                                >
                                    {Layers.toReversed().map((layer, index) => {
                                        let filter_object = filterObject.find(
                                            (element) => {
                                                return (
                                                    element.layer === layer.id
                                                );
                                            }
                                        );

                                        if (layer.type === "raster") {
                                            return (
                                                <TileLayerViewer
                                                    layer={layer}
                                                />
                                            );
                                        } else
                                            return (
                                                <LayerViewer
                                                    layer={layer}
                                                    index={index}
                                                    filterObject={filter_object}
                                                />
                                            );
                                    })}
                                </Pane>
                            )}
                        </MapContainer>
                    </Box>
                </layerContext.Provider>
            </Box>
        </ProSidebarProvider>
    );
};
export default MapView;
