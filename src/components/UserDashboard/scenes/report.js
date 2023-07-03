import Header from "../global/header";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useReactToPrint } from "react-to-print";
import logo from "../../../images/logoBlanc.webp";
import {
    Box,
    useTheme,
    TextField,
    Button,
    Typography,
    IconButton,
    MenuItem,
} from "@mui/material";
import { tokens } from "../../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useData } from "../../../contexts/DataContext";
import Loading from "../global/loading";
import SectionUser from "../global/sectionUser";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";

const ReportPage1 = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    let navigate = useNavigate();
    const { fetchReport, reportData, deleteReport } = useData();
    const componentRef = useRef();
    const handleprint = useReactToPrint({
        content: () => componentRef.current,
        pageStyle: "@page { size: auto;  margin: 15mm; }",
    });
    const [loading, setLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);

    const { id } = useParams();

    const isNonMobile = useMediaQuery("(min-width:700px)");

    useEffect(() => {
        if (loading) {
            if (id !== undefined) {
                fetchReport(id);
            }

            setLoading(false);
        } else {
            if (reportData) {
                setDataLoaded(true);
            }
        }
    }, [loading, reportData]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            minHeight="800px"
            height="100%"
            mt="20px"
        >
            <Box width="50px" m="auto" mb="20px">
                <Button
                    variant="contained"
                    sx={{ height: "50px" }}
                    onClick={handleprint}
                >
                    <LocalPrintshopIcon /> {"  Print Report"}
                </Button>
            </Box>

            {dataLoaded ? (
                <Box
                    width="80%"
                    m="auto"
                    p="50px"
                    sx={{ backgroundColor: "white" }}
                >
                    <Box ref={componentRef}>
                        <Box
                            width={"100%"}
                            height={"26cm"}
                            sx={{ backgroundColor: "#7d52b4" }}
                        >
                            <Box
                                display="inline-flex"
                                width={"100%"}
                                justifyContent="space-around"
                                flexWrap="wrap"
                                alignItems="center"
                                p="20px"
                            >
                                {reportData[0].logos.map((logo) => {
                                    return (
                                        <img
                                            src={logo.logo}
                                            style={{
                                                width: "auto",
                                                height: "80px",
                                                margin: "5px",
                                            }}
                                        />
                                    );
                                })}
                            </Box>
                            <Box
                                m="100px auto 0 auto"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <img
                                    alt="intheair"
                                    src={logo}
                                    width="500px"
                                    height="auto"
                                />
                            </Box>
                            <Box
                                width="80%"
                                display="flex"
                                justifyContent="center"
                                height="150px"
                                border="3px solid white"
                                m="5px auto 100px auto"
                                alignItems="center"
                            >
                                <Typography
                                    textAlign="center"
                                    variant="h4"
                                    fontWeight="bold"
                                    color={"white"}
                                >
                                    {reportData[0].name}
                                </Typography>
                            </Box>
                            <Box width="80%" m="20px auto 0 auto">
                                <Box display="flex" width="100%" m="auto">
                                    <Typography
                                        variant="h5"
                                        fontWeight="bold"
                                        color={"white"}
                                    >
                                        Site :
                                    </Typography>
                                    <Typography
                                        color={"white"}
                                        variant="h6"
                                        fontWeight="normal"
                                    >
                                        {reportData[0].site}
                                    </Typography>
                                </Box>

                                <Box display="flex" m="auto" width="100%">
                                    <Typography
                                        variant="h5"
                                        fontWeight="bold"
                                        color={"white"}
                                    >
                                        Adresse :
                                    </Typography>
                                    <Typography
                                        color={"white"}
                                        variant="h6"
                                        fontWeight="normal"
                                    >
                                        {reportData[0].adresse}
                                    </Typography>
                                </Box>
                                <Box display="flex" m="auto" width="100%">
                                    <Typography
                                        variant="h5"
                                        fontWeight="bold"
                                        color={"white"}
                                    >
                                        Etude réalisé le :
                                    </Typography>
                                    <Typography
                                        color={"white"}
                                        variant="h6"
                                        fontWeight="normal"
                                    >
                                        {reportData[0].date}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <SectionUser sections={reportData[0].sections} />
                    </Box>
                </Box>
            ) : (
                <Loading />
            )}
        </Box>
    );
};

export default ReportPage1;
