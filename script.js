"use strict";
/*  JavaScript 7th Edition
    Chapter 10
   

    Driving Directions
    Author: Debbie McGee
    Date:   11/14/22

   
*/


function showMap() {

    // Page objects
    let driveMap = document.getElementById("driveMap");
    let driveDirections = document.getElementById("driveDirections");
    let startingPoint = document.getElementById("startingPoint");
    let endingPoint = document.getElementById("endingPoint");

    let driveFind = new google.maps.DirectionsService();
    let driveDraw = new google.maps.DirectionsRenderer();
    let city = {
        lat: 34.084050,
        lng: -84.669886
    }

    let newMap = new google.maps.Map(driveMap, {
        zoom: 12,
        center: city
    })

    startingPoint.addEventListener("change", drawRoute)
    endingPoint.addEventListener("change", drawRoute)

    function drawRoute() {
        if (startingPoint.selectedIndex !== 0 && endingPoint.selectedIndex !== 0) {

            // Drive from current location to Oak Top House
            let driveRoute = {
                origin: startingPoint.value,
                destination: endingPoint.value,
                travelMode: "DRIVING"
            }

            // Generate directions for the route
            driveFind.route(driveRoute, function (result, status) {
                if (status == "OK") {
                    driveDraw.setDirections(result);
                    // Display route and directions
                    driveDraw.setMap(driveMap);
                    driveDraw.setPanel(driveDirections);
                } else {
                    driveDirections.textContent = "Directions Unavailable: " + status;
                }
            });

        }
    }
}