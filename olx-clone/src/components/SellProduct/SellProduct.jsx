import { setDoc ,doc } from "firebase/firestore"
import { db , storage } from "../../config/firebase-config"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 as uuid } from "uuid"
import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../../store/UserContext"
import Spinner from "../Spinner/Spinner"
import './sellProduct.css'


const SellProduct = () => {

    const {user} = useContext(UserContext);

    const [name , setName] = useState('')
    const [description , setDescription] = useState('')
    const [price , setPrice] = useState('')
    const [image , setImage] = useState(null);
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading , setLoading] = useState(false);

    const navigate = useNavigate()


    useEffect(() => {
        if (!user) {
          navigate("/login");
        }
      }, [user, navigate]);
    
    
      console.log(user)

    const handleImageChange = (event) => {
        if(event.target.files[0]){
            setImage(event.target.files[0])
        }
    }

    const handleSubmit=  async (e) => {
        e.preventDefault();
        if(!image ||  !name || !description || !price ){
            console.log('error');
            setLoading(false)
            setError('All field Required');
        }
        else{

        try {
            setLoading(true)
            const imageRef = ref(storage, `products/${uuid()}-${image.name}`);
            await uploadBytes(imageRef, image);
            const imageURL = await getDownloadURL(imageRef);

            const productRef = doc(db, 'products', uuid());
            setDoc(productRef, {
                name,
                description,
                price: parseFloat(price),
                imageUrl : imageURL,
                createdAt : new Date(),
                sellerName: user.username,
                sellerEmail : user.email,
            })

            setSuccess(`Successfully done`)
            setLoading(false)
            console.log(`Successfully done`);
            
        } catch (error) {
            setLoading(false)

            console.log(error);
            if(error.message == `TypeError: Cannot read properties of undefined (reading 'name)`){
                setError('All field Required')
            }
            else{
            setError(error.message);

            }

        }
    }

    }



    return(<div className="full-page">
         {loading && <Spinner/>}
         {!loading && <div className="sell-product">
            <h2>Add Product</h2>
            {error && <p color="red">{error}</p>}
            {success && <p>{success}</p>}
            <form onSubmit={handleSubmit} className="add-product-form">
                <input
                placeholder="Product Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <input
                type="text"
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
                <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                />
                <input 
                type="file" 
                onChange={handleImageChange} 
                className="image"
                placeholder="Product Image"/>
                <button type="submit" className="add-btn">Add Product</button>
            </form>
            <a href="/" className="redirect-link">Go to Home</a>
        </div>}
        </div>
    )
}

export default SellProduct