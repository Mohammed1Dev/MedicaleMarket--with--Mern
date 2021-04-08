import React from 'react'
import { API_URL } from './../restApiUrl/api';

const  Image = ({ item, url, className }) => {
    return (
        <div>
            <img className={className} src={`${API_URL}/${url}/${item._id}`} alt={`${item.name}`}/>
        </div>
    )
}

export default Image  