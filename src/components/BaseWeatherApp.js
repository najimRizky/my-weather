import { useEffect, useState } from "react"
import { Loader } from "semantic-ui-react"


import getLocation from "../utils/getLocation"
import getWeather from "../utils/getWeather"
import getLatitudeLongitude from "../utils/getLatitudeLongitude"
import WeatherDetail from "./WeatherDetail"

const BaseWeatherApp = ({ latitude = undefined, longitude = undefined }) => {
    const [location, setLocation] = useState()
    const [weather, setWeather] = useState()

    useEffect(() => {
        setLocation()
        setWeather()
        const getData = async () => {
            const position = (latitude && longitude) ? { latitude: latitude, longitude: longitude } : await getLatitudeLongitude()
            if (position) {
                const dataLocation = await getLocation(position)
                const dataWeather = await getWeather(position)

                setLocation(dataLocation)
                setWeather(dataWeather)
            }
        }
        getData()
    }, [latitude, longitude])

    return (
        <>
            {weather && location ? (
                <WeatherDetail weather={weather} location={location} />
            ) : (
                <Loader active inline='centered' />
            )
            }
        </>
    )
}

export default BaseWeatherApp