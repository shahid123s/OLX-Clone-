import { useEffect, useState } from 'react'
import adUrl from '../../assets/banner copy.png'
import axios from 'axios'

import './ads.css'

const Ads = () => {

   
    return(
        <div className="ads">
            <div className='category'>
                <a className='link' href="">ALL Category</a>
                <a className='link' href="">Cars</a>
                <a className='link' href="">Motor Cycles</a>
                <a className='link' href="">Mobile Phone</a>
                <a className='link' href="">For Sale: House & Appartment</a>
                <a className='link' href="">Scooters</a>
                <a className='link' href="">Commercial & Other Vehicles</a>
                <a className='link' href="">For Rent : House & Appartment</a>
            </div>
            <div className="banner">
            <img src={adUrl} alt="" />
            </div>
        </div>
    )
}

export default Ads