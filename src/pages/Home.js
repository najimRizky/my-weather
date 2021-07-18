// import React from 'react'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Grid, Container, Header } from 'semantic-ui-react'

function Home() {
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [location, setLocation] = useState(null)
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        if (!latitude && !longitude) getLatLon()
        if (!!latitude && !!longitude && !location) getLocation()
        if (!!latitude && !!longitude && !!location && !weather) getWeather()
        // eslint-disable-next-line
    }, [latitude, longitude, location, weather])

    function getLatLon() {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        });
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

    return (
        <>{
            weather ? (
                <Container>
                    <Grid divided='vertically' padded>
                        <Grid.Row columns={2}>
                            <Grid.Column textAlign='left' width={4} >
                                <h4>{weather['current']['weather'][0]['description']}</h4>
                            </Grid.Column>
                            <Grid.Column textAlign='right' width={12}>
                                <p style={{fontSize: '22px'}}>{location['address']['county'] + ", " + location['address']['city']}
                                <br/>
                                {   
                                    location['address']['state_district'] === undefined ? (
                                        location['address']['state']
                                    ) : (
                                        location['address']['state_district']
                                    )
                                }
                                <br/>
                                <span style={{fontSize: '18px', color: 'gray'}}>{location['address']['country']}</span>
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            ) : (
                <>
                    Loading
                </>
            )
        }</>
    )
}

export default Home;