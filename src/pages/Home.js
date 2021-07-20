// import React from 'react'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Grid, Container, Card } from 'semantic-ui-react'
import Mobile from './../components/Mobile'
import Computer from './../components/Computer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudRain, faThermometerHalf, faTint, faWind } from '@fortawesome/free-solid-svg-icons'

// import { Platform } from "react-native";
// import { PERMISSIONS, request } from "react-native-permissions";
// import * as Geolocation from "@react-native-community/geolocation";

function Home() {
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [location, setLocation] = useState(null)
    const [weather, setWeather] = useState(null)
    const [stats, setStats] = useState("Loading")

    useEffect(() => {
        if (!latitude && !longitude) getLatLon()
        if (!!latitude && !!longitude && !location) getLocation()
        if (!!latitude && !!longitude && !!location && !weather) getWeather()
        console.log("sini")
        // eslint-disable-next-line
    }, [latitude, longitude, location, weather])

    function getLatLon() {
        console.log("sini")
        navigator.geolocation.getCurrentPosition(function (position) {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
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
                        setStats("You have to enable your location")
                    }
                    result.onchange = function () {
                        console.log(result.state)
                        if(result.state === "granted") window.location.reload()
                        else if(result.state === "denied") setStats("You have to enable your location")
                    };
                });
        } else {
            alert("Sorry Not available!");
        }
    }


    function getLocation() {
        axios.get('https://us1.locationiq.com/v1/reverse.php?key=pk.43eca1a5c71fa8c277ecef1c575eb353&lat=' + latitude + '&lon=' + longitude + '&format=json')
            .then(function (response) {
                // handle success
                let data = response.data
                setLocation(data)
            })
            .catch(function (error) {
                // handle error
                console.log(error)
            })
            .then(function () {
                // always executed
            });
    }

    function getWeather() {
        axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=minutely,daily&units=metric&lang=id&appid=98cbf771881782a7fd24dc4d2219599a')
            .then(function (response) {
                // handle success
                setWeather(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error)
            })
            .then(function () {
                // always executed
            });
    }

    function getTime(val) {
        let date = new Date(val)
        let today = new Date()
        let day = (date.getDay() === 0) ? "Mon"
                : (date.getDay() === 1) ? "Tue"
                : (date.getDay() === 2) ? "Wed"
                : (date.getDay() === 3) ? "Thu"
                : (date.getDay() === 4) ? "Fri"
                : (date.getDay() === 5) ? "Sat"
                : "Sun"
        if (today.getDay() === date.getDay())
            return date.getHours() + ":00"
        else
            return day + ", " + date.getHours() + ":00"
    }

    return (
        <>{
            weather ? (
                <Container>
                    <Grid divided='vertically' padded>
                        {/* For Computer & Tablet */}
                        <Computer weather={weather} location={location} />

                        {/* For Mobile */}
                        <Mobile weather={weather} location={location} />
                    </Grid>
                    <div style={{ overflow: 'auto', whiteSpace: 'nowrap', }}>
                        {
                            weather['hourly'].slice(1).map(item => {
                                return (
                                    <div key={item['dt']} style={{ display: 'inline-block', textAlign: 'left', margin: '0px 20px 10px 0px' }}>
                                        <Card style={{ maxWidth: "160px", backgroundColor: 'rgba(255, 255, 255, 0.2)', border: 'none', boxShadow: 'none', }} >
                                            <img style={{ filter: 'brightness(100%)', textAlign: 'center' }} src={'https://openweathermap.org/img/wn/' + item['weather'][0]['icon'] + '@4x.png'} size="small" alt="Not Found" />
                                            <Card.Content >
                                                {/* <Card.Header>{getTime(item['dt']*1000)}</Card.Header> */}
                                                <Card.Header style={{ fontSize: '15px' }}>{getTime(item['dt'] * 1000)}</Card.Header>
                                                {/* <Card. style={{width: '160px'}}> */}
                                                <p style={{ fontSize: '9px', color: "#3b3b3b" }}>{item['weather'][0]['description'].toUpperCase()}</p>
                                                {/* </Card.Meta> */}
                                                <Card.Description>
                                                    <FontAwesomeIcon icon={faCloudRain} color="white" />&ensp;{(item['pop'] * 100).toFixed(0)}%
                                                </Card.Description>
                                                <Card.Description>
                                                    <FontAwesomeIcon icon={faThermometerHalf} color="#e34744" />&emsp;{item['temp'].toFixed(0)}°C
                                                </Card.Description>
                                                <Card.Description>
                                                    <FontAwesomeIcon icon={faTint} color="#4493d4" />&ensp;&nbsp;&nbsp;{item['humidity'].toFixed(0)}%
                                                </Card.Description>
                                                <Card.Description>
                                                    <FontAwesomeIcon icon={faWind} />&ensp;{item['wind_speed'].toFixed(0)} m/s
                                                </Card.Description>
                                            </Card.Content>

                                        </Card>
                                    </div>
                                )
                            })}
                    </div>
                </Container>
            ) : (
                <>
                    {stats}
                </>
            )
        }</>
    )
}

export default Home;