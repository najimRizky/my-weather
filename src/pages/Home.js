// import MyLocation from './../components/MyLocation'
import axios from 'axios';
// import _ from 'lodash'
import React from 'react'
import { Search, Grid, Container } from 'semantic-ui-react'
import CustomLocation from '../components/CustomLocation';

const source = []
const longi = []
const latit = []
const count = [0]

const initialState = {
    loading: false,
    results: [],
    value: '',
}

function truncate(source, size) {
    var tmp = source.split(',')[0]
    var tmp2 = source.split(',')[1] !== undefined ? ", " + source.split(',')[1] : ""
    var tmp3 = source.split(',')[2] !== undefined ? ", " + source.split(',')[2] : ""
    // return source.length > size ? source.slice(0, size - 1) + "…" : source;
    return tmp + tmp2 + tmp3
}

const resultRenderer = ({ title, lat, lon }) => <p >{truncate(title, 30)}</p>

const populateData = (data) => {

    // source.push(data)
    for (let i = 0; i < data.length; i++) {
        source.push({ "title": data[i].display_name, "lat": data[i].lat, "lon": data[i].lon })
    }
}

const resetLatLon = () => {
    latit.length = 0
    longi.length = 0
}

function exampleReducer(state, action) {
    switch (action.type) {
        case 'CLEAN_QUERY':
            return initialState
        case 'START_SEARCH':
            return { ...state, loading: true, value: action.query }
        case 'FINISH_SEARCH':
            return { ...state, loading: false, results: action.results }
        case 'UPDATE_SELECTION':
            resetLatLon()
            var lat = (action.selection).split(',')[((action.selection).split(',').length) - 2]
            var lon = (action.selection).split(',')[((action.selection).split(',').length) - 1]
            setLatLon(lat, lon)
            return { ...state, value: action.selection }
        default:
            throw new Error()
    }
}


async function getLocation(keywords) {
    axios({
        method: 'GET',
        url: 'https://us1.locationiq.com/v1/search.php?key=pk.43eca1a5c71fa8c277ecef1c575eb353&q=' + keywords + '&format=json',
        headers: {
            "Accept-Language": "en-US,en;"
        }
    })
        .then(function (response) {
            console.log(response.data)
            populateData(response.data)
            // console.log(response.data)
            // return populateData(response.data)
        })
        .catch(function (error) {
            console.log(error)
            // alert("Error getLocation")
            source.length = 0
        })
        .then(function () {
            // console.log("Get location finish")
            // console.log(source.length)
        });
}
function setLatLon(lat, lon) {
    latit.push(lat)
    longi.push(lon)
}


function Home() {
    const [state, dispatch] = React.useReducer(exampleReducer, initialState)
    const { loading, results, value } = state

    function confirmFetchData() {
        if (source.length === 0)
            if (count[0] < 7) {
                setTimeout(function () { confirmFetchData() }, 300);
                count[0]++
            } else {
                dispatch({
                    type: 'FINISH_SEARCH',
                    results: source,
                })
                count[0] = 0
                return
            }
        else {
            dispatch({
                type: 'FINISH_SEARCH',
                results: source,
            })
            return
        }
    }

    const timeoutRef = React.useRef()
    const handleSearchChange = React.useCallback((e, data) => {
        // latit.length = 0
        // longi.length = 0
        clearTimeout(timeoutRef.current)
        dispatch({ type: 'START_SEARCH', query: data.value })

        timeoutRef.current = setTimeout(() => {
            if (data.value.length === 0 || (data.value).replace(/\s/g, '').length === 0) {
                source.length = 0
                latit.length = 0
                longi.length = 0
                dispatch({ type: 'CLEAN_QUERY' })
                return
            }

            getLocation(data.value)
                .then(function () {
                    source.length = 0
                })
                .then(
                    function () {
                        // eslint-disable-next-line
                        confirmFetchData()
                    }
                )
        }, 300)

        // eslint-disable-next-line
    }, [])
    React.useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [])
    return (
        // <MyLocation/>
        <Container style={{ color: 'black' }} textAlign="left">
            <Grid>
                <Grid.Column width={16}>
                    <Search loading={loading} onResultSelect={(e, data) => dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title + "," + data.result.lat + "," + data.result.lon })} onSearchChange={handleSearchChange} results={results} value={value} resultRenderer={resultRenderer} />
                </Grid.Column>
            </Grid>
            <br /><br />
            <br /><br />
            {latit.length !== 0 || longi.length !== 0 ? (
                <>
                    {/* Latitude  = {latit[0]}<br/>
                    Longitude = {longi[0]} */}
                    <CustomLocation lat={latit[0]} lon={longi[0]} />
                </>
            ) : (
                <></>
            )}
        </Container >
    )
}

export default Home