import { Grid, Image } from 'semantic-ui-react'


function Mobile(props) {
    return (
        <Grid.Row only="mobile">
            <Grid.Column textAlign='left' width={16}>
                <p style={{ fontSize: '22px' }}>{props.location['address'][Object.keys(props.location['address'])[2]] + ", " + props.location['address'][Object.keys(props.location['address'])[3]]}
                    <br />
                    {props.location['address'][Object.keys(props.location['address'])[4]]}
                    <br />
                    <span style={{ fontSize: '18px', color: '#3b3b3b' }}>{new Date(props.weather['current']['dt']*1000).getHours()}:00</span>
                </p>
            </Grid.Column>
            <Grid.Column textAlign='center' width={4}>
                <div style={{ textAlign: 'center' }}>
                    <Image className="weatherIcon" style={{ transform: 'scale(1.5)' }}  src={'https://openweathermap.org/img/wn/' + props.weather['current']['weather'][0]['icon'] + '@4x.png'} size="tiny"></Image>
                </div>
                <p >{(props.weather['current']['weather'][0]['description']).toUpperCase()}</p>
            </Grid.Column>
            <Grid.Column textAlign='left' width={8}>
                <span style={{ fontSize: '30px' }}>{props.weather['current']['temp']}°C</span><br /><br />
                <span style={{ color: "#3b3b3b" }} >Humidity: {props.weather['current']['humidity']}%</span><br />
                <span style={{ color: "#3b3b3b" }} >Wind: {(props.weather['current']['wind_speed']*3.6).toFixed(0)} km/h</span><br />
                <span style={{ color: "#3b3b3b" }} >Precipitation: {(props.weather['hourly'][0]['pop']*100).toFixed(0)}%</span><br />
            </Grid.Column>
        </Grid.Row>
    )
}

export default Mobile