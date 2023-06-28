import ProjectBar from "../global/ProjectBarF/ProjectBar";
import ProjectsGeoData from "../../ProjectsGeoData";
import ProjectsMap from "./ProjectsMap";
import TestGraphs from "./TestGraphs";
import "../global/ProjectBarF/ProjectBar.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, IconButton, useTheme, Button } from "@mui/material";
import { tokens } from "../../../theme";
import { useData } from "../../../contexts/DataContext";
import Loading from "../global/loading";
import useMediaQuery from "@mui/material/useMediaQuery";

const UserProjects = () => {
    const isNonMobile = useMediaQuery("(min-width:700px)");
    let navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { projectsData, fetchProjectsData } = useData();
    const [loading, setLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    const iconStyle =
        theme.palette.mode === "light" ? colors.white[500] : colors.black[200];
    useEffect(() => {
        if (loading) {
            fetchProjectsData();
            setLoading(false);
        }
        if (projectsData) {
            setDataLoaded(true);
        }
    }, [projectsData, loading]);

    return (
        <div className="projectscreen">
            {dataLoaded ? (
                <>
                    <Box height={"80%"} width={"93%"}>
                        <ProjectsMap />
                    </Box>
                    <div className="projectbar-container">
                        <ProjectBar projectItem={projectsData} />
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
};
export default UserProjects;
