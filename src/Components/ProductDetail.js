import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
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
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 50px;
  border: 1px solid #eee;
`;
const ProductImg = styled.div`
  width: 400px;
  img {
    width: 100%;
  }
`;
const ProductInfo = styled.div`
  diplay: flex;
  width: 500px;
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

const ProductDetail = () => {
  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const getProductDetail = async () => {
    let url = `https://my-json-server.typicode.com/Minhyerin/reactshoppingmall/${id}`;
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
            <div>
              <p>
                <span>배송</span>
                <span>허그맘 하루배송</span>
              </p>
              <p>
                <span>판매처</span>
                <span>허그맘</span>
              </p>
              <div>
                <select>
                  <option selected="true" disabled="true">
                    옵션을 선택하세요
                  </option>
                  {product.size.map((opt) => (
                    <option>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          </ProductInfo>
        </Header>
      </ProductDetailWrapper>
    </Container>
  );
};

export default ProductDetail;
