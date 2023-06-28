import { useState } from "react";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import {
    Button,
    Box,
    useTheme,
    TextField,
    Typography,
    MenuItem,
    Checkbox,
} from "@mui/material";
import { tokens } from "../../../theme";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Header from "./header";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import SaveIcon from "@mui/icons-material/Save";
import { useAuth } from "../../../contexts/AuthContext";
import ReportIcon from "@mui/icons-material/Report";
const SectionForm = ({
    titlein,
    contentin,
    graphin,
    files,
    project,
    id,
    dataTypes,
    report,
}) => {
    const graphTypes = [
        { value: "DONUT", key: "Donut Graph" },
        { value: "LINE", key: "Line Graph" },
        { value: "BARS", key: "Bar Graph" },
    ];
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { authTokens } = useAuth();
    const [title, setTitle] = useState(titlein);
    const [content, setContent] = useState(contentin);
    const [projectFile, setProjectFile] = useState(
        graphin ? (graphin.project_file ? graphin.project_file : null) : null
    );
    const [data, setData] = useState(
        graphin ? (graphin.data_type ? graphin.data_type : null) : null
    );
    const [seeGraph, setSeeGraph] = useState(true);
    const [loading, setLoading] = useState(true);
    const get_fields = () => {
        if (graphin) {
            var data_type = dataTypes.find(
                (element) => element.id === graphin.data_type
            );

            return data_type ? data_type.fields : [];
        } else return [];
    };
    const [graphType, setGraphType] = useState(
        graphin ? (graphin.graph_type ? graphin.graph_type : null) : null
    );
    const [graphname, setGraphName] = useState(
        graphin ? (graphin.name ? graphin.name : null) : null
    );
    const [fields, setFields] = useState(get_fields());
    const [graph, setGraph] = useState(graphin ? graphin.id : null);
    const [ERROR, SETERROR] = useState(null);

    var toolbarOptions = [
        ["bold"], // toggled buttons
        ["italic"], // toggled buttons
        ["underline"], // toggled buttons
        ["strike"], // toggled buttons
        [{ size: ["small", false, "large", "huge"] }],
        [{ list: "ordered" }],
        [{ list: "bullet" }],
        [{ script: "sub" }],
        [{ script: "super" }], // superscript/subscript
        [{ indent: "-1" }],
        [{ indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction
        [{ align: [] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        ["blockquote"],
        ["code-block"],
        ["link", "image"],
        ["clean"], // remove formatting button
    ];

    const [x_label, setx_label] = useState(
        graphin ? (graphin.x_label ? graphin.x_label : null) : null
    );

    const [y_label, sety_label] = useState(
        graphin ? (graphin.y_label ? graphin.y_label : null) : null
    );

    const [y2_label, sety2_label] = useState(
        graphin ? (graphin.y2_label ? graphin.y2_label : null) : null
    );

    const [field_x, setfield_x] = useState(
        graphin ? (graphin.field_x ? graphin.field_x : null) : null
    );
    const [field_y, setfield_y] = useState(
        graphin ? (graphin.field_y ? graphin.field_y : null) : null
    );
    const [field_y2, setfield_y2] = useState(
        graphin ? (graphin.field_y2 ? graphin.field_y2 : null) : null
    );

    const changeData = (event) => {
        var data_type_id = event.target.value.data_type;
        setData(data_type_id);
        var data_type = dataTypes.find(
            (element) => element.id === data_type_id
        );
        setFields(data_type ? data_type.fields : []);
        setfield_x(null);
        setfield_y(null);
        setfield_y2(null);
        setProjectFile(event.target.value.id);
    };

    const CreateGraph = async () => {
        let graph_obj = {
            project_file: projectFile,
            section: [10],
            name: null,
            graph_type: graphType,
            x_label: null,
            y_label: null,
            y2_label: null,
            field_x: field_x,
            field_y: field_y,
            field_y2: field_y2,
        };
        if (graphname !== null && graphname.trim() !== "") {
            graph_obj.name = graphname;
        }
        if (x_label !== null && x_label.trim() !== "") {
            graph_obj.x_label = x_label;
        }
        if (y_label !== null && y_label.trim() !== "") {
            graph_obj.y_label = y_label;
        }
        if (y2_label !== null && y2_label.trim() !== "") {
            graph_obj.y2_label = y2_label;
        }

        console.log(graph_obj);

        let response = await fetch(`/api/graph/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authTokens.access}`,
            },
            body: JSON.stringify(graph_obj),
        });

        var success = response.ok;
        response.json().then((res) => {
            if (success) {
                setGraph(res.id);
                updateSectionContent();
            }
        });
    };

    const updateGraph = async () => {
        let graph_obj = {
            project_file: projectFile,
            name: null,
            graph_type: graphType,
            x_label: null,
            y_label: null,
            y2_label: null,
            field_x: field_x,
            field_y: field_y,
            field_y2: field_y2,
        };
        if (graphname !== null && graphname.trim() !== "") {
            graph_obj.name = graphname;
        }
        if (x_label !== null && x_label.trim() !== "") {
            graph_obj.x_label = x_label;
        }
        if (y_label !== null && y_label.trim() !== "") {
            graph_obj.y_label = y_label;
        }
        if (y2_label !== null && y2_label.trim() !== "") {
            graph_obj.y2_label = y2_label;
        }

        let response = await fetch(`/api/graph/${graph}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authTokens.access}`,
            },
            body: JSON.stringify(graph_obj),
        });

        var success = response.ok;
        response.json().then((res) => {
            if (success) {
                setGraph(res.id);
            }
        });
    };
    const updateSectionContent = async () => {
        console.log(title);
        let section = {
            report: report,
            title: null,
            content: null,
            graph: null,
        };
        if (title !== null && title.trim() !== "") {
            section.title = title;
        }
        if (graph !== null) {
            section.graph = graph;
        }
        if (content !== null && content.trim() !== "") {
            section.content = content;
        }
        let response = await fetch(`/api/section/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authTokens.access}`,
            },
            body: JSON.stringify(section),
        });
        var buff = "";
        var success = response.ok;
        response.json().then((res) => {
            if (success) {
                window.location.reload();
            } else {
                for (var key in res) {
                    buff = buff + key + " : " + `${res[key]} `;
                }
                SETERROR(buff);
            }
        });
    };
    const cancelGraph = () => {
        setGraph(null);
        setfield_x(null);
        setfield_y(null);
        setfield_y2(null);
        setx_label(null);
        sety_label(null);
        sety2_label(null);
        setData(null);
        setGraphName(null);
        setGraphType(null);
        setProjectFile(null);
    };
    return (
        <>
            <Box width="80%" height="100%" m="auto">
                <Box
                    display="grid"
                    gap="30px"
                    mt="20px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                        "& > div": {
                            gridColumn: "span 4",
                        },
                    }}
                >
                    <TextField
                        sx={{ gridColumn: "span 4" }}
                        id="sectiontitle"
                        label="Title"
                        variant="outlined"
                        value={title}
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}
                    />
                </Box>
                <Box
                    width="100%"
                    mt="20px"
                    sx={{
                        "& .ql-toolbar .ql-stroke": {
                            fill: "none",
                            stroke: `${
                                theme.palette.mode === "light"
                                    ? colors.black[500]
                                    : colors.white[200]
                            } !important`,
                        },
                        "& .ql-toolbar .ql-fill": {
                            fill: "none",
                            stroke: `${
                                theme.palette.mode === "light"
                                    ? colors.black[200]
                                    : colors.white[100]
                            } !important`,
                        },
                        "& .ql-toolbar .ql-picker:hover": {
                            backgroundColor: `${
                                theme.palette.mode === "light"
                                    ? colors.black[100]
                                    : colors.white[400]
                            } !important`,
                        },
                        "& .ql-toolbar .ql-formats:hover": {
                            backgroundColor: `${
                                theme.palette.mode === "light"
                                    ? colors.black[100]
                                    : colors.white[400]
                            } !important`,
                        },
                        "& .ql-toolbar .ql-formats  .ql-active  ": {
                            backgroundColor: `${colors.indigo[100]} !important`,
                        },
                        "& .ql-toolbar .ql-picker": {
                            color: `${
                                theme.palette.mode === "light"
                                    ? colors.black[500]
                                    : colors.white[100]
                            } !important`,
                        },
                        "& .ql-toolbar .ql-picker .ql-picker-item:hover": {
                            color: `${colors.indigo[500]} !important`,
                        },
                        "& .ql-toolbar .ql-picker .ql-picker-label:hover": {
                            color: `${colors.indigo[500]} !important`,
                        },
                    }}
                >
                    <Typography mb="10px" variant="h6">
                        Edit Content :
                    </Typography>
                    <ReactQuill
                        modules={{ toolbar: toolbarOptions }}
                        value={content}
                        onChange={setContent}
                    />
                </Box>
                <Box width="100%" mt="20px">
                    <Box display="flex" alignItems="center">
                        <Checkbox
                            checked={seeGraph}
                            onChange={(value) => setSeeGraph((prev) => !prev)}
                            icon={<VisibilityOffIcon />}
                            checkedIcon={<VisibilityIcon />}
                        />
                        <Typography ml="5px" mb="10px" variant="h6">
                            Graph :
                        </Typography>
                    </Box>
                    {seeGraph && (
                        <>
                            <Box
                                display="grid"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                gap="30px"
                                sx={{
                                    "& > div": {
                                        gridColumn: "span 2",
                                    },
                                }}
                            >
                                <TextField
                                    sx={{ gridColumn: "span 1" }}
                                    id="graphname"
                                    label="Graph Name"
                                    variant="outlined"
                                    value={graphname}
                                    onChange={(event) => {
                                        setGraphName(event.target.value);
                                    }}
                                />

                                <TextField
                                    sx={{ gridColumn: "span 4" }}
                                    id="graphfile"
                                    label="From File"
                                    variant="outlined"
                                    select
                                    onChange={changeData}
                                >
                                    {files
                                        .filter((word) => word.data_type)
                                        .map((option, index) => (
                                            <MenuItem
                                                key={option.id}
                                                value={option}
                                            >
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                </TextField>
                                <TextField
                                    select
                                    sx={{ gridColumn: "span 1" }}
                                    id="graph_type"
                                    label="Graph Type"
                                    variant="outlined"
                                    value={graphType}
                                    onChange={(event) => {
                                        setGraphType(event.target.value);
                                    }}
                                >
                                    {graphTypes.map((option, index) => (
                                        <MenuItem
                                            key={option.key}
                                            value={option.value}
                                        >
                                            {option.key}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                            <Box>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    mt="10px"
                                    width="100%"
                                    ml="10px"
                                >
                                    <Typography mr="28px">X axis :</Typography>
                                    <Box
                                        display="grid"
                                        gap="30px"
                                        width="80%"
                                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                        sx={{
                                            "& > div": {
                                                gridColumn: "span 2",
                                            },
                                        }}
                                    >
                                        <TextField
                                            id="xlabel"
                                            label="Label"
                                            variant="outlined"
                                            value={x_label}
                                            onChange={(event) => {
                                                setx_label(event.target.value);
                                            }}
                                            sx={{ gridColumn: "span 1" }}
                                        />
                                        <TextField
                                            id="xfield"
                                            label="Field"
                                            sx={{ gridColumn: "span 1" }}
                                            variant="outlined"
                                            select
                                            value={field_x}
                                            onChange={(event) => {
                                                setfield_x(event.target.value);
                                            }}
                                        >
                                            {fields.map((option, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={option}
                                                >
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Box>
                                </Box>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    mt="10px"
                                    width="100%"
                                    ml="10px"
                                >
                                    <Typography mr="28px">Y axis :</Typography>
                                    <Box
                                        display="grid"
                                        gap="30px"
                                        width="80%"
                                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                        sx={{
                                            "& > div": {
                                                gridColumn: "span 2",
                                            },
                                        }}
                                    >
                                        <TextField
                                            id="ylabel"
                                            label="Label"
                                            variant="outlined"
                                            value={y_label}
                                            onChange={(event) => {
                                                sety_label(event.target.value);
                                            }}
                                            sx={{ gridColumn: "span 1" }}
                                        />
                                        <TextField
                                            id="yfield"
                                            label="Field"
                                            sx={{ gridColumn: "span 1" }}
                                            variant="outlined"
                                            select
                                            value={field_y}
                                            onChange={(event) => {
                                                setfield_y(event.target.value);
                                            }}
                                        >
                                            {fields.map((option, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={option}
                                                >
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Box>
                                </Box>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    mt="10px"
                                    width="100%"
                                    ml="10px"
                                >
                                    <Typography mr="20px">Y2 axis :</Typography>
                                    <Box
                                        display="grid"
                                        gap="30px"
                                        width="80%"
                                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                        sx={{
                                            "& > div": {
                                                gridColumn: "span 2",
                                            },
                                        }}
                                    >
                                        <TextField
                                            id="y2label"
                                            label="Label"
                                            variant="outlined"
                                            value={y2_label}
                                            onChange={(event) => {
                                                sety2_label(event.target.value);
                                            }}
                                            sx={{ gridColumn: "span 1" }}
                                        />
                                        <TextField
                                            id="y2field"
                                            label="Field"
                                            sx={{ gridColumn: "span 1" }}
                                            variant="outlined"
                                            select
                                            value={field_y2}
                                            onChange={(event) => {
                                                setfield_y2(event.target.value);
                                            }}
                                        >
                                            {fields.map((option, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={option}
                                                >
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Box>
                                </Box>
                            </Box>

                            <Box>
                                {graph && (
                                    <Typography ml="10px" mt="20px">
                                        Output :
                                    </Typography>
                                )}
                                <Box display={"flex"}>
                                    {graph && (
                                        <Box
                                            width="80%"
                                            height="400px"
                                            m="auto"
                                            p="10px"
                                            sx={{
                                                border: "1px solid gray",
                                                borderRadius: "5px",
                                            }}
                                        ></Box>
                                    )}
                                    <Box
                                        display="flex"
                                        flexDirection={"column"}
                                    >
                                        {graph ? (
                                            <>
                                                <Button
                                                    onClick={() =>
                                                        updateGraph()
                                                    }
                                                    color="primary"
                                                    variant="contained"
                                                >
                                                    <SaveAsIcon />
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        cancelGraph();
                                                    }}
                                                    color="error"
                                                    variant="contained"
                                                    sx={{ marginTop: "10px" }}
                                                >
                                                    <DeleteIcon />
                                                </Button>
                                            </>
                                        ) : (
                                            <Button
                                                onClick={() => CreateGraph()}
                                                color="primary"
                                                variant="contained"
                                            >
                                                <DataSaverOnIcon />
                                            </Button>
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                        </>
                    )}
                    <Box
                        width="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="end"
                    >
                        {ERROR && (
                            <Box
                                width="80%"
                                height="70px"
                                p="10px"
                                display="flex"
                                alignItems="center"
                                sx={{
                                    backgroundColor: "#682727",
                                    border: "1px solid white",
                                    borderRadius: "5px",
                                }}
                            >
                                <Typography fontSize="36px" color="#FFBDBD">
                                    <ReportIcon fontSize="36px" />
                                </Typography>
                                <Box ml="10px">
                                    <Typography
                                        fontSize="18px"
                                        fontWeight="bold"
                                        color="#FFBDBD"
                                    >
                                        ERROR:
                                    </Typography>
                                    <Typography fontSize="16px" color="#FFBDBD">
                                        {ERROR}
                                    </Typography>
                                </Box>
                            </Box>
                        )}

                        <Box
                            flex="end"
                            display="flex"
                            justifyContent="end"
                            p="20px"
                            mt="10px"
                        >
                            <Button
                                onClick={() => {
                                    updateSectionContent();
                                }}
                                type="submit"
                                color="secondary"
                                variant="contained"
                                sx={{ p: "10px 20px" }}
                                endIcon={<SaveIcon />}
                            >
                                Save
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default SectionForm;
