import React, { useState } from 'react'
import { GetStaticProps } from 'next';
import { Button, Grid, Link, Stack, Text, Image } from '@chakra-ui/react';

import { Product } from '../product/types';
import api from '../product/api'

interface Props {
  products: Product[]
}

export const indexRoute: React.FC<Props> = ({products}) => {
  const [cart, setCart] = useState<Product[]>([])
  const initialMenssage = "Hola, te envio un pedido de:\n "
  const parseCurrency = (value: number): string => {
    return value.toLocaleString(
      'es-AR', {
      style:'currency',
      currency:'ARS'
    })
  }

  const handleAddToCart = (prod: Product) => {
    setCart(cart => cart.concat(prod))
  }

  const checkoutText = React.useMemo(
    ()=> 
      cart
      .reduce((message, product) => message.concat(`* ${product.title} - ${parseCurrency(product.price)}\n`),initialMenssage)
      .concat(`\nTotal: ${parseCurrency(cart.reduce((total, product) => total + product.price,0))}`),
      [cart]);
   

  return (
    <Stack>
      <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
        {products.map(product => 
          <Stack backgroundColor="gray.100" key={product.id}>
            <Image src={product.image} alt={product.title}></Image>
            <Text>{product.title}</Text>
            <Text>{parseCurrency(product.price)}</Text>
            <Button 
              colorScheme="primary" 
              onClick={()=> handleAddToCart(product)}
            >
              Add
            </Button>
          </Stack>
          
        )}
      </Grid>
      {Boolean(cart.length) && 
          <Button 
            as={Link}
            href={`https://wa.me/5492215690717?text=${encodeURIComponent(checkoutText)}`}
            isExternal
            colorScheme="whatsapp"
          >
            Realizar pedido ({cart.length} productos)
          </Button>
      }
    </Stack>
  )
}

export const getStaticProps: GetStaticProps = async () =>{
  const products = await api.list();
  return {
    props: {
      products
    },

  }
}
 
export default indexRoute;
