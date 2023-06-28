import React from "react";
import "./UserSingle.css";
import DataTable from "react-data-table-component";
import FileIcon from "@mui/icons-material/InsertDriveFile";
import major from "../../../images/Major.jpg";
import DownloadIcon from "@mui/icons-material/Download";
import Button from "react-bootstrap/Button";
import {
    Box,
    useTheme,
    TextField,
    Typography,
    IconButton,
    MenuItem,
} from "@mui/material";

function userSingle1() {
    const columns = [
        {
            name: "icon",
            selector: (row) => row.icon,
            sortable: true,
            width: "100px",
            cell: (row) => (
                <div style={{ fontSize: "90px" }}>
                    <FileIcon className="file-icon" />
                </div>
            ),
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Dernière modification",
            selector: (row) => row.modif,
            sortable: true,
            width: "200px",
        },
        {
            name: "taille",
            selector: (row) => row.age,
            sortable: true,
            width: "100px",
        },
    ];
    const dataq = [
        {
            id: 1,
            name: "mehdi",
            modif: "31-05-2023 11:30",
            age: 45,
        },
        {
            id: 1,
            name: "mehdi",
            modif: "31-05-2023 11:30",
            age: 45,
        },
        {
            id: 1,
            name: "mehdi",
            modif: "31-05-2023 11:30",
            age: 45,
        },
    ];
    const defaultIconData = {
        id: 4,
        icon: <i className="fa-solid fa-file"></i>, // Icône par défaut
        name: "Default Icon",
        modif: "N/A",
        age: 0,
    };

    return (
        <div
            className="project-container"
            style={{
                backgroundImage: `url(${major})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="project-name">
                <p className="project-text">Projet: IGNY-USSE /OX2</p>

                <Button variant="" className="project-button">
                    Téléchager tout le projet
                    <DownloadIcon />
                </Button>
            </div>

            <div className="project-table">
                <DataTable columns={columns} data={dataq} />
            </div>
            <div className="project-footer">
                <p className="project-footer"> </p>
            </div>
            <Box width="80%" m="30px auto 40px auto"></Box>
        </div>
    );
}

export default userSingle1;
