import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import BannerSlide from "./BannerSlide";

const Contianer = styled.div`
  width: 100vw;
  margin-top: 1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ProductTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  h1 {
    font-size: 24px;
    margin-bottom: -10px;
  }
`;
const ProductCardWrapper = styled.div`
  margin-top: 30px;
  width: 1100px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const ProductAll = () => {
  const [productList, setProductList] = useState([]); //json파일데이터저장
  const [query, setQuery] = useSearchParams(); // url값, url업데이트 함수
  const getProduct = async () => {
    let searchQuery = query.get("q") || ""; //get을 사용하여 q뒤의 값을 가져온다.
    let url = `https://my-json-server.typicode.com/Minhyerin/HugmomReactShoppingmall/products?q=${searchQuery}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    setProductList(data);
  };

  useEffect(() => {
    getProduct();
  }, [query]);

  return (
    <Contianer>
      <BannerSlide />
      <ProductTitle>
        <h1>허그맘 베스트 상품</h1>
        <p>지금 가장 핫한 허그맘의 베스트 상품을 만나보세요!</p>
      </ProductTitle>
      <ProductCardWrapper>
        {productList.map((item) => (
          <ProductCard item={item} />
        ))}
      </ProductCardWrapper>
    </Contianer>
  );
};

export default ProductAll;
