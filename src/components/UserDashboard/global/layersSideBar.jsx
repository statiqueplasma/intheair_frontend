import {
    Sidebar,
    Menu,
    MenuItem,
    useProSidebar,
    menuClasses,
    sidebarClasses,
} from "react-pro-sidebar";
import { useState, useEffect } from "react";
import {
    Box,
    IconButton,
    Typography,
    useTheme,
    Divider,
    Checkbox,
    Button,
    Tooltip,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { tokens } from "../../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import { useAuth } from "../../../contexts/AuthContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useLayerContext } from "../scenes/mapview";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PolylineIcon from "@mui/icons-material/Polyline";
import LayersIcon from "@mui/icons-material/Layers";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag, useDrop } from "react-dnd";

function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue((value) => value + 1); // update state to force render
    // A function that increment 👆🏻 the previous state like here
    // is better than directly setting `setValue(value + 1)`
}

export const DropSection = ({ id, isDragging, colors }) => {
    var height = 100;
    let { changePosition } = useLayerContext();
    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: "layerItem",
            drop: (item) => {
                try {
                    changePosition(item.id, id);
                } catch (error) {
                    console.log(error);
                }
            },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
            }),
        }),
        [id]
    );
    var state = isOver && !isDragging;
    return (
        <Box
            ref={drop}
            left="0px"
            display="flex"
            width="100%"
            height={state ? "20px" : "5px"}
            justifyContent="flex-end"
        >
            {state && (
                <Box
                    border="1px solid gray"
                    borderRadius="5px"
                    width="100%"
                    height={`30px`}
                    boxShadow={`0px 0px 6px 2px ${colors.indigo["700"]}`}
                    sx={{
                        backgroundColor: colors.indigo["700"],
                        opacity: 0.6,
                    }}
                ></Box>
            )}
        </Box>
    );
};

