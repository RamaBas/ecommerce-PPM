import React, { useState } from 'react'
import { GetStaticProps } from 'next';
import { Button, Grid, Link, Stack, Text, Image, Flex } from '@chakra-ui/react';

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
    <Stack spacing={6}>
      <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
        {products.map(product => 
          <Stack key={product.id} spacing={3} backgroundColor="gray.100" borderRadius="md" padding={4} >
            <Image src={product.image} alt={product.title}></Image>
            <Stack spacing={1}>
              <Text>{product.title}</Text>
              <Text fontSize="sm" fontWeight="500" color="green.500">{parseCurrency(product.price)}</Text>
            </Stack>
            <Button
              colorScheme="primary" 
              variant="outline"
              onClick={()=> handleAddToCart(product)}
            >
              Add
            </Button>
          </Stack>
          
        )}
      </Grid>
      {Boolean(cart.length) && 
          <Flex
            bottom={4}
            position="sticky"
            alignItems="center"
            justifyContent="center">
            <Button 
              padding={4}
              as={Link}
              href={`https://wa.me/5492215690717?text=${encodeURIComponent(checkoutText)}`}
              isExternal
              colorScheme="whatsapp">
              Realizar pedido ({cart.length} productos)
            </Button>
          </Flex>
      }
    </Stack>
  )
}

export const getStaticProps: GetStaticProps = async () =>{
  const products = await api.list();
  return {
    revalidate:10,
    props: {
      products
    },

  }
}
 
export default indexRoute;
