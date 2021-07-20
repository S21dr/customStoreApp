import React from "react";
import "./product.scss";
import {Button} from "antd";
import {REMOVE_PRODUCT} from "../../state/stores/ProductsStore";

export class Product extends React.Component {
  render() {
    const { product,dispatch } = this.props;
    const price = product.price.toLocaleString("ru", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      currency: "RUB",
      style: "currency",
    });

    return (
      <div className="product">
        <div className="product-info">
          <p className="product-info-title">
            {product.title} - {product.id}
          </p>
          <p className="product-info-description">{product.description}</p>
          <div>
            <span className="product-info-price">{price}</span>
          </div>
          <Button type="primary" onClick={()=>dispatch(REMOVE_PRODUCT,{id:product.id})}>Удалить товар</Button>
        </div>
        <div className="product-image-frame">
          <img
            className="product-image"
            src="https://s1.ticketm.net/dam/a/3ea/a7473588-64b1-4fac-ad26-596f70b993ea_647801_TABLET_LANDSCAPE_LARGE_16_9.jpg"
            alt=""
          />
        </div>
      </div>
    );
  }
}
