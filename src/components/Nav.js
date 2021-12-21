import React, { Component } from 'react'
import { Container, Grid, Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './../App.css'



export default class MenuExampleInvertedSecondary extends Component {
  state = window.location.pathname === "/" ? {activeItem: "Your Location"} : {activeItem: "Search Other Location"}
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }
  render() {
    const { activeItem } = this.state 
    // const location = useLocation()

    return (
      <Container>
        <Grid centered textAlign="center">
          <Grid.Column mobile={16} computer={8}>
            <Segment style={{border: "none", boxShadow: "none"}}>
              <Menu  pointing secondary widths={2}>
                <Menu.Item
                  name='Your Location'
                  active={activeItem === 'Your Location'}
                  onClick={this.handleItemClick}
                  as={Link}
                  to="/"
                />
                <Menu.Item
                  name='Search Other Location'
                  active={activeItem === 'Search Other Location'}
                  onClick={this.handleItemClick}
                  as={Link}
                  to="/search"
                />
              </Menu>
            </Segment>
          </Grid.Column>
        </Grid>
        </Container>
    )
  }
}
