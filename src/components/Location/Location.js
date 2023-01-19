import { useContext, useEffect, useRef, useState } from "react";
import { CurrentAddressContext } from "../../context/CurrentAddressContext";

import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Graphic from "@arcgis/core/Graphic";
import Point from '@arcgis/core/geometry/Point'
import { apiKey } from "../../services/api/apiServices";
import { ApiKeyManager } from "@esri/arcgis-rest-request";
import { geocode } from "@esri/arcgis-rest-geocoding";

import "./Location.css";

const Location = () => {
    const value = useContext(CurrentAddressContext);

    let arrayOfLocation = [];
    Object.values(value).forEach((val) =>
        val.address ? arrayOfLocation.push(val.address) : null
    );

    const locationAddress = arrayOfLocation.pop();

    const mapDiv = useRef(null);

    useEffect(() => {
        // create map
        const map = new Map({
            basemap: "streets-vector",
        });

        // load the map view at the ref's DOM node
        const view = new MapView({
            container: mapDiv.current,
            map: map,
            center: [+25, 43],
            zoom: 6,
        });
        const authentication = ApiKeyManager.fromKey(apiKey);

        geocode({
            address: locationAddress,
            authentication,
        }).then((results) => {
            view.when(() => {
                showResult(results.candidates);
            });
        });

        function showResult(results) {
            if (results.length) {
                const result = results[0];

                let point = new Point({
                    x: result.location.x,
                    y: result.location.y
                });

                // Create a graphic and add the geometry and symbol to it
                let pointGraphic = new Graphic({
                    geometry: point,
                    symbol: {
                        type: "picture-marker",
                        url: "https://static.arcgis.com/images/Symbols/Shapes/BlackStarLargeB.png",
                        width: "25px",
                        height: "25px"
                    },
                    attributes: {
                        title: 'Address',
                        address: result.address
                    },
                    popupTemplate: {
                        title: '{title}',
                        content: result.address + "<br><br>" + (result.location.x.toFixed(5) + ", " + result.location.y.toFixed(5))
                    }
                });

                view.graphics.add(pointGraphic);
                view.goTo({
                    target: pointGraphic,
                    zoom: 13
                }).then(function () {
                    view.popup.open({
                        features: [pointGraphic],
                        location: pointGraphic.geometry
                    })
                })
            }
        }
    });

    return (
        <div>
            <div className="location-top">
                <img
                    className="address-icon"
                    alt="addres-img"
                    src="https://cdn-icons-png.flaticon.com/512/6948/6948631.png"
                ></img>
                <h2 className="title-location">Локация на избрания адрес</h2>
            </div>
            <div id="viewDiv" className="mapDiv" ref={mapDiv}>
            </div>
        </div>
    );
};

export default Location;
