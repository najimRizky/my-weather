// import React from 'react'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Grid, Container, Card, Icon, Image } from 'semantic-ui-react'
import Mobile from './../components/Mobile'
import Computer from './../components/Computer'

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

    function getTime(val){
        let date = new Date(val)
        // let day = (date.getDay() == 0) ? "Monday" 
        //             : (date.getDay() == 1) ? "Tuesday" 
        //             : (date.getDay() == 2) ? "Wednesday" 
        //             : (date.getDay() == 3) ? "Friday" 
        //             : (date.getDay() == 4) ? "Saturday" 
        //             : "Sunday" 
        // return day + ", " + date.getDate() + " " + date.getMonth().toLocaleString('default', {month: 'long'}) + " " + date.getYear()
        return date.getHours() + ":00" 
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
                            weather['hourly'].map(item => {
                                return (
                                    <div key={item['dt']} style={{ display: 'inline-block', textAlign: 'left' , margin: '0px 20px 10px 0px'}}>
                                        <Card style={{width: "120px", backgroundColor: 'rgb(255, 255, 255)', border: 'none', boxShadow: 'none'}} >
                                            <img style={{filter: 'brightness(90%)', textAlign:'center'}} centered src={'https://openweathermap.org/img/wn/' + item['weather'][0]['icon'] + '@4x.png'} size="small" alt="Not Found" />
                                            <Card.Content >
                                                {/* <Card.Header>{getTime(item['dt']*1000)}</Card.Header> */}
                                                <Card.Description>{getTime(item['dt']*1000)}</Card.Description>
                                                {/* <Card.Meta>
                                                    <span className='date'>Joined in 2015</span>
                                                </Card.Meta> */}
                                                <Card.Description>
                                                    Prec: {item['pop']}%
                                                </Card.Description>
                                            </Card.Content>
                                            <Card.Content extra>
                                                <p>
                                                    <Icon name='user' />
                                                    22 Friends
                                                </p>
                                            </Card.Content>
                                        </Card>


                                    </div>
                                )
                            })}
                    </div>
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