const getLatitudeLongitude = async () => {
    const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((pos) => {
            resolve(pos)
        }, (error) => {
            console.log(error.message)
            alert("Please enable your location")
            setTimeout(() => {
                window.location.reload()
            }, 1000)
            reject(undefined)
        });
    })

    if (position) {
        return {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
    } else {
        return position
    }
}

export default getLatitudeLongitude