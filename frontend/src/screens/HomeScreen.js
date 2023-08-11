import React, {useEffect, useReducer} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Product from '../components/Product'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const reducer = (state, action)=>{
  switch(action.type){
    case "FETCH_REQUEST":
      return {...state, loading: true};
      case "FETCH_SUCCESS":
        return {...state, products: action.payload, loading: false}
      case "FETCH_FAIL":
        return {...state, loading: false, error: action.payload}

      default:
        return state;
  }
}
const HomeScreen = () => {
  // const [products, setProduct] = useState([]);
 const [{loading, error, products}, dispatch]= useReducer(reducer,{
  loading: true, error: '', products: []
 })
  useEffect(() => {
    const fetchData=async()=>{
      dispatch({type:"FETCH_REQUEST", payload: loading})
      try{
      const res= await axios.get('/api/products')
      dispatch({type:"FETCH_SUCCESS", payload: res.data})
      }catch(error){
      dispatch({type: "DISPATCH_FAIL", payload: error.message})
      }
      
      }
    fetchData()
  }, []);
  return (
    <div>
        <div className='products'>
            {products.map((product)=>(
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
        </div>
    </div>
  )
}

export default HomeScreen