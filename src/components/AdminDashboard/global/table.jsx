import { tokens } from "../../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Typography, IconButton, useTheme } from "@mui/material";

const Table = ({
    fields,
    data,
    idParam,
    height,
    visibility,
    components,
    paginationModel,
    pageSizeOptions,
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const TabStyle = {
        tools:
            theme.palette.mode === "light"
                ? `${colors.black[300]} !important`
                : `${colors.indigo[400]} !important`,
        headColor:
            theme.palette.mode === "light"
                ? colors.white[500]
                : colors.black[300],
        headBackground: colors.indigo[500],
        background:
            theme.palette.mode === "light"
                ? colors.white[300]
                : colors.white[600],
        color:
            theme.palette.mode === "light"
                ? colors.turquoise[500]
                : colors.indigo[500],
        selectBackground:
            theme.palette.mode === "light"
                ? `${colors.indigo[700]} !important`
                : `${colors.indigo[700]} !important`,
        selectColor:
            theme.palette.mode === "light"
                ? `${colors.white[500]} !important`
                : `${colors.white[100]} !important`,
        selectBox:
            theme.palette.mode === "dark"
                ? `${colors.black[800]} !important`
                : undefined,
        buttonColor:
            theme.palette.mode === "dark"
                ? `${colors.indigo[900]} !important`
                : colors.indigo[500],
    };
    return (
        <Box
            height={height}
            width="85%"
            alignSelf="center"
            whiteSpace="pre"
            sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    border: "none",
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: TabStyle.headBackground,
                    color: TabStyle.headColor,
                    borderBottom: "none",
                    borderColor: colors.white[100],
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: TabStyle.background,
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: TabStyle.headBackground,
                    color: TabStyle.headColor,
                    alignItems: "center",
                },
                "& .MuiTablePagination-root": {
                    color: TabStyle.headColor,
                },
                "& .MuiTablePagination-actions .MuiButtonBase-root": {
                    color: TabStyle.headColor,
                },
                "& .MuiCheckbox-root": {
                    color: `${colors.turquoise[300]} !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: TabStyle.tools,
                },
                "& .MuiDataGrid-toolbarContainer .MuiSvgIcon-root": {
                    color: TabStyle.tools,
                },
                "&  .Mui-selected": {
                    backgroundColor: TabStyle.selectBackground,
                },
                "&  .Mui-selected .MuiDataGrid-cell": {
                    color: TabStyle.selectColor,
                },
                "&  .MuiDataGrid-cellCheckbox > .MuiSvgIcon-root": {
                    color: TabStyle.selectBox,
                },
            }}
        >
            <DataGrid
                rows={data}
                columns={fields}
                components={components}
                checkboxSelection
                autoHeight={height ? false : true}
                getRowId={idParam}
                pageSizeOptions={pageSizeOptions}
                initialState={{
                    columns: {
                        columnVisibilityModel: visibility,
                    },
                    pagination: {
                        paginationModel: paginationModel,
                    },
                }}
            />
        </Box>
    );
};

export default Table;
