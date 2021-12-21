// import React from 'react'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Grid, Container, Loader } from 'semantic-ui-react'
import Mobile from './Mobile'
import Computer from './Computer'
import HourlyWeather from './HourlyWeather';

// import { Platform } from "react-native";
// import { PERMISSIONS, request } from "react-native-permissions";
// import * as Geolocation from "@react-native-community/geolocation";

function MyLocation() {
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [location, setLocation] = useState(null)
    const [weather, setWeather] = useState(null)
    const [stats, setStats] = useState(<Loader active inline='centered' />)

    useEffect(() => {
        if (latitude == null && longitude == null) getLatLon()
        if (latitude !== null && longitude !== null && !location) getLocation()
        if (latitude !== null && longitude !== null && !!location && !weather) getWeather()
        // eslint-disable-next-line
    }, [latitude, longitude, location, weather])

    function getLatLon() {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
            // console.log(position.coords.longitude)
            // console.log(position.coords.latitude)
        });
        checkPermission()
    }
    function checkPermission() {
        if (navigator.geolocation) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then(function (result) {
                    if (result.state === "granted") {
                        console.log(result.state);
                    } else if (result.state === "prompt") {
                        console.log(result.state);
                    } else if (result.state === "denied") {
                        console.log(result.state)
                        setStats("You have to enable your location")
                    }
                    result.onchange = function () {
                        console.log(result.state)
                        console.log("Sini")
                        if(result.state === "granted") window.location.reload()
                        else if(result.state === "denied") setStats("You have to enable your location")
                    };
                });
        } else {
            alert("Sorry Not available!");
        }
    }

    function getLocation() {
        axios({
            method: 'GET',
            url: 'https://us1.locationiq.com/v1/reverse.php?key=pk.43eca1a5c71fa8c277ecef1c575eb353&lat=' + latitude + '&lon=' + longitude + '&format=json',
            headers: {
                "Accept-Language": "en-US,en;"
            }
        }).then(function (response) {
                // handle success
                // console.log(response.data)
                setLocation(response.data)
                // console.log(Object.keys(response.data['address']))
            })
            .catch(function (error) {
                // handle error
                console.log(error)
                alert("Error getLocation")
            })
            .then(function () {
                // always executed
            });
        // axios.get('https://us1.locationiq.com/v1/reverse.php?key=pk.43eca1a5c71fa8c277ecef1c575eb353&lat=' + latitude + '&lon=' + longitude + '&format=json')
    }

    function getWeather() {
        var errorCheck = true;
        
        axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=minutely,daily&units=metric&appid=98cbf771881782a7fd24dc4d2219599a')
        .then(function (response) {
            // handle success
            setWeather(response.data)
            // console.log(response)
        })
        .catch(function (error) {
            // handle error
            console.log(error)
            // console.log(error['config']['url'])
            // alert("Error getWeather")
            errorCheck = false
        })
        .then(function () {
            // always executed
            if(errorCheck===false){
                axios({
                    method: 'GET',
                    url: 'https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=minutely,daily&units=metric&appid=98cbf771881782a7fd24dc4d2219599a',
                    // url: 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=minutely,daily&units=metric&appid=98cbf771881782a7fd24dc4d2219599a',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET, POST',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    },
                })
                .then(function (response) {
                    // handle success
                    setWeather(response.data)
                    // console.log(response)
                })
                .catch(function (error) {
                    // handle error
                    // console.log(JSON.stringify(error))
                    setStats("Open this, click request button, then go back to this page>> <a href="+error['config']['url']+">Link</a>")
                    console.log(error)
                    alert("Error getWeather")
                })
                .then(function () {
                    // always executed
                });
            }
        });
    }

    return (
        <>{
            weather ? (
                <Container style={{color: "black"}}>
                    <Grid divided='vertically' padded>
                        {/* For Computer & Tablet */}
                        <Computer weather={weather} location={location} />

                        {/* For Mobile */}
                        <Mobile weather={weather} location={location} />
                    </Grid>
                    <HourlyWeather weather={weather} />
                </Container>
            ) : (
                <>
                    {stats}
                </>
            )
        }</>
    )
}

export default MyLocation;