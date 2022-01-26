import React, { useState } from 'react'
import { GetStaticProps } from 'next';

import { Product } from '../product/types';
import api from '../product/api'
import { StoreScreen } from '../product/screens/Store';
import { ParsedUrlQuery } from 'querystring';

interface Props {
  products: Product[]
}

export const indexRoute: React.FC<Props> = ({products}) => {
  return <StoreScreen products={products} />;
}

interface Params extends ParsedUrlQuery {
    mock: string
}

export const getStaticProps: GetStaticProps<unknown, Params> = async ({params}) =>{
  console.log(params)
  const products = await api.mock.list(params.mock);
  return {
    revalidate:10,
    props: {
      products
    },

  }
}

export const getStaticPaths: GetStaticPaths = async() => {
  return {
    paths: [],
    fallback: process.env.NODE_ENV === 'production' ? false : "blocking"
  }
}
export default indexRoute;
