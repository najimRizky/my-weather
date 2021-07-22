// import React from 'react'
// import React from 'react'
import logo from './../assets/logo2x.png'
import { Container, Image } from 'semantic-ui-react'


function Header(){
    return(
        <Container>
            <Image src={logo} size="medium"></Image>
        </Container>
    )
}

export default Header;