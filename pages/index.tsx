import React, { useState } from 'react'
import { GetStaticProps } from 'next';
import { Button, Grid, Link, Stack, Text, Image, Flex } from '@chakra-ui/react';
import { motion, AnimatePresence, AnimateSharedLayout   } from 'framer-motion';

import { Product } from '../product/types';
import api from '../product/api'

interface Props {
  products: Product[]
}

export const indexRoute: React.FC<Props> = ({products}) => {
  const [cart, setCart] = useState<Product[]>([])
  const [selectedImage, setSelectedImage] = useState(null)

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
   
    {selectedImage && console.log("selectedImage", selectedImage)}
  return (
    <AnimateSharedLayout type="crossfade">
      <Stack spacing={6}>
        <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
          {products.map(product => 
            <Stack key={product.id} spacing={3} backgroundColor="gray.100" borderRadius="md" padding={4} >
              <Image 
                as={motion.img}
                cursor="pointer"
                layoutId={product.id}
                borderTopRadius="md" 
                maxHeight={128} 
                objectFit="cover" 
                src={product.image} 
                alt={product.title}
                onClick={()=> setSelectedImage({image: product.image, id: product.id})}
                />
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
        <AnimatePresence>
          {Boolean(cart.length) && 
              <Flex
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                as={motion.div}
                bottom={4}
                position="sticky"
                alignItems="center"
                justifyContent="center">
                <Button 
                  padding={4}
                  as={Link}
                  href={`https://wa.me/5492215690717?text=${encodeURIComponent(checkoutText)}`}
                  isExternal
                  colorScheme="whatsapp"
                  leftIcon={<Image src="https://icongr.am/fontawesome/whatsapp.svg?size=32&color=ffffff"/>}>
                  Realizar pedido ({cart.length} productos)
                </Button>
              </Flex>
          }
        </AnimatePresence>
      </Stack>
      <AnimatePresence>
        {selectedImage && 
          <Flex>
            <Image 
              key="backdrop" 
              src={selectedImage.image} 
              as={motion.div} 
              backgroundColor="rgba(0,0,0,0.5)" 
              alignItems="center" 
              justifyContent="center" 
              position="fixed"
              top={0}
              left={0}
              height="100%"
              width="100%"
              layoutId={selectedImage.id}
              onClick={()=>{setSelectedImage(null)}}/>
          </Flex>
        }
      </AnimatePresence>
    </AnimateSharedLayout>
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
