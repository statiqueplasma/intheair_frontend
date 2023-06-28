import { useEffect, useState } from "react";
import { useData } from "../contexts/DataContext";

function Test() {
    const { files, fetchFiles, dataFile, fetchData } = useData();
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        if (loading) {
            fetchFiles(1);
            setLoading(false);
        }
        else if (files) {
            // fetchData(1);
            traitementType();
        }
    }, [loading, files])

    function traitementType() {
        for (let file of files) {
            if (file.file_type === "Geo_File") {
                if (file.files[0].file_type === "raster") { 
                    //layer raster 

                    console.log("raster");
                }
                else {
                    fetchData(file.id);
                    console.log("autre que raster");
                }
            }
        }
    }

    return(
        JSON.stringify(dataFile)
    );

    // return (
    //     <div>
    //         {files &&
    //             files.length > 0 &&
    //             files.map((file) => {
    //                 if (file.file_type === "Geo_File") {
    //                     {file.files &&
    //                         file.files.length > 0 &&
    //                         file.files.map((under_file) => {
    //                             return <p key={under_file.id}> {under_file.file_type} </p>;
    //                     })}
    //                     return <p key={file.id}> {file.file_type} </p>;
    //                 }
    //             })}
    //     </div>
    // );

}

export default Test
