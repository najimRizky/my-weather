const getWeather = async (position) => {
    const options = [
        `lat=${position.latitude}`,
        `lon=${position.longitude}`,
        `exclude=minutely,daily`,
        `units=metric`,
        `appid=${process.env.REACT_APP_WEATHER_API_KEY}`,
    ]
    const url = `${process.env.REACT_APP_WEATHER_API_URL}/onecall?${options.join("&")}`
    try {
        const response = await fetch(url)
        const data = await response.json()
        if (!response.ok) {
            throw new Error("Error on getting the weather")
        }
        return data
    } catch (error) {
        console.log(error)
        alert(error.message)
        return undefined
    }
}

export default getWeather