import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const Contianer = styled.div`
  background-color: #fff;
  width: 100vw;
  display: flex;
  justify-content: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  * {
    box-sizing: border-box;
  }
`;
const HeaderInner = styled.div`
  width: 1100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  &.sticky {
    position: fixed;
    width: 100vw;
    top: 0;
    left: 0;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }
  @media screen and (max-width: 768px) {
    width: 100vw;
    padding: 0 20px;
  }
`;
const SigninBox = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin: 10px 0;
  .user {
    margin-right: 20px;
    font-weight: 500;
    &:hover {
      color: #333;
    }
  }
  span {
    cursor: pointer;
    color: #333;
    font-size: 14px;
    &:hover {
      color: #72981e;
    }
  }
`;
const HeaderCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(204, 221, 136, 0.3);
  border-radius: 10px;
  padding: 5px 10px;
  span {
    color: #333;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    margin-left: 10px;
  }
  @media screen and (max-width: 768px) {
    justify-content: center;
    width: 100vw;
    height: 40px;
    img {
      width: 30px;
    }
  }
`;
const Right = styled.ul`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 7px 10px;
  input {
    border: none;
    &:focus {
      outline: none;
    }
  }
`;
const MenuWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Menu = styled.ul`
  display: flex;
  list-style: none;
  gap: 20px;
  padding: 0;
  li {
    a {
      text-decoration: none;
      font-size: 18px;
      font-weight: 500;
      color: #333;
      &:hover {
        color: #72981e;
      }
    }
  }
  @media screen and (max-width: 768px) {
    gap: 10px;
    li {
      a {
        font-size: 14px;
        font-weight: 400;
      }
    }
  }
`;

const Header = ({ authenticate, setAuthenticate }) => {
  const [isSticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      // 현재 스크롤 위치를 가져옴
      const currentScrollPosition = window.pageYOffset;

      // 스크롤 위치가 메뉴의 위치보다 크거나 같으면 메뉴를 고정
      if (currentScrollPosition >= 115) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Clean up function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const navigate = useNavigate();
  const menuList = [
    "산후조리원 몰",
    "산후조리원 졸업몰",
    "허그맘 LIVE",
    "허그맘 소개",
    "고객센터",
  ];

  const search = (e) => {
    if (e.key == "Enter") {
      let keyword = e.target.value;
      console.log("keyword", keyword);
      navigate(`/?q=${keyword}`);
    }
  };

  return (
    <Contianer>
      <HeaderInner className={isSticky ? "sticky" : ""}>
        {isSticky ? null : (
          <>
            <SigninBox>
              {authenticate ? (
                <div>
                  <span className="user">홍길동님, 환영합니다.</span>
                  <span
                    onClick={() => {
                      navigate("/");
                      setAuthenticate(false);
                      alert("로그아웃 됩니다!");
                    }}
                  >
                    로그아웃
                  </span>
                </div>
              ) : (
                <div onClick={() => navigate("/login")}>
                  <span>로그인</span>
                </div>
              )}
              <div>
                <span>회원가입</span>
              </div>
            </SigninBox>
            <HeaderCenter>
              <Left>
                <img
                  width={50}
                  src="https://cdn-icons-png.flaticon.com/512/4337/4337700.png"
                />
                <span>
                  허그맘과 함께
                  <br />
                  유기농 라이프 실천하기
                </span>
              </Left>
              <div>
                <a href="/">
                  <img width={250} src="./image/hugmom_logo_type_1.png" />
                </a>
              </div>
              <Right>
                <input
                  type="text"
                  placeholder="제품 검색"
                  onKeyPress={search}
                />
                <FontAwesomeIcon icon={faSearch} />
              </Right>
            </HeaderCenter>
          </>
        )}

        <MenuWrapper>
          <Menu>
            {menuList.map((menu, index) => (
              <li key={index}>
                <a href="#">{menu}</a>
              </li>
            ))}
          </Menu>
        </MenuWrapper>
      </HeaderInner>
    </Contianer>
  );
};

export default Header;
