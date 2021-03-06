import React, { useState } from 'react'
import { GetStaticProps } from 'next';

import { Product } from '../product/types';
import api from '../product/api'
import { StoreScreen } from '../product/screens/Store';

interface Props {
  products: Product[]
}

export const indexRoute: React.FC<Props> = ({products}) => {
  console.log("Products", products)
  return <StoreScreen products={products} />;
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
