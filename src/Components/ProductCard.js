import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 250px;
  height: 500px
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    width: 45%;
    height: 370px;
  }
`;
const ProductImg = styled.div`
  position: relative;
  overflow: hidden;
  width: 250px;
  height: 300px;
  border-radius: 10px;
  .organic {
    position: absolute;
    top: 0;
    right: 0;
    padding: 7px 10px;
    font-size: 14px;
    font-weight: 300;
    color: #fff;
    background-color: rgba(114, 152, 30, 0.74);
    border-radius: 0 0 0 10px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.3s;
    &:hover {
      transform: scale(1.1);
    }
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 230px;
  }
`;
const HotButton = styled.div`
  width: 30px;
  text-align: center;
  padding: 2px 5px;
  background-color: #ff4545;
  border-radius: 20px;
  color: #fff;
  font-size: 13px;
  margin-top: 5px;
`;
const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  .title {
    font-size: 16px;
    color: #333;
  }
  .price {
    font-size: 17px;
    font-weight: 500;
  }
`;
const Sale = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  .saleRate {
    font-size: 16px;
    font-weight: 500;
    color: #ff4545;
  }
  .originPrice {
    font-size: 15px;
    color: #bbb;
    text-decoration: line-through;
  }
`;

const ProductCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate(`/product/${item.id}`)}>
      <ProductImg>
        <img src={item.img} />
        {item.organic && <div className="organic">유기농</div>}
      </ProductImg>
      <HotButton>{item.hot && "HOT"}</HotButton>
      <ProductInfo>
        <span className="title">{item.title}</span>
        <span className="price">{parseInt(item.price)}원</span>
        {item.sale == true && (
          <Sale>
            <span className="saleRate">{item.saleRate}%</span>
            <span className="originPrice">{item.originPrice}</span>
          </Sale>
        )}
      </ProductInfo>
    </Container>
  );
};

export default ProductCard;
