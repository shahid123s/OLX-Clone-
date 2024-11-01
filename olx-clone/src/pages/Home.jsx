import Ads from '../components/Ads/Ads'
import Rows from '../components/Rows/Rows'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { useState } from 'react'



const Home =({data}) =>{


    return(
        <>
         <div>
            <Navbar></Navbar>
            <Ads />
            <Rows ></Rows>
            <Footer/>
        </div>
        </>
    )
}

export default Home