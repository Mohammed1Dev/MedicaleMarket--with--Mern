import React, {useState, useEffect} from 'react'
import Container from './container'
import { getSellers } from './../helpers/helpersMethods';
import SellerCard from './sellersCard';
// import Search from './Search'


function ManageSellers(props) {

    const [Sellers, setSellers] = useState([])


    const loadSellers = () => {

        getSellers().then(sellers => setSellers(sellers))

    }


    useEffect(() => {
        loadSellers()

    }, [])

    // console.log(Sellers);

    return (
        <div>
            <Container 
               title="Super-Admin Section" 
               description="Manage Sellers" 
               className="container mt-5 text-center"
            >
                

                <hr/>

                <h1>All Existing Sellers</h1>
                    <div className="row mt-3 mb-5">
                        {Sellers.map(seller => (
                        <div key={seller._id} className="col-md-4">
                                <SellerCard seller={seller}></SellerCard> 
                             
                        </div>  
                        ))}
                     
                    </div>
                <hr/>

                
            </Container>
        </div>
    )
}

export default ManageSellers