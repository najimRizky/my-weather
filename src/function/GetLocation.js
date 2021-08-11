import axios from 'axios';

function GetLocation(latitude, longitude) {
    axios({
        method: 'GET',
        url: 'https://us1.locationiq.com/v1/reverse.php?key=pk.43eca1a5c71fa8c277ecef1c575eb353&lat=' + latitude + '&lon=' + longitude + '&format=json',
        headers: {
            "Accept-Language": "en-US,en;"
        }
    }).then(function (response) {
            // handle success
            // console.log(response.data)
            console.log(response.data)
            return(response.data)
            // console.log(Object.keys(response.data['address']))
        })
        .catch(function (error) {
            // handle error
            console.log(error)
            alert("Error getLocation")
        })
        .then(function () {
            // always executed
        });
    // axios.get('https://us1.locationiq.com/v1/reverse.php?key=pk.43eca1a5c71fa8c277ecef1c575eb353&lat=' + latitude + '&lon=' + longitude + '&format=json')
}

export default GetLocation