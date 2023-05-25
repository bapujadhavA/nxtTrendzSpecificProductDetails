import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

class ProductItemDetails extends Component {
  state = {
    productsDetails: {},
    similarProductsList: [],
    count: 1,
    isLoading: true,
    showError: false,
  }

  componentDidMount() {
    this.getProductItem()
  }

  getProductItem = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const productDetailsApiUrl = `https://apis.ccbp.in/products/${id}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(productDetailsApiUrl, options)

    if (response.ok === true) {
      const data = await response.json()

      const updatedData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        price: data.price,
        description: data.description,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
        similarProducts: data.similar_products,
      }

      const {similarProducts} = updatedData

      const updatedSimilarProducts = similarProducts.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        title: eachItem.title,
        style: eachItem.style,
        price: eachItem.price,
        description: eachItem.description,
        brand: eachItem.brand,
        totalReviews: eachItem.total_reviews,
        rating: eachItem.rating,
        availability: eachItem.availability,
      }))

      this.setState({
        productsDetails: updatedData,
        similarProductsList: updatedSimilarProducts,
        isLoading: false,
      })
    } else {
      this.setState({showError: true, isLoading: false})
    }
  }

  onPlus = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  onMinus = () => {
    const {count} = this.state

    if (count > 1) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  onContinue = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-con">
      <Loader type="ThreeDots" color="#0b69ff" height={60} width={60} />
    </div>
  )

  renderFailureView = () => (
    <div className="error-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="error-img"
      />
      <h1 className="error-text">Product Not Found</h1>
      <button type="button" className="continue-btn" onClick={this.onContinue}>
        Continue Shopping
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {productsDetails, similarProductsList, count} = this.state
    const {
      imageUrl,
      title,
      price,
      description,
      brand,
      totalReviews,
      rating,
      availability,
    } = productsDetails
    return (
      <>
        <div className="product-item-con">
          <img src={imageUrl} alt="product" className="product-image" />

          <div className="sub-pros">
            <div>
              <h1 className="title-head">{title}</h1>
              <p className="rate">Rs {price}/-</p>
              <div className="price-cont">
                <div className="price-con">
                  <p>{rating}</p>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                    alt="star"
                    className="star"
                  />
                </div>
                <p>{totalReviews} Reviews</p>
              </div>
              <p className="desc">{description}</p>
              <p className="sub">Available: {availability}</p>
              <p className="sub">Brand: {brand}</p>
            </div>
            <div className="controls-con">
              <hr />
              <div className="buttons-con">
                <div className="increment-btns">
                  <button
                    type="button"
                    className="m-icon"
                    onClick={this.onMinus}
                    data-testid="minus"
                  >
                    <BsDashSquare className="icon" />
                  </button>
                  <p>{count}</p>
                  <button
                    type="button"
                    className="m-icon"
                    onClick={this.onPlus}
                    data-testid="plus"
                  >
                    <BsPlusSquare className="icon" />
                  </button>
                </div>
                <button type="button" className="add-btn">
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="lower-con">
          <h1 className="similar-products-head">Similar Products</h1>
          <ul className="similar-products-container">
            {similarProductsList.map(eachItem => (
              <SimilarProductItem details={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {isLoading, showError} = this.state

    return (
      <div className="product-item-details-con">
        {isLoading ? (
          this.renderLoader()
        ) : (
          <>
            <Header />
            {showError ? this.renderFailureView() : this.renderSuccessView()}
          </>
        )}
      </div>
    )
  }
}

export default ProductItemDetails
