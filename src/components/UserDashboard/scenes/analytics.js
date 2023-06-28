import { useEffect, useState } from "react";
import Table from "../../AdminDashboard/global/table";
import { useParams } from "react-router-dom";
import { useData } from "../../../contexts/DataContext";
import { Box } from "@mui/material";
import Loading from "../../AdminDashboard/global/loading";
import { GridToolbar } from "@mui/x-data-grid";
import { data } from "../../AdminDashboard/test";
import Header from "../../AdminDashboard/global/header";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";

function Analytics() {
    const { data_type, id, file_name } = useParams();
    const [loading, setLoading] = useState(true);
    const { fetchData, dataFile } = useData();
    const [loadData, setLoadData] = useState(false);
    const [columns, setColumns] = useState(false);
    useEffect(() => {
        if (loading) {
            fetchData(id);
            setLoading(false);
        } else {
            if (dataFile) {
                var obj = dataFile[0];
                var columns_buff = [
                    { field: "id", headerName: "ID", flex: 0.25 },
                ];
                for (var key in obj) {
                    if (key !== "project_file" && key !== "id") {
                        const key_arr = key.split("_");
                        for (var i = 0; i < key_arr.length; i++) {
                            key_arr[i] =
                                key_arr[i].charAt(0).toUpperCase() +
                                key_arr[i].slice(1);
                        }
                        const key_label = key_arr.join(" ");
                        columns_buff.push({
                            field: key,
                            headerName: key_label,
                            flex: 1,
                            cellClassName: "name-column--cell",
                        });
                    }
                }
                setColumns(columns_buff);
                setLoadData(true);
            }
        }
    });
    var data_type_buff = "data_type";
    var file_name_buff = "file_name";
    if (data_type) data_type_buff = data_type;
    if (file_name) file_name_buff = file_name;
    const arr = data_type_buff.split("_");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const data_type_up = arr.join(" ");

    const arr2 = file_name_buff.split("_");
    for (var i = 0; i < arr2.length; i++) {
        arr2[i] = arr2[i].charAt(0).toUpperCase() + arr2[i].slice(1);
    }
    const file_name_up = arr2.join(" ");
    return (
        <Box minHeight="800px" height="100%">
            {loadData ? (
                <Box display="flex" flexDirection="column">
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb="10px"
                        mt="5px"
                    >
                        <Header
                            icon={<DataThresholdingIcon fontSize="inherit" />}
                            //title={data_type_up + " data"}
                            title={"Analytic Data"}
                            subtitle={`Data in the file ${file_name_up}`}
                        />
                    </Box>
                    <Box
                        width="100%"
                        m="40px auto auto auto"
                        display="flex"
                        justifyContent="center"
                    >
                        <Table
                            fields={columns}
                            data={dataFile}
                            components={{ Toolbar: GridToolbar }}
                            paginationModel={{ pageSize: 30, page: 0 }}
                            pageSizeOptions={[15, 30, 45, 60]}
                            checkbox={false}
                        />
                    </Box>
                </Box>
            ) : (
                <Loading />
            )}
        </Box>
    );
}

export default Analytics;
