import axios from "axios";
import {  useEffect, useState, useContext } from "react";
import './row.css'
import UserContext from "../../store/UserContext";
import ProductContext from "../../store/ProductContext";
import { getDocs , collection} from "firebase/firestore";
import { db } from "../../config/firebase-config";
import Spinner from "../Spinner/Spinner";
import { useNavigate } from "react-router-dom";
const Rows = () => {

    const {products, setProducts} = useContext(ProductContext)
    const {user} = useContext(UserContext)
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()

    useEffect(()=> {    

        const fetchProduct = async() => {

            const collectionRef = collection(db, 'products')
            const dbRes = await getDocs(collectionRef);

            const fetchedDocuments = dbRes.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(), 
              }));



            console.log(fetchedDocuments)

            const response = await axios.get('https://fakestoreapi.com/products')
            setProducts([...fetchedDocuments, ...response.data])
            
            console.log(products)
            setLoading(false)
        }


        

        console.log(user)
        fetchProduct()
    },[])

    const descriptionLimit = (text , limit) => {
      const word = text.split(' ');
        if(word.length > limit) {

            return word.slice(0, limit).join('  ') + '...'
        }
        else {
            return word.join(' ')
        }
    }


    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`)
    }

    return(
        <div className={loading? 'products-loading' : 'products'}>
            {loading && <Spinner/>}

            {!loading && products.map((product) => (
        
             <div className="product" key={product.id}  >

           <div key={product.id} onClick={() => handleProductClick(product.id)} className="image-part">
               <img className='product-img' src={product?.image || product?.imageUrl} alt="" />
              
           </div>
           <div className="detals-part">
           <h6 className="price">
                   Rs.{product?.price} 
               </h6>
               <p className="description">
                   {descriptionLimit(product.title || product.name, 5)}
               </p>
           </div>

            </div>  
       
   ))}
        </div>
    )
    
}


export default Rows;