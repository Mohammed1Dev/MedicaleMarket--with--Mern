import React, {useState, useEffect} from 'react'
import Container from './container'
import { getProducts } from './../helpers/helpersMethods';
import Card from './Card';
import CarouselPage  from "./Slides";
// import Search from './Search'

function Home() {

    const [productsBestSellers, setProductsBestSellers] = useState([])
    const [productsArrivals, setProductsArrivals] = useState([])

    const loadBestSellers = () => {

        getProducts({sortBy: 'sold', order: 'desc', limit: 6})
          .then(products => setProductsBestSellers(products))

    }

    const loadArrivals = () => {

        getProducts({sortBy: 'createdAt', order: 'desc', limit: 3})
          .then(products => setProductsArrivals(products))

    }

    useEffect(() => {
        loadArrivals()
        loadBestSellers()

    }, [])

    return (
        <div>
            <CarouselPage />
            <Container 
               title="Home Page" 
               description="Node React bEcommerce App" 
               className="container mt-5"
            >
                
            {/* <Search /> */}

                <hr/>

                <h1>Arrival Products</h1>
                    <div className="row mt-3 mb-5">
                        {productsArrivals.map((product, i) => (
                        <div key={product._id} className="col-md-4">
                                <Card product={product}></Card> 
                        </div>  
                        ))}
                    </div>
                <hr/>

                

                <h1>Best Sellers</h1>
                <div className="row mt-3 mb-5">
                        {productsBestSellers.map((product, i) => (
                        <div  key={product._id} className="col-md-4">
                                <Card product={product}></Card> 
                        </div>  
                        ))}
                    </div>
            </Container>
        </div>
    )
}

export default Home
