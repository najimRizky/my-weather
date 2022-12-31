const getLocation = async (position) => {
    const options = [
        `key=${process.env.REACT_APP_LOCATION_API_KEY}`,
        `lat=${position.latitude}`,
        `lon=${position.longitude}`,
        `format=json`
    ]
    const url = `${process.env.REACT_APP_LOCATION_API_URL}/reverse.php?${options.join("&")}`
    try {
        const response = await fetch(url, { headers: { "Accept-Language": "en-US,en;" } })
        const data = await response.json()
        if (!response.ok) {
            throw new Error("Error on getting the location")
        }
        return data
    } catch (error) {
        console.log(error)
        alert(error.message)
        return undefined
    }
}

export default getLocation