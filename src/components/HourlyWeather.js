import React from 'react'
import { Card } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudRain, faThermometerHalf, faTint, faWind } from '@fortawesome/free-solid-svg-icons'

function HourlyWeather(props) {
    function getTime(val) {
        let date = new Date(val)
        let today = new Date()
        let day = (date.getDay() === 0) ? "Sun"
                : (date.getDay() === 1) ? "Mon"
                : (date.getDay() === 2) ? "Tue"
                : (date.getDay() === 3) ? "Wed"
                : (date.getDay() === 4) ? "Thu"
                : (date.getDay() === 5) ? "Fri"
                : "Sat"
        if (today.getDay() === date.getDay())
            return date.getHours() + ":00"
        else
            return day + ", " + date.getHours() + ":00"
    }

    return (
        <div style={{ overflow: 'auto', whiteSpace: 'nowrap', }}>
            {
                props.weather['hourly'].slice(1).map(item => {
                    return (
                        <div key={item['dt']} style={{ display: 'inline-block', textAlign: 'left', margin: '0px 20px 10px 0px' }}>
                            <Card style={{ maxWidth: "160px", backgroundColor: item['temp'].toFixed(0) > 27 ? 'rgba(245, 139, 127, 0.5)' : 'rgba(0, 149, 255, 0.3)', border: "none", boxShadow: "none" }} color={item['temp'].toFixed(0) > 30 ? "red" : "blue"} >
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
                                        <FontAwesomeIcon icon={faWind} />&ensp;{(item['wind_speed'] * 3.6).toFixed(0)} km/h
                                    </Card.Description>
                                </Card.Content>

                            </Card>
                        </div>
                    )
                })}
        </div>

    )
}

export default HourlyWeather