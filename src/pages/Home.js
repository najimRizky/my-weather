// import React from 'react'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Grid, Container, Image} from 'semantic-ui-react'

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
    function getPrecip(){
        var today = Math.round((new Date()).getTime() / 1000);
        var pop;
        for (let element of weather['hourly'] ) {
            pop = element['pop']
            console.log(element['dt'])
            if (today >= element['dt']) break
        }
        return pop*100
    }

    return (
        <>{
            weather ? (
                <Container>
                    <Grid divided='vertically' padded>
                        <Grid.Row columns={2}>
                            <Grid.Column textAlign='center' width={3} >
                                <Image centered src="https://cdn.pixabay.com/photo/2013/04/01/09/22/thunderstorm-98541_1280.png" size='tiny'></Image>
                                <p>{weather['current']['weather'][0]['description']}</p>
                            </Grid.Column>
                            <Grid.Column textAlign='left' width={3}>
                                <span style={{fontSize: '30px'}}>{weather['current']['temp']}°C</span><br/><br/>
                                <span style={{color:"gray"}} >Humidity: {weather['current']['humidity']}%</span><br/>
                                <span style={{color:"gray"}} >Wind: {weather['current']['wind_speed']}m/s</span><br/>
                                <span style={{color:"gray"}} >Precipitation: {getPrecip()}%</span><br/>
                            </Grid.Column>
                            <Grid.Column textAlign='right' width={10}>
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