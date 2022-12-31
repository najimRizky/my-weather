const searchLocation = async (keyword) => {
    const options = [
        `key=${process.env.REACT_APP_LOCATION_API_KEY}`,
        `q=${keyword}`,
        `format=json`
    ]
    const url = `${process.env.REACT_APP_LOCATION_API_URL}/search.php?${options.join("&")}`
    try {
        const response = await fetch(url, { headers: { "Accept-Language": "en-US,en;" } })
        const data = await response.json()
        if (!response.ok) {
            throw new Error("Error on getting the location")
        }
        return data
    } catch (error) {
        console.log(error)
        return undefined
    }
}

export default searchLocation