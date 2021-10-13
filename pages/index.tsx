import { GetStaticProps } from 'next';
import React from 'react'
import { Product } from '../product/types';

interface Props {
  products: Product[]
}

export const indexRoute: React.FC<Props> = ({children}) => {
  return (
    <div>
      <h1>Welcome</h1>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () =>{
  return {
    props: {
      products: [],
    },
  }
}
 
export default indexRoute;
