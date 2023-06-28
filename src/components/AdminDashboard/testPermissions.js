import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";

const TestPermissions = () => {
    const { reportData, files, fetchFiles, fetchReport } = useData();
    const [loading, setLoading] = useState(true);
    var str = "ankofuenqbqofuiowq";
    useEffect(() => {
        if (loading) {
            setLoading(false);
        }
        if (reportData) {
            console.log("report Data = ", reportData);
        }
    }, [loading, reportData]);

    return (
        <div>
            <p>
                {str} | {str.length} | {str.length === 2}
            </p>
        </div>
    );
};

export default TestPermissions;
