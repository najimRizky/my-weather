import { useEffect, useState } from "react"
import { Container, Grid, Search } from "semantic-ui-react"
import BaseWeatherApp from "../components/BaseWeatherApp"

import searchLocation from "../utils/searchLocation"

const CustomLocation = () => {
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [selected, setSelected] = useState()

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
    }

    const resultRenderer = ({ title, id }) => <p key={id}>{title}</p>

    useEffect(() => {
        if (searchValue.length > 0) {
            setLoading(true)
        } else {
            setLoading(false)
        }
        const delay = setTimeout(async () => {
            console.log("sini")
            if (searchValue.length > 0) {
                const locations = await searchLocation(searchValue)
                const renameLocations = locations ? locations.map(location => {
                    return {
                        id: location.place_id,
                        title: location.display_name,
                        latitude: location.lat,
                        longitude: location.lon
                    }
                }) : undefined
                setResults(renameLocations)
                setLoading(false)
            }
        }, 1000)
        return () => clearTimeout(delay)
    }, [searchValue])

    return (
        <Container style={{ color: 'black' }}>
            <Grid centered>
                <Grid.Column computer={8} tablet={12} >
                    <Search input={{ fluid: true }}
                        loading={loading}
                        onSearchChange={handleSearchChange}
                        resultRenderer={resultRenderer}
                        results={results}
                        onResultSelect={(e, data) => setSelected(data.result)}
                    />
                </Grid.Column>
            </Grid>
            <div style={{ marginTop: "50px" }}>
                {selected ? (
                    <BaseWeatherApp latitude={selected.latitude} longitude={selected.longitude} />
                ) : (
                    <h4>Please select any location..</h4>
                )}
            </div>
        </Container >
    )
}

export default CustomLocation