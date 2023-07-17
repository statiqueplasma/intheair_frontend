import L, { divIcon } from "leaflet";
import { GeoJSON } from "react-leaflet";
import { useEffect, useState, useF } from "react";
const Vectorfiltering = (element, prop, operator, value) => {
    if (operator === "sup") {
        if (
            element[prop] > parseFloat(value) ||
            element[prop] === parseFloat(value)
        ) {
            return true;
        } else {
            return false;
        }
    } else if (operator === "inf") {
        if (
            element[prop] < parseFloat(value) ||
            element[prop] === parseFloat(value)
        ) {
            return true;
        } else {
            return false;
        }
    } else if (operator === "equal") {
        if (element[prop] === value) {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
};

function onEachFeature(feature, layer) {
    function readProperties(feature) {
        let text = '<b style="font-size:15px;}">' + "Propreties" + "</b><hr>";
        for (let [key, value] of Object.entries(feature.properties)) {
            text += "<b>" + key + " : </b>" + value + "</br>";
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
                fillColor: "#ff7800",
            });
        },
    });
}
function onEachFeatureLine(feature, layer, show, filterObject) {
    function readProperties(feature) {
        let text = '<b style="font-size:15px;}">' + "Propreties" + "</b><hr>";
        for (let [key, value] of Object.entries(feature.properties)) {
            text += "<b>" + key + " : </b>" + value + "</br>";
        }
        return text;
    }

    layer.bindPopup(readProperties(feature));

    if (filterObject.active) {
        if (
            Vectorfiltering(
                feature.properties,
                filterObject.prop,
                filterObject.operator,
                filterObject.value
            )
        ) {
            layer.setStyle({ fillColor: "red" });
        } else {
            if (filterObject.show) {
                layer.setStyle(null);
            } else {
                layer.setStyle({ opacity: 0 });
            }
        }
    } else {
        layer.setStyle(null);
    }
}

const LayerViewer = ({ layer, index, filterObject }) => {
    const [display, setDisplay] = useState(true);
    useEffect(() => {
        setDisplay(false);
    }, [filterObject, layer]);
    useEffect(() => {
        if (!display) {
            setDisplay(true);
        }
    }, [display]);
    const geojsonFilteredMarkerOptions = {
        radius: 10,
        fillColor: "red",
        color: "red",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.3,
    };
    const geojsonMarkerHidden = {
        radius: 0,
        weight: 0,
        opacity: 0,
        fillOpacity: 0,
    };

    if (display)
        return layer.type.includes("Point")
            ? layer.show && (
                  <GeoJSON
                      key={index}
                      data={layer.data}
                      onEachFeature={(feature, layer) =>
                          onEachFeature(feature, layer)
                      }
                      pointToLayer={
                          layer.type.includes("Point") &&
                          function (feature, latlng) {
                              let filter_res = Vectorfiltering(
                                  feature.properties,
                                  filterObject.prop,
                                  filterObject.operator,
                                  filterObject.value
                              );
                              if (layer.show) {
                                  if (filterObject.active) {
                                      if (filter_res) {
                                          return L.circleMarker(
                                              latlng,
                                              geojsonFilteredMarkerOptions
                                          );
                                      } else {
                                          return L.circleMarker(latlng, {
                                              radius: 10,
                                              fillColor: layer.color,
                                              color: layer.color,
                                              weight: 1,
                                              opacity: 1,
                                              fillOpacity: 0.3,
                                          });
                                      }
                                  } else {
                                      return L.circleMarker(latlng, {
                                          radius: 10,
                                          fillColor: layer.color,
                                          color: layer.color,
                                          weight: 1,
                                          opacity: 1,
                                          fillOpacity: 0.3,
                                      });
                                  }
                              } else {
                                  return L.circleMarker(
                                      latlng,
                                      geojsonMarkerHidden
                                  );
                              }
                          }
                      }
                  />
              )
            : layer.type.includes("LineString")
            ? layer.show && (
                  <GeoJSON
                      key={index}
                      data={layer.data}
                      onEachFeature={(feature, inlayer) =>
                          onEachFeatureLine(
                              feature,
                              inlayer,
                              layer.show,
                              filterObject
                          )
                      }
                  />
              )
            : null;
};

export default LayerViewer;
