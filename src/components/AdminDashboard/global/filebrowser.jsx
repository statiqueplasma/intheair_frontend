import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ImageIcon from "@mui/icons-material/Image";
import { Box, Button, Typography, useTheme } from "@mui/material";
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
import { useData } from "../../../contexts/DataContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";

import FolderOffIcon from "@mui/icons-material/FolderOff";

const NestedFileBrowser = ({ title, files, filetypes, extention, project }) => {
    let navigate = useNavigate();
    const [toggles, setToggles] = useState({});
    const [load, setload] = useState(true);
    const [openPoper, setOpenPoper] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { deleteProjectFile } = useData();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenPoper((openPoper) => !openPoper);
    };
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

    const labelOf = (obj, id) => {
        for (let i = 0; i < obj.length; i++) {
            if (obj[i]["id"] === Number(id)) {
                return obj[i]["label"];
            }
        }
    };

    const extOf = (obj, id) => {
        for (let i = 0; i < obj.length; i++) {
            if (obj[i]["id"] === Number(id)) {
                return obj[i]["extention"];
            }
        }
    };

    const FolderIcon = (id) => {
        const label = labelOf(filetypes, id);

        switch (label.toLowerCase()) {
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
    const FileIcon = (id) => {
        const label = extOf(extention, id);
        switch (label.toLowerCase()) {
            case "shapefile":
                return <TerrainIcon fontSize="inherit" />;
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
                a.download = project.name.replace(" ", "_");
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
                    {title}
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
                {files.length > 0 ? (
                    files.map((file) => {
                        return (
                            <Box key={file.id}>
                                <Popper
                                    open={openPoper}
                                    anchorEl={anchorEl}
                                    placement="bottom-end"
                                    transition
                                >
                                    {({ TransitionProps }) => (
                                        <Fade
                                            {...TransitionProps}
                                            timeout={200}
                                        >
                                            <Box
                                                sx={{
                                                    p: "5px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent:
                                                        "space-around",
                                                    flexDirection: "column",
                                                    width: "350px",
                                                    height: "180px",
                                                    bgcolor: `${colors.white[500]}`,

                                                    border: `1px solid ${colors.indigo[500]}`,
                                                    borderRadius: "5px",
                                                }}
                                            >
                                                <Typography
                                                    p="5px"
                                                    width="90%"
                                                    variant="h7"
                                                    color={colors.black[500]}
                                                >
                                                    Are you Sure you want to
                                                    DELETE This Folder and It's
                                                    Files
                                                    <br />
                                                    All related Data will be
                                                    Deleted.
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        alignSelf: "end",
                                                        justifyContent:
                                                            "space-between",
                                                    }}
                                                >
                                                    <Button
                                                        onClick={() =>
                                                            setOpenPoper(false)
                                                        }
                                                        color="primary"
                                                        variant="contained"
                                                        sx={{
                                                            p: "5px 10px",
                                                            m: "0 10px",
                                                        }}
                                                        endIcon={
                                                            <DoNotDisturbAltIcon />
                                                        }
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            deleteProjectFile(
                                                                file.id,
                                                                project.id
                                                            );
                                                            navigate(
                                                                `/admin/project/${project.id}`
                                                            );
                                                            setOpenPoper(false);
                                                        }}
                                                        color="error"
                                                        variant="contained"
                                                        sx={{
                                                            p: "5px 10px",
                                                            mr: "10px",
                                                        }}
                                                        endIcon={
                                                            <DeleteForeverIcon />
                                                        }
                                                    >
                                                        Delete
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Fade>
                                    )}
                                </Popper>
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
                                            Download folder
                                        </Typography>
                                        <SystemUpdateAltIcon />
                                    </Button>
                                    <Button
                                        p="10px"
                                        height="50px"
                                        color="error"
                                        display="flex"
                                        onClick={(e) => {
                                            handleClick(e);
                                        }}
                                    >
                                        <Typography mr="10px">
                                            Delete folder
                                        </Typography>
                                        <DeleteIcon />
                                    </Button>
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
