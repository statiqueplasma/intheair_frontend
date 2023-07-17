import { useContext, useEffect } from "react";
import MapContext from "../maps/MapContext";
import TileLayer from "ol/layer/Tile";
const CustTileLayer = ({ source, zIndex = 0 }) => {
    const { map } = useContext(MapContext);
    useEffect(() => {
        if (!map) return;

        let tileLayer = new TileLayer({
            source,
            zIndex,
        });
        map.addLayer(tileLayer);
        tileLayer.setZIndex(zIndex);
        return () => {
            if (map) {
                map.removeLayer(tileLayer);
            }
        };
    }, [map]);
    return null;
};
export default CustTileLayer;
