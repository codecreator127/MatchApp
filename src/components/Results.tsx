import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function Results() {

    return (
        <>
            <Card sx={{ display: 'flex' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 180, maxHeight: 150 }}
                    image="https://hips.hearstapps.com/hmg-prod/images/thimble-cactus-royalty-free-image-1695063544.jpg?crop=1.00xw:0.834xh;0,0.115xh&resize=980:*"
                    alt="Cactus plant"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', width: 350, maxHeight: 150, overflowY: "scroll" }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            Cactus
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div" >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </Typography>
                    </CardContent>
                </Box>
                
            </Card>
        </>
    );
}

export default Results