import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";

const Contianer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductCardWrapper = styled.div`
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
    let url = `http://localhost:3005/products?q=${searchQuery}`;
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
      <ProductCardWrapper>
        {productList.map((item) => (
          <ProductCard item={item} />
        ))}
      </ProductCardWrapper>
    </Contianer>
  );
};

export default ProductAll;
