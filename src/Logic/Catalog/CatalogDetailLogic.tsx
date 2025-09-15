import { useEffect, useState } from 'react'

export default function CatalogDetailLogic(route: any) {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(0);
     
    useEffect(() => {
        setProduct(route?.route?.params?.product);
        setQuantity(route?.route?.params?.quantity);
    }, [route?.route?.params?.product, route?.route?.params?.quantity]);
   return {
    product,
    quantity
   }
}