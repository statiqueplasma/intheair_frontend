import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ImageIcon from "@mui/icons-material/Image";
import { Box, Button, Typography, useTheme, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { tokens } from "../../../theme";
import Divider from "@mui/material/Divider";
import TerrainIcon from "@mui/icons-material/Terrain";
import MapIcon from "@mui/icons-material/Map";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FilterIcon from "@mui/icons-material/Filter";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import DownloadIcon from "@mui/icons-material/Download";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
import DeleteIcon from "@mui/icons-material/Delete";
import EyeIcon from "@mui/icons-material/RemoveRedEye";
import { useData } from "../../../contexts/DataContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import { Navigate, useNavigate } from "react-router-dom";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import LayersIcon from "@mui/icons-material/Layers";
import FolderOffIcon from "@mui/icons-material/FolderOff";
import Loading from "./loading";

const NestedFileBrowser = ({ title, files, filetypes, extention, project }) => {
    let navigate = useNavigate();
    const [openPoperPdf, setOpenPoperPdf] = useState(false);
    const [openPoperImage, setOpenPoperImage] = useState(false);
    const [image, setImage] = useState();

    const [toggles, setToggles] = useState({});
    const [load, setload] = useState(true);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { deleteProjectFile } = useData();

    const createToggler = () => {
        files.map((file) => {
            setToggles({
                ...toggles,
                [file.id]: false,
            });
        });
    };
    const Toggle = (id) => {
        setToggles({
            ...toggles,
            [id]: !toggles[id],
        });
    };
    useEffect(() => {
        if (load) {
            createToggler();
            setload(false);
        }
    }, [load]);
    const allowed = ["geo_file", "analytics", "images", "pdf"];
    const checkExists = (array, elem) => {
        let result = array.indexOf(elem) > -1;
        return result;
    };
    const FolderIcon = (file_type) => {
        switch (file_type.toLowerCase()) {
            case "geo_file":
                return <MapIcon fontSize="inherit" />;
            case "analytics":
                return <BackupTableIcon fontSize="inherit" />;
            case "images":
                return <FilterIcon fontSize="inherit" />;
            case "3d":
                return <ThreeDRotationIcon fontSize="inherit" />;
            case "pdf":
                return <PictureAsPdfIcon fontSize="inherit" />;
            default:
                return <FileCopyIcon fontSize="inherit" />;
        }
    };
    const FileIcon = (file_ext) => {
        switch (file_ext.toLowerCase()) {
            case "shapefile":
                return <TerrainIcon fontSize="inherit" />;
            case "raster":
                return <LayersIcon fontSize="inherit" />;
            case "xlsx":
                return <DataThresholdingIcon fontSize="inherit" />;
            case "csv":
                return <DataThresholdingIcon fontSize="inherit" />;
            case "jpeg":
                return <ImageIcon fontSize="inherit" />;
            case "png":
                return <ImageIcon fontSize="inherit" />;
            case "pdf":
                return <PictureAsPdfIcon fontSize="inherit" />;
            default:
                return <InsertDriveFileIcon fontSize="inherit" />;
        }
    };

    const downloadFolder = async (project, file, filename) => {
        let response = await fetch(`/api/download/${project.id}/${file}`, {
            method: "GET",
        })
            .then((resp) => resp.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                a.download = `${filename.replace(" ", "_")}.zip`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(() => alert("Couldn't download the File"));
    };

    const downloadProject = async (project) => {
        let response = await fetch(`/api/download/project/${project.id}`, {
            method: "GET",
        })
            .then((resp) => resp.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                a.download = `${project.name.replace(" ", "_")}.zip`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(() => alert("Couldn't download the File"));
    };
    return (
        <Box>
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
            >
                <Typography
                    color={colors.indigo["400"]}
                    fontSize="20px"
                    mb="5px"
                >
                    {/* {title} */}
                </Typography>
                {files.length > 0 && (
                    <Button
                        variant="contained"
                        p="10px"
                        height="50px"
                        bgcolor="grey"
                        display="flex"
                        onClick={() => {
                            downloadProject(project);
                        }}
                    >
                        <Typography mr="10px">Download All Project</Typography>
                        <BrowserUpdatedIcon />
                    </Button>
                )}
            </Box>
            <List
                sx={{
                    width: "100%",
                    bgcolor: colors.white["700"],
                    color: colors.indigo["500"],
                    borderRadius: "7px",
                }}
            >
                {files && files.length > 0 ? (
                    files.map((file) => {
                        let showEye = checkExists(
                            allowed,
                            file.file_type.toLowerCase()
                        );

                        return (
                            <Box key={file.id}>
                                <ListItem
                                    button
                                    divider
                                    onClick={() => {
                                        Toggle(file.id);
                                    }}
                                >
                                    <ListItemAvatar
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "40px",
                                        }}
                                    >
                                        {FolderIcon(file.file_type)}
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Box>
                                                {file.name}
                                                {!toggles[file.id] ? (
                                                    <ExpandMoreIcon
                                                        style={{
                                                            marginLeft: "15px",
                                                        }}
                                                    />
                                                ) : (
                                                    <ExpandLessIcon
                                                        style={{
                                                            marginLeft: "15px",
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        }
                                        secondary={file.last_edit}
                                    />
                                    <Button
                                        p="10px"
                                        height="50px"
                                        bgcolor="grey"
                                        display="flex"
                                        onClick={() => {
                                            downloadFolder(
                                                project,
                                                file.id,
                                                file.name
                                            );
                                        }}
                                    >
                                        <Typography mr="10px">
                                            {/* Download folder */}
                                        </Typography>
                                        <SystemUpdateAltIcon />
                                    </Button>
                                    {showEye && (
                                        <Button
                                            p="10px"
                                            height="50px"
                                            display="flex"
                                            onClick={() => {
                                                if (
                                                    file.file_type.toLowerCase() ===
                                                    "geo_file"
                                                ) {
                                                    window.open(
                                                        `/mapview/${project.id}/${file.id}`,
                                                        "_blank"
                                                    );
                                                } else if (
                                                    file.file_type.toLowerCase() ===
                                                    "analytics"
                                                ) {
                                                    navigate(
                                                        `/dashboard/analytics/${file.id}/${file.name}`
                                                    );
                                                } else if (
                                                    file.file_type.toLowerCase() ===
                                                    "images"
                                                ) {
                                                    setImage(
                                                        file.files[0].file
                                                    );
                                                    setOpenPoperImage(true);
                                                } else if (
                                                    file.file_type.toLowerCase() ===
                                                    "pdf"
                                                ) {
                                                    window.open(
                                                        file.files[0].file,
                                                        "_blank",
                                                        "rel=noopener noreferrer"
                                                    );
                                                }
                                            }}
                                        >
                                            <Typography mr="10px">
                                                {/* Delete folder */}
                                            </Typography>

                                            <EyeIcon />
                                        </Button>
                                    )}
                                </ListItem>
                                {file.files &&
                                    toggles[file.id] &&
                                    file.files.map((subfile) => {
                                        return (
                                            <Box ml="40px" key={subfile.id}>
                                                <ListItem button divider>
                                                    <ListItemAvatar
                                                        style={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                            fontSize: "40px",
                                                        }}
                                                    >
                                                        {FileIcon(
                                                            subfile.file_type
                                                        )}
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={
                                                            subfile.file.split(
                                                                "/"
                                                            )[
                                                                subfile.file.split(
                                                                    "/"
                                                                ).length - 1
                                                            ]
                                                        }
                                                        secondary={
                                                            subfile.last_edit
                                                        }
                                                    />
                                                    <Button
                                                        variant="contained"
                                                        p="10px"
                                                        height="50px"
                                                        bgcolor="grey"
                                                        display="flex"
                                                        href={subfile.file}
                                                    >
                                                        <Typography mr="10px">
                                                            Download
                                                        </Typography>
                                                        <DownloadIcon />
                                                    </Button>
                                                </ListItem>
                                                <Divider light />
                                            </Box>
                                        );
                                    })}
                                {openPoperImage && (
                                    <Box
                                        position="fixed"
                                        left="0"
                                        top="0"
                                        height="100%"
                                        width="100%"
                                        zIndex="20"
                                        sx={{
                                            backdropFilter: "blur(9px)",
                                            backgroundColor: "rgba(0,0,0,0.5)",
                                        }}
                                    >
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                            width="90%"
                                            m="auto"
                                            mt="5px"
                                            height="97%"
                                            sx={{
                                                bgcolor: `${colors.white[500]}`,

                                                border: `1px solid ${colors.indigo[500]}`,
                                                borderRadius: "5px",
                                            }}
                                        >
                                            <Box
                                                width="100%"
                                                height="50px"
                                                display="flex"
                                                zIndex="5"
                                                justifyContent="end"
                                            >
                                                <IconButton
                                                    mr="10px"
                                                    sx={{
                                                        fontSize: "30px",
                                                        color: `${
                                                            theme.palette
                                                                .mode ===
                                                            "light"
                                                                ? colors
                                                                      .black[500]
                                                                : colors
                                                                      .white[200]
                                                        }`,
                                                        "&:hover": {
                                                            color: `${
                                                                theme.palette
                                                                    .mode ===
                                                                "light"
                                                                    ? colors
                                                                          .black[200]
                                                                    : colors
                                                                          .black[100]
                                                            }`,
                                                            cursor: "pointer",
                                                        },
                                                    }}
                                                    onClick={() => {
                                                        setOpenPoperImage(
                                                            false
                                                        );
                                                    }}
                                                >
                                                    <CloseIcon fontSize="30px" />
                                                </IconButton>
                                            </Box>
                                            <Box
                                                width="100%"
                                                height="90%"
                                                display="flex"
                                                flexDirection="column"
                                                justifyContent="start"
                                            >
                                                <img
                                                    src={image}
                                                    style={{
                                                        height: "100%",
                                                        objectFit: "contain",
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        );
                    })
                ) : (
                    <Box
                        display="flex"
                        alignItems="center"
                        flexDirection="column"
                        height="150px"
                        fontSize="80px"
                    >
                        <FolderOffIcon fontSize="80px" />
                        <Typography variant="h3" align="center">
                            No File
                        </Typography>
                    </Box>
                )}
            </List>
        </Box>
    );
};

export default NestedFileBrowser;
