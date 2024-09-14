import React from 'react'
import './ProductCard.css'

function ProductCard({ product, setProduct }) {

    const handleClick = () => {
        setProduct({
            name: product.name,
            price:product.price,
        })
    }

    return (
        <div className='ProductCard' onClick={handleClick}>
            <img src={product.img} alt='' className='card-image' />
            <div>
                <h3 className='card-name'>{product.name}</h3>
                <p className='card-price'>{product.price}</p>
            </div>
        </div>
    )
}

export default ProductCard