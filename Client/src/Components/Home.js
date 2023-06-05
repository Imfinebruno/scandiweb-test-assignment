import React, { useState } from 'react';
import axios from 'axios';
import { Header } from './Header';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

export const Home = () => {
  const apiUrl = 'https://cors-anywhere.herokuapp.com/https://scandiweb-api-production.up.railway.app/public/index.php?url=api/product/';
  //const apiUrl = 'http://localhost/scandiweb-api/public/index.php?url=api/product/';

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    setLoading(true);
    fetch(apiUrl, {mode: 'cors'})
      .then((response) => response.json())
      .then((json) => {
        setData(json.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message)
        setLoading(false);
      });
}, []);
  
  const handleCheckboxChange = (e) => {
    const productId = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedIds([...selectedIds, productId]);
    } else {
      setSelectedIds(selectedIds.filter(id => id !== productId));
    }
  }

  const handleDelete = () => {
    console.log('Selected products:', selectedIds);

  const params = new URLSearchParams();
  selectedIds.forEach(id => params.append('id[]', id));

  const deleteRequests = selectedIds.map(id => {
    return axios.delete(`${apiUrl}${id}`)
    .then((response) => console.log(response.data));
  });

  axios.all(deleteRequests)
    .then(axios.spread(() => {
      setSelectedIds([]);
      axios.get(apiUrl)
        .then(response => {
          setData(response.data.data);
        })
        .catch(error => console.error(error));
    }))
    .catch(error => console.error(error));
 
    // Promise.all(
    //   selectedIds.map(id => {
    //     return fetch(`${apiUrl}${id}?${params.toString()}`, {
    //       method: 'DELETE',
    //     }).then(response => response.json());
    //   })
    // ).then(() => {
    //   setSelectedIds([]);
    //   fetch(apiUrl)
    //     .then((response) => response.json())
    //     .then((json) => {
    //       setData(json.data);
    //     })
    //     .catch(error => console.error(error));
    // }).catch(error => console.error(error));
  }


  return (
    <div className='container'>
      <Header title='Product List'/>
      <div className='nav-options'>
        <Link to='/add-product'>
          <button>ADD</button>
        </Link>
        <button id="delete-product-btn" onClick={handleDelete}>MASS DELETE</button>
      </div>

      <hr />
      <div className='product-container'>
        {error}
        {loading && <CircularProgress /> }
        {Array.isArray(data) && data.map((product)=> (
          <div key={product.id} className='product-box'>
            <div>
              <input
                type='checkbox'
                value={product.id}
                onChange={handleCheckboxChange}
                className='delete-checkbox'
                />
              <h2>{product.name}</h2>
              <p><strong>SKU:</strong> {product.sku}</p>
              <p><strong>Price:</strong> ${product.price}</p>
              {product.size !== null && product.size !== '' ? <p><strong>Size:</strong> {product.size}</p> : null}
              {product.weight !== null && product.weight !== '' ? <p><strong>Weight:</strong> {product.weight}KG</p> : null}
              {product.dimensions !== null && product.dimensions !== 'xx'? <p><strong>Dimensions:</strong> {product.dimensions}</p> : null}
            </div>
          </div>
        ))}
        {!Array.isArray(data) && <span>Add a product</span>}
      </div>
    </div>
  );
};