function LayerItem({
    layer,
    index,
    colors,
    collapsed,
    filterObject,
    setfilterObject,
    filterIndex,
    FilterValues,
}) {
    const forceUpdate = useForceUpdate();
    const uniqueOptions =
        layer.type === "raster"
            ? null
            : getUniqueOptions(layer.data.features[0].properties);
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "layerItem",
        item: { id: index },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const [openPoper, setOpenPoper] = useState();
    const [anchorEl, setAnchorEl] = useState();
    const handleClick = (index, event) => {
        setAnchorEl(event.currentTarget);
        setOpenPoper((prev) => !prev);
        forceUpdate();
    };
    const { LayerControl, changeCenter } = useLayerContext();
    return (
        <>
            <DropSection id={index} isDragging={isDragging} colors={colors} />
            <Box
                display={"inline-flex"}
                alignContent={"center"}
                width={"100%"}
                ref={drag}
                cursor="move"
            >
                <Checkbox
                    checked={layer.show}
                    onChange={(value) => {
                        LayerControl(index);
                    }}
                    icon={<VisibilityOffIcon />}
                    checkedIcon={<VisibilityIcon />}
                />
                <Typography
                    alignSelf={"center"}
                    textAlign={"center"}
                    color={colors.black["300"]}
                    variant="h5"
                >
                    |
                </Typography>

                <Box
                    display={"flex"}
                    alignItems={"center"}
                    fontSize={"16px"}
                    width={"65%"}
                >
                    {getIcon(layer.type)}
                    {!collapsed && (
                        <Typography fontSize="14px" alignContent={"center"}>
                            {layer.name.length > 15
                                ? layer.name.substring(0, 15) + "..."
                                : layer.name}
                        </Typography>
                    )}
                </Box>
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                >
                    <Tooltip title="Zoomer sur La Layer">
                        <IconButton
                            size="small"
                            onClick={() =>
                                layer.type === "raster"
                                    ? changeCenter([
                                          layer.data.lat,
                                          layer.data.lon,
                                      ])
                                    : changeCenter(
                                          layer.data.features[0].geometry.coordinates[0].toReversed()
                                      )
                            }
                        >
                            <ZoomInIcon fontSize="14px" />
                        </IconButton>
                    </Tooltip>
                    {layer.type !== "raster" && (
                        <>
                            <hr
                                style={{
                                    width: "50%",
                                    border: `1.3px solid ${colors.black["600"]}`,
                                    margin: "0",
                                }}
                            />
                            <Tooltip title="Filter">
                                <IconButton
                                    size="small"
                                    onClick={(event) =>
                                        handleClick(filterIndex, event)
                                    }
                                >
                                    <FilterAltIcon fontSize="14px" />
                                </IconButton>
                            </Tooltip>
                        </>
                    )}
                </Box>
            </Box>
            {/* =============================== FILTER POPER */}
            {openPoper && filterObject && layer.type !== "raster" && (
                <Popper
                    open={openPoper}
                    anchorEl={anchorEl}
                    placement="right-end"
                    transition
                    style={{ zIndex: 100000 }}
                >
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={200}>
                            <Box
                                sx={{
                                    p: "5px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-around",
                                    flexDirection: "column",
                                    width: "300px",
                                    height: "60px",
                                    bgcolor: `${colors.white[500]}`,
                                    zIndex: "100000",
                                    border: `1px solid ${colors.indigo[500]}`,
                                    borderRadius: "5px",
                                    ml: "12px",
                                }}
                            >
                                <Box display={"flex"} alignItems={"center"}>
                                    <Tooltip title="Activation du filtre">
                                        <Checkbox
                                            checked={filterObject.active}
                                            onChange={(value) => {
                                                {
                                                    filterObject.active =
                                                        !filterObject.active;
                                                    setfilterObject(
                                                        filterIndex,
                                                        filterObject
                                                    );
                                                    forceUpdate();
                                                    FilterValues(index);
                                                }
                                            }}
                                        />
                                    </Tooltip>
                                    <Box width={"70%"}>
                                        <form>
                                            <select
                                                value={filterObject.prop}
                                                onChange={(event) =>
                                                    //setFilterProp(event.target.value)
                                                    {
                                                        filterObject.prop =
                                                            event.target.value;
                                                        setfilterObject(
                                                            filterIndex,
                                                            filterObject
                                                        );
                                                        forceUpdate();
                                                    }
                                                }
                                                style={{
                                                    width: "50px",
                                                }}
                                            >
                                                <option key={0} value={null}>
                                                    {"Select"}
                                                </option>
                                                {uniqueOptions.map(
                                                    (key, index) => (
                                                        <option
                                                            key={index}
                                                            value={key}
                                                        >
                                                            {key}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                            <select
                                                value={filterObject.operator}
                                                onChange={(event) => {
                                                    filterObject.operator =
                                                        event.target.value;
                                                    setfilterObject(
                                                        filterIndex,
                                                        filterObject
                                                    );
                                                    forceUpdate();
                                                }}
                                                style={{
                                                    width: "50px",
                                                }}
                                            >
                                                <option key="0" value={null}>
                                                    {" "}
                                                    {"Oper."}
                                                </option>
                                                <option key="1" value={"sup"}>
                                                    {">"}
                                                </option>
                                                <option key="2" value={"inf"}>
                                                    {"<"}
                                                </option>
                                                <option key="3" value={"equal"}>
                                                    {"="}
                                                </option>
                                            </select>
                                            <input
                                                onChange={(event) => {
                                                    filterObject.value =
                                                        event.target.value;
                                                    setfilterObject(
                                                        filterIndex,
                                                        filterObject
                                                    );
                                                    forceUpdate();
                                                }}
                                                value={filterObject.value}
                                                type="text"
                                                style={{
                                                    width: "50px",
                                                }}
                                            />
                                        </form>
                                    </Box>
                                    <Box ml="5px" width={"30%"}>
                                        <Tooltip title="Lancer le filtrage">
                                            <IconButton
                                                sx={{
                                                    width: "50%",
                                                }}
                                                variant="contained"
                                                size="small"
                                                onClick={() =>
                                                    FilterValues(index)
                                                }
                                            >
                                                <SearchIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Isoler Les Elements filtres">
                                            <Checkbox
                                                sx={{
                                                    width: "25%",
                                                }}
                                                checked={filterObject.show}
                                                onChange={(value) => {
                                                    {
                                                        filterObject.show =
                                                            !filterObject.show;
                                                        setfilterObject(
                                                            filterIndex,
                                                            filterObject
                                                        );
                                                        forceUpdate();
                                                        FilterValues(index);
                                                    }
                                                }}
                                                icon={
                                                    <RemoveCircleOutlineIcon />
                                                }
                                                checkedIcon={
                                                    <RemoveCircleIcon />
                                                }
                                            />
                                        </Tooltip>
                                    </Box>
                                </Box>
                            </Box>
                        </Fade>
                    )}
                </Popper>
            )}
            <hr
                style={{
                    border: `1px solid ${colors.black["400"]}`,
                    margin: "2px",
                }}
            />
        </>
    );
}

function getIcon(type) {
    if (type.includes("Point")) {
        return <WorkspacesIcon color="primary" style={{ margin: "10px" }} />;
    } else if (type.includes("Polygone")) {
        return <ShowChartIcon color="primary" style={{ margin: "10px" }} />;
    } else if (type.includes("Line")) {
        return <PolylineIcon color="primary" style={{ margin: "10px" }} />;
    } else if (type === "raster") {
        return (
            <PhotoSizeSelectActualIcon
                color="primary"
                style={{ margin: "10px" }}
            />
        );
    } else {
        return <LayersIcon color="primary" style={{ margin: "10px" }} />;
    }
}

function getUniqueOptions(opts) {
    var arr = [];
    for (let key in opts) {
        arr.push(key);
    }
    return arr;
}

const LayerSideBar = () => {
    const { collapseSidebar, toggleSidebar, collapsed } = useProSidebar();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { Layers, FilterValues, LayerControl, filterObject } =
        useLayerContext();
    const [newFilterObject, setNewFilterObject] = useState(filterObject);

    useEffect(() => {
        if (filterObject) {
            setNewFilterObject(filterObject);
        }
    }, [filterObject]);

    const UpdateFilterObject = (index, object) => {
        let arrbuff = newFilterObject;
        arrbuff[index] = object;
        setNewFilterObject(arrbuff);
    };
    const separatorStyle =
        theme.palette.mode === "light"
            ? colors.black[400]
            : colors.turquoise[600];
    return (
        <div
            style={{
                display: "flex",
                position: "absolute",
                minHeight: "1000px",
                height: "100%",
                position: "sticky",
                top: 0,
            }}
        >
            <Sidebar
                transitionDuration={500}
                rootStyles={{
                    [`.${sidebarClasses.container}`]: {
                        boxShadow: `${
                            collapsed
                                ? "1px 5px 10px -5px black"
                                : "1px 5px 15px -1px black"
                        }`,
                        backgroundColor: `${
                            theme.palette.mode === "dark"
                                ? colors.white[700]
                                : colors.white[900]
                        } !important`,
                        width: `${collapsed ? "120px" : "250px"}`,
                    },
                    border: "none",
                    width: "250px",
                }}
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    ml="15px"
                    color={colors.black[300]}
                >
                    {!collapsed && (
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            margin="auto"
                        >
                            Layers
                        </Box>
                    )}
                    <IconButton onClick={() => collapseSidebar()}>
                        <MenuOutlinedIcon />
                    </IconButton>
                </Box>

                <hr
                    style={{
                        border: `1.5px solid ${colors.black["400"]}`,
                        margin: "5px",
                    }}
                />
                {Layers.map((layer, index) => {
                    let filterIndex = newFilterObject.indexOf(
                        newFilterObject.find((element) => {
                            return element.layer === layer.id;
                        })
                    );

                    return (
                        <>
                            <DndProvider backend={HTML5Backend}>
                                <LayerItem
                                    key={index}
                                    layer={layer}
                                    index={index}
                                    colors={colors}
                                    collapsed={collapsed}
                                    filterObject={newFilterObject[filterIndex]}
                                    setfilterObject={(index, object) =>
                                        UpdateFilterObject(index, object)
                                    }
                                    filterIndex={filterIndex}
                                    FilterValues={() =>
                                        FilterValues(newFilterObject)
                                    }
                                />
                            </DndProvider>
                        </>
                    );
                })}
            </Sidebar>
        </div>
    );
};

export default LayerSideBar;
