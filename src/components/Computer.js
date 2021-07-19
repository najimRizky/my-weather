import { Grid, Image } from 'semantic-ui-react'


function Computer(props) {
    return (
        <Grid.Row only="tablet computer">
            <Grid.Column textAlign='center' width={3}>
                <div style={{ overflow: 'hidden' }}>
                    <Image className="weatherIcon" style={{ transform: 'scale(1.8)' }} centered src={'https://openweathermap.org/img/wn/' + props.weather['current']['weather'][0]['icon'] + '@4x.png'} size="tiny"></Image>
                </div>
                <p style={{ fontSize: '12px' }}>{(props.weather['current']['weather'][0]['description']).toUpperCase()}</p>
            </Grid.Column>
            <Grid.Column textAlign='left' width={3}>
                <p style={{ fontSize: '28px', marginBottom: '-15px' }}>{props.weather['current']['temp']}°C</p><br />
                <span style={{ color: "#3b3b3b" }} >Humidity: {props.weather['current']['humidity']}%</span><br />
                <span style={{ color: "#3b3b3b" }} >Wind: {props.weather['current']['wind_speed']}m/s</span><br />
                <span style={{ color: "#3b3b3b" }} >Precipitation: {props.weather['hourly'][0]['pop'] * 100}%</span><br />
            </Grid.Column>
            <Grid.Column textAlign='right' width={10}>
                <p style={{ fontSize: '22px' }}>{props.location['address']['county'] + ", " + props.location['address']['city']}
                    <br />
                    {
                        props.location['address']['state_district'] === undefined ? (
                            props.location['address']['state']
                        ) : (
                            props.location['address']['state_district']
                        )
                    }
                    <br />
                    <span style={{ fontSize: '18px', color: '#3b3b3b' }}>{new Date(props.weather['current']['dt']*1000).getHours()}:00</span>
                </p>
            </Grid.Column>
        </Grid.Row>
    )
}

export default Computer