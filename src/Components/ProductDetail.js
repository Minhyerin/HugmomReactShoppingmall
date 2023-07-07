import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faMinus,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProductDetailWrapper = styled.div`
  width: 1100px;
  padding-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 100vw;
    flex-direction: column;
  }
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 50px;
  @media screen and (max-width: 768px) {
    width: 100vw;
    flex-direction: column;
    gap: 20px;
  }
`;
const ProductImg = styled.div`
  width: 400px;
  img {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    width: 100vw;
  }
`;
const ProductInfo = styled.div`
  diplay: flex;
  flex-direction: column;
  width: 500px;
  padding: 0 5px;
  @media screen and (max-width: 768px) {
    width: 100vw;
  }
  .desc {
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        margin-bottom: 10px;
        span {
          display: inline-block;
          width: 150px;
        }
      }
    }
  }
  .title {
    display: flex;
    align-items: center;
    gap: 20px;
    border-bottom: 1px solid #333;
    h1 {
      font-size: 20px;
    }
  }
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    .icon {
      border: 1px solid #333;
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;
    }
    .price {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
      span {
        font-size: 22px;
        font-weight: bold;
        color: #333;
      }
      .review {
        font-size: 14px;
        font-weight: 400;
        color: #bbb;
      }
    }
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

const Select = styled.div`
  margin-top: 50px;
  border: 1px solid #bbb;
  border-radius: 5px;
  padding: 5px;
  select {
    width: 100%;
    border: none;
    color: #72981e;
    font-weight: 500;
    font-size: 16px;
    &:focus {
      outline: none;
    }
  }
`;

const SelectCount = styled.div`
  margin-top: 30px;
  background-color: #eee;
  border-radius: 5px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const CountBox = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 0 7px;
  font-size: 14px;
  font-weight: 300;
  div {
    font-size: 20px;
  }
`;
const Price = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  line-height: 24px;
  span {
    font-size: 18px;
    font-weight: normal;
  }
`;

const ProductDetail = () => {
  const [num, setNum] = useState(1);
  const [priceCount, setPriceCount] = useState(0);
  const decrease = () => {
    setNum(num - 1);
    if (num == 1) {
      setNum(1);
      alert("1개이상 선택해야합니다.");
      return;
    }
  };

  const increase = () => {
    setNum(num + 1);
  };

  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const getProductDetail = async () => {
    let url = `https://my-json-server.typicode.com/Minhyerin/HugmomReactShoppingmall/products/${id}`;
    let response = await fetch(url);
    let data = await response.json();
    setLoading(false);
    setProduct(data);
  };
  useEffect(() => {
    getProductDetail();
  }, []);
  if (loading || product == null) return <h1>Loading</h1>; //로딩값출력

  return (
    <Container>
      <ProductDetailWrapper>
        <Header>
          <ProductImg>
            <img src={product.img} />
          </ProductImg>
          <ProductInfo>
            <div className="title">
              <h1>{product.title}</h1>
              <HotButton>{product.hot && "HOT"}</HotButton>
            </div>
            <div className="info">
              <div className="price">
                <span>{product.price}원</span>
                <span className="review">21건의 상품평이 있습니다.</span>
              </div>
              <div className="icon">
                <FontAwesomeIcon color="#333" icon={faShareNodes} />
              </div>
            </div>
            <div className="desc">
              <ul>
                <li>
                  <span>배송</span>
                  <span>허그맘 하루배송</span>
                </li>
                <li>
                  <span>판매처</span>
                  <span>허그맘</span>
                </li>
              </ul>
            </div>
            <Select>
              <select>
                <option selected="true" disabled="true">
                  옵션을 선택하세요
                </option>
                {product.size.map((opt) => (
                  <option>{opt}</option>
                ))}
              </select>
            </Select>
            <SelectCount>
              <CountBox>
                <FontAwesomeIcon icon={faMinus} onClick={() => decrease()} />
                <div>{num}</div>
                <FontAwesomeIcon icon={faAdd} onClick={() => increase()} />
              </CountBox>
              <Price>
                {product.price * num}
                <span>원</span>
              </Price>
            </SelectCount>
          </ProductInfo>
        </Header>
      </ProductDetailWrapper>
    </Container>
  );
};

export default ProductDetail;
