import { MapContainer, useMap, TileLayer } from "react-leaflet";
import "leaflet.layerscontrol-minimap";
import "leaflet.layerscontrol-minimap/control.layers.minimap.css";
import L from "leaflet";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";

// import drones from "../../data/dronefields.json"; //TODO : à inclure dynamique (via le backend ?)
import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useData } from "../../../contexts/DataContext";
import { red } from "@mui/material/colors";
import { PopupTable } from "../global/popupTable";
//import drones from '../data/dronefields2.json'; //TODO : inclure la deuxième carte des restrictions UAS depuis API Géoportail

function onEachFeatureProject(feature, layer, projectData) {
    function readProperties(feature) {
        let text = '<b style="font-size:15px;}">' + "Project" + "</b><hr>";
        text += "<b>Name : </b>" + projectData.name.replace(/_/g, " ");
        text +=
            "<br><b>Type : </b>" +
            projectData.project_type_label.replace(/_/g, " ");

        return text;
    }

    layer.bindPopup(readProperties(feature)).on("add", function () {
        layer.openPopup();
    });

    layer.on({
        mouseover: (event) => {
            event.target.setStyle({
                fillColor: "orange",
            });
        },
        mouseout: (event) => {
            event.target.setStyle({
                fillColor: "blue",
                color: "#217074",
            });
        },
    });
}

function onEachFeatureDrone(feature, layer) {
    function readProperties(feature) {
        let text =
            '<b style="font-size:15px;}">' + "Zone Réglementée" + "</b><hr>";
        for (let [key, value] of Object.entries(feature.properties)) {
            text += "<b>" + key + " : </b>" + value + "<br>";
        }
        return text;
    }

    layer.bindPopup(readProperties(feature));

    layer.on({
        mouseover: (event) => {
            event.target.setStyle({
                fillColor: "purple",
            });
        },
        mouseout: (event) => {
            event.target.setStyle({
                fillColor: "red",
            });
        },
    });
}

function GeoData() {
    const map = useMap();
    const { projectsData, fetchProjectsData, droneFields, fetchDroneFields } =
        useData();
    const [loading, setLoading] = useState(true);
    const [addOverlays, setAddOverlays] = useState(true);

    useEffect(() => {
        if (loading) {
            fetchProjectsData();
            fetchDroneFields();
            setLoading(false);
        }
        if (droneFields && projectsData) {
            if (addOverlays) {
                let layerControl = L.control.layers(null, null, {
                    position: "bottomright",
                });
                let dronesLayer = L.geoJSON(droneFields.features, {
                    onEachFeature: onEachFeatureDrone,
                    fillOpacity: 0.5,
                });
                layerControl.addOverlay(
                    dronesLayer,
                    "Zones de vol réglementées"
                );
                for (let project in projectsData) {
                    let layerProjects = L.geoJSON(
                        projectsData[project].delimitation_field.features,
                        {
                            onEachFeature: (feature, layer) =>
                                onEachFeatureProject(
                                    feature,
                                    layer,
                                    projectsData[project]
                                ),
                            color: "red",
                            fillOpacity: 0.5,
                        }
                    );
                    layerControl.addOverlay(
                        layerProjects,
                        `Projet : ${projectsData[project].name.replace(
                            /_/g,
                            " "
                        )}`
                    );
                    layerProjects.addTo(map);
                }
                layerControl.addTo(map);
                setAddOverlays(false);
            }
        }
    }, [loading, projectsData, droneFields]);
}

function ChangeView({ center }) {
    const map = useMap();
    if (center) {
        map.setView(center, 16);
    }

    return null;
}

function ProjectsMap({ centerIn }) {
    const [center, setCenter] = useState([46.227638, 2.213749]);
    const { user } = useAuth();
    // const [projects, setProjects] = useState(null);

    return (
        <MapContainer center={center} zoom={6}>
            <ChangeView center={centerIn} />
            <TileLayer
                attribution='&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
            />
            <GeoData />
        </MapContainer>
    );
}

export default ProjectsMap;
