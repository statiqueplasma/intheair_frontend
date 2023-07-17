import Map from "../global/maps/map";
import CustTileLayer from "../global/layers/TileLayer";
import VectorLayer from "../global/layers/VectorLayer";
import * as olSource from "ol/source";
import { Vector as VectorSource } from "ol/source";
import { geofile } from "./testvector";
import GeoJSON from "ol/format/GeoJSON";
import { fromLonLat, get } from "ol/proj";
const MapView = () => {
    var osm = new olSource.OSM();
    var xyz_layer = new olSource.XYZ({
        url: "https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}",
    });
    console.log(geofile);

    return (
        <Map center={[47.2506696992688, 0.330715012836996]} zoom={7}>
            <CustTileLayer source={osm} zIndex={0} />
            <VectorLayer
                source={
                    new VectorSource({
                        features: new GeoJSON().readFeatures(geofile, {
                            featureProjection: get("EPSG:3857"),
                        }),
                    })
                }
                zIndex={1}
            />
        </Map>
    );
};
export default MapView;
