import React from 'react'
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'


const Cards = ({image,name,url}) => {
    
    return (
        <div>
            <Card color="green">
            <Image src={image} wrapped ui={false} />
            <Card.Content>
                <Card.Header textAlign="left">{name}</Card.Header>
                
                <Card.Description>
               
                </Card.Description>
            </Card.Content>
            <Card.Content extra color="green">
                <a href={url}>
                <Button color="green">
                <Icon name='spotify' />
                Play
                </Button>
                </a>

            </Card.Content>
            </Card>
        </div>
    )
}
export default Cards