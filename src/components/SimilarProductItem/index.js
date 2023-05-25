import './index.css'

const SimilarProductItem = props => {
  const {details} = props
  const {imageUrl, title, price, brand, rating} = details

  return (
    <li className="similar-item">
      <img src={imageUrl} alt="similar products" className="similar-image" />
      <h1 className="similar-head">{title}</h1>
      <p className="similar-brand">by {brand}</p>
      <div className="price-rating-tag">
        <p className="similar-cost">Rs {price}/-</p>
        <div className="rating-tag">
          <p>{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="s-img"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
