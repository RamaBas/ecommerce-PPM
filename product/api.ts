import axios from "axios"
import Papa from "papaparse"

import { Product } from './types';


export default {
    list: async (): Promise<Product[]> => {
        return axios.get(
            'https://docs.google.com/spreadsheets/d/e/2PACX-1vRO58C9q9i_WuQ84y0WBT0c6rewOn1WixeK2udaDKYKpdj1jXfZQO2cu0IwRK5E2v62vlWS3EJ6DohA/pub?output=csv',
            {
                responseType:'blob'
            }
        ).then(
            (res:any) =>
                new Promise<Product[]>((resolve, reject) => {
                    Papa.parse(res.data, {
                        header: true,
                        complete: (results) =>{
                            const products = results.data as Product[]
                            
                            return resolve(products.map(product => ({
                                ...product,
                                price: Number(product.price)
                            })))
                        },
                        error: (error) => {reject(error.message)}
                    });
                }),
        );
    },
};