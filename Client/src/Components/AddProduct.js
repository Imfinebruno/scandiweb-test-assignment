import { React, useEffect, useState} from 'react';
import axios from 'axios';
import { Header } from './Header';
import { Link } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';


export const AddProduct = () => {

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  //form
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');

  //options for specific types
  const [size, setSize] = useState(null);
  const [weight, setWeight] = useState(null);
  const [dimensions, setDimensions] = useState('');

  //values for dimensions
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');

  useEffect(() => {
    setDimensions(`${height}x${width}x${length}`);
  }, [height, width, length]);

  const handleSave = (e)=>{
    e.preventDefault();

    const apiUrl = 'https://cors-anywhere.herokuapp.com/https://scandiweb-api-production.up.railway.app/public/index.php?url=api/product/';

    const productData = {
      sku,
      name,
      price,
      size,
      weight,
      dimensions
    };
    if (sku && name && price && type && (type !== "DVD" || size) && (type !== "Book" || weight) && (type !== "Furniture" || (height && width && length))) {    
      axios.post(apiUrl, productData)
        .then((response) => {
          //CHECKING THE RESPONSE FROM API TO SHOW A MESSAGE
          const responseData = JSON.parse(response.data.data);
          if (responseData.error) {
            setError('');
            setMessage('SKU already exists.');
            setTimeout(() => {
              setMessage('');
            }, 2000);
          }else {
            setError('');

            //reset values to empty
            setSize('');
            setWeight('');
            setDimensions('');

            setMessage('Product saved successfully!');
            setTimeout(() => {
              setMessage('');
            }, 2000);
          }
        })
    }else{
      setError('Please fill all information');
    }
  }


  return (
    <div className='container'>
      <Header title='Product Add' />
      <div className='nav-options'>
        <button>
            <Link className="btn-add" to='/scandiweb'>Back</Link>
        </button>
        <button>
            <Link to='/scandiweb'>Cancel</Link>
        </button>
      </div>

      <hr />

      {message && (
        <Fade>
          <div>
            <p>{message}</p>
          </div>
        </Fade>
      )}

      <div id='product_form'>
        <form onSubmit={handleSave}>
        <Fade direction='left'>
          <label htmlFor='sku'>SKU:</label>
          <input
            id ='sku'
            type='text'
            value={sku}
            placeholder='ex.: XXX000000'
            onChange={(e) => setSku(e.target.value)}
            
          />
         
          <label htmlFor='name'>NAME:</label>
          <input
            id ='name'
            type='text'
            value={name}
            placeholder='ex.: Chair'
            onChange={(e) => setName(e.target.value)}
            
          />
          <label htmlFor='price'>PRICE:</label>
          <input
            id ='price'
            type='text'
            value={price}
            placeholder='$$$'
            onChange={(e) => setPrice(e.target.value)}
            
          />
          <select id='productType' onChange={(e) => setType(e.target.value)} required >
            <option disabled selected>Select</option>
            <option>DVD </option>
            <option>Book</option>
            <option>Furniture</option>
          </select>

          <div className='opt'>
          {type === "DVD" && (
            <div>
              <label htmlFor="size">Size (MB):</label>
              <input
                id="size"
                value={size}
                placeholder=""
                onChange={(e) => setSize(e.target.value)}
                required
              />
              <span>Please provide the size in MB</span>
            </div>
          )}
          {type === "Book" && (
            <div>
              <label htmlFor="weight">Weight (KG):</label>
              <input
                id="weigth"
                value={weight}
                placeholder=""
                onChange={(e) => setWeight(e.target.value)}
                required
              />
              <span>Please provide the approximate weight</span>
            </div>
          )}
          {type === "Furniture" && (
            <div>
              <label htmlFor="height">Height:</label>
              <input
                id="height"
                value={height}
                placeholder=""
                onChange={(e) => setHeight(e.target.value)}
                required
              />
              <label htmlFor="width">Width:</label>
              <input
                id="width"
                value={width}
                placeholder=""
                onChange={(e) => setWidth(e.target.value)}
                required
              />
              <label htmlFor="length">Length:</label>
              <input
                id="length"
                value={length}
                placeholder=""
                onChange={(e) => setLength(e.target.value)}
                required
              />
              <span>Please provide dimensions in HxWxL format</span>
            </div>
          )}
          </div>
            <button onClick={handleSave}>Save</button>
            <p>{error}</p>
        </Fade>
        </form>
      </div>
    </div>
  )
}
