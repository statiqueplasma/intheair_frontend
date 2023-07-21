import ReactDOMServer from "react-dom/server";
const PopupTable = (data) => {
    let columns_buff = [];
    for (var key in data) {
        if (key !== "project_file" && key !== "id") {
            const key_arr = key.split("_");
            for (var i = 0; i < key_arr.length; i++) {
                key_arr[i] =
                    key_arr[i].charAt(0).toUpperCase() + key_arr[i].slice(1);
            }
            const key_label = key_arr.join(" ");
            columns_buff.push({
                field: key,
                name: key_label,
            });
        }
    }
    return ReactDOMServer.renderToString(
        <table>
            <thead>
                <tr>
                    <th style={{ margin: "5px" }}>Element </th>
                    <th style={{ margin: "5px" }}>Valeur</th>
                </tr>
            </thead>
            <tbody>
                {columns_buff.map((field) => {
                    return (
                        <tr>
                            <td>{field.name}</td>
                            <td>{data[field.field]}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default PopupTable;
