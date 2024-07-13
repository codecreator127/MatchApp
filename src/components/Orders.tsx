import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Stack } from '@mui/material';
import React, { useState } from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import HandshakeIcon from '@mui/icons-material/Handshake';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Orders: React.FC = () => {
  const [activeDiv, setActiveDiv] = useState<number | null>(null);
  const [result, setResult] = useState<string>('');

  const divs: { name: string; action: () => void }[] = [
    {
      name: 'Buy',
      action: () => alert('Redirect to Plantbarn?')
    },
    {
      name: 'Trade',
      action: () => alert('Only appear if there is one available in area')
    },
    {
      name: 'Sponsor',
      action: () => alert('Redirect to sponsor page?')
    }
  ];

  const handleClick = (index: number): void => {
    setActiveDiv(index);
    divs[index].action();
  };

  return (
    <>
      <Card style={{ maxHeight: 1500 }}>
        <CardHeader title={`You've matched with ${"Snake Plant"}!`} subheader="You can now buy, trade or sponsor this plant" />
        <CardMedia component="img" style={{ borderRadius: "50%" }} image="https://media.post.rvohealth.io/wp-content/uploads/2022/01/snake-plant-detail-732x549-thumbnail-732x549.jpg" alt="Plant" />
        <CardContent>
          <Stack spacing={2}>
            {divs.map((div, index) => (
              <Button variant='contained' key={index} sx={{ backgroundColor: "#8cb1a1", "&:hover": {backgroundColor: "#a8c4b8"}, height: 50, fontSize: 18, borderRadius: 100, textTransform: "lowercase" }}>
                {div.name} Plant
              </Button>
            ))}
          </Stack>
        </CardContent>
        {/*<CardActions disableSpacing>
          <IconButton aria-label='Buy Plant'>
            <AddShoppingCartIcon sx={{ height: 30, width: 30 }}/>
          </IconButton>
          <IconButton aria-label='Trade Plant'>
            <HandshakeIcon sx={{ height: 30, width: 30 }} />
          </IconButton>
          <IconButton aria-label='Sponsor Plant'>
            <AttachMoneyIcon sx={{ height: 30, width: 30 }} />
          </IconButton>
        </CardActions>
        */}
      </Card>
    </>
  );
};

export default Orders;