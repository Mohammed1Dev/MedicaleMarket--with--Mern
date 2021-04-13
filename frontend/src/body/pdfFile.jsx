import React from 'react'
import axios from "axios"
import { Document } from 'react-pdf';

import { API_URL } from './../restApiUrl/api'

const  File = ({ item, url, className }) => {

    var renderPdf = '';

    axios.get(`${API_URL}/${url}/${item._id}`).then(response =>
    (response.status === 200? response.data : null))
    .then(pdfdata => {
        var len = pdfdata.length;
        var bytes = new Uint8Array( len );
        for (var i = 0; i < len; i++){
            bytes[i] = pdfdata.charCodeAt(i);
        }
        
     renderPdf = bytes.buffer
    })

    return (
        <div>
            {/* file={{data: JSON.parse(renderPdf).data}} scale={1.3} pages={Infinity} */}
            <object width="100%" height="400" data={`${API_URL}/${url}/${item._id}`} type="application/pdf" >
            </object >
        </div>
    )
}

export default File  