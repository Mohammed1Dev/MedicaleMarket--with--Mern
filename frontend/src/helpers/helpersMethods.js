import { API_URL } from '../restApiUrl/api';
import queryString from 'query-string';

export const getProducts = (params) => {

  let query = queryString.stringify(params)

  return fetch(`${API_URL}/product?${query}`)
    .then(res => res.json())
    .then(res => res.products)
    .catch(err => console.error(err))

}

export const getSellers = () => {

  
    return fetch(`${API_URL}/superAdmin/ShowSellers`)
      .then(res => res.json())
      .then(res => res.sellers)
      .catch(err => console.error(err))
  
  }


export const relatedProducts = (id) => {

return fetch(`${API_URL}/product/related/${id}`)
.then(res => res.json())
.then(res => res.products)
.catch(err => console.error(err))

}


export const getBrainTreeToken = (userId, token) => {
return fetch(`${API_URL}/braintree/getToken/${userId}`, {
    method: "GET",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
})
    .then(res => res.json())
}



export const getOneProduct = (id) => {

return  fetch(`${API_URL}/product/${id}`, {
   method: "GET",
   headers: {
       "Accept": "application/json",
       "Content-Type": "application/json"
   }
})
.then(res => res.json())
.then(res => res.product)
.catch(err => console.error(err))

}



export const getCategories = () => {

 return  fetch(`${API_URL}/category`, {
      method: "GET",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      }
  })
  .then(res => res.json())
  .then(res => res.categories)
  .catch(err => console.error(err))

}



export const filterProducts = (skip, limit, filters) => {

const data = {
  skip,
  limit,
  filters
}

return  fetch(`${API_URL}/product/search`, {
   method: "POST",
   headers: {
       "Accept": "application/json",
       "Content-Type": "application/json"
   },
   body: JSON.stringify(data)
})
.then(res => res.json())
.then(res => res.products)
.catch(err => console.error(err))

}


export const procesPayment = (userId, token, paymentData) => {

return  fetch(`${API_URL}/braintree/purchase/${userId}`, {
   method: "POST",
   headers: {
       "Accept": "application/json",
       "Content-Type": "application/json",
       "Authorization": `Bearer ${token}`
   },
   body: JSON.stringify(paymentData)
})
.then(res => res.json())

}



export const createOrder = (userId, token, orderData) => {

return  fetch(`${API_URL}/order/create/${userId}`, {
     method: "POST",
     headers: {
         "Accept": "application/json",
         "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`
     },
     body: JSON.stringify(orderData)
 })
 .then(res => res.json())

}