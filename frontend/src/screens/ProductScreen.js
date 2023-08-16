import React from 'react'
import {useParams} from 'react-router-dom'
import {  useEffect, useReducer } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import ListGroup from 'react-bootstrap/ListGroup';

const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH_PRODUCT':
      return { ...state, product: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreateReview: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreateReview: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreateReview: false };
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const ProductScreen = () => {
    const params = useParams()
    const {slug} = params
      const [{ loading, error, product }, dispatch] =
    useReducer(reducer, {
      product: [],
      loading: true,
      error: '',
    });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST', payload: loading });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', err });
      }
    };
    fetchData();
  }, [slug]);
  return (
    
          <Row>
      <Col md={6}>
        <img src={product.image} alt={product.name}/>       
      </Col>
      <Col md={3}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h1>{product.name}</h1>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
    
   
  )
  
}

export default ProductScreen