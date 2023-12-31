import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

const Background = styled.div`
  width: 1500px;
  height: 350px;
  overflow: hidden;
  position: relative;

  .Left {
    top: 50%;
    left: 3%;
    transform: translate(-50%, -50%);
    color: rgba(0, 0, 0, 0.4);
    &:hover {
      color: rgba(0, 0, 0, 0.8);
    }
  }
  .Right {
    top: 50%;
    left: 97%;
    transform: translate(-50%, -50%);
    color: rgba(0, 0, 0, 0.4);
    &:hover {
      color: rgba(0, 0, 0, 0.8);
    }
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

/* bg img slider */
const SlideBtn = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ImgContainer = styled.div`
  display: flex;
  overflow: hidden;
`;

const ImgBox = styled.div`
  width: 1500px;
  height: 350px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media screen and (max-width: 768px) {
    width: 100vw;
  }
`;

const BannerSlide = () => {
  // 화면의 가로 길이
  const w = window.innerWidth;

  /* bg img Array */
  const bgArr = [
    {
      id: 0,
      img: "https://hugmom-b6187.web.app/img/01-main_banner_slide_img_1.png",
      mimg: "https://hugmom-b6187.web.app/img/01-main_banner_slide_mobile_img_1.png",
    },
    {
      id: 1,
      img: "https://hugmom-b6187.web.app/img/01-main_banner_slide_img_2.png",
      mimg: "https://hugmom-b6187.web.app/img/01-main_banner_slide_mobile_img_2.png",
    },
    {
      id: 2,
      img: "https://hugmom-b6187.web.app/img/01-main_banner_slide_img_3.png",
      mimg: "https://hugmom-b6187.web.app/img/01-main_banner_slide_mobile_img_3.png",
    },
    {
      id: 3,
      img: "https://hugmom-b6187.web.app/img/01-main_banner_slide_img_4.png",
      mimg: "https://hugmom-b6187.web.app/img/01-main_banner_slide_mobile_img_4.png",
    },
    {
      id: 4,
      img: "https://hugmom-b6187.web.app/img/01-main_banner_slide_img_5.png",
      mimg: "https://hugmom-b6187.web.app/img/01-main_banner_slide_mobile_img_5.png",
    },
  ];

  const [slideIndex, setSlideIndex] = useState(1);
  const [slideInterval, setSlideInterval] = useState(6000); // slideInterval 6 secs

  const slideRef = useRef(null);

  const BG_NUM = bgArr.length;
  const beforeSlide = bgArr[BG_NUM - 1];
  const afterSlide = bgArr[0];

  let slideArr = [beforeSlide, ...bgArr, afterSlide]; // 슬라이드 연결 마지막 ...오리지널슬라이드 첫번째슬라이드
  const SLIDE_NUM = slideArr.length;
  let bannerW = "";
  if (w > 768) {
    bannerW = 1500 * SLIDE_NUM + "px";
  } else {
    bannerW = 100 * SLIDE_NUM + "vw";
  }
  console.log(bannerW);

  const useInterval = (callback, interval) => {
    const savedCallback = useRef(null);

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        if (savedCallback.current) {
          savedCallback.current();
        }
      }
      if (interval !== null && interval !== 10000000) {
        let id = setInterval(tick, interval);
        return () => clearInterval(id);
      }
    }, [interval]);
  };
  useInterval(() => setSlideIndex((prev) => prev + 1), slideInterval); // auto slide show with slideInterval

  /* InfiniteSlideHandler attachs last/first imgs with origin last/first imgs to make slide seem infinite */
  const InfiniteSlideHandler = (toIndex) => {
    setTimeout(() => {
      if (slideRef.current) {
        slideRef.current.style.transition = "";
      }
      setSlideIndex(toIndex);
      setTimeout(() => {
        if (slideRef.current) {
          slideRef.current.style.transition = "all 500ms ease-in-out";
        }
      }, 100);
    }, 500);
  };

  if (slideIndex === SLIDE_NUM - 1) {
    // if first img (slide array's last item) -> go to origin first img
    InfiniteSlideHandler(1);
  }

  if (slideIndex === 0) {
    // if last img (slide array's first item) -> go to origin last img
    InfiniteSlideHandler(BG_NUM);
  }

  const intervalHandler = () => {
    // when InfiniteSlideHandler works for first img (slide array's last item), control slideInterval to show transition animation normally
    if (slideIndex === SLIDE_NUM - 1) {
      setSlideInterval(500);
    } else {
      setSlideInterval(6000);
    }
  };

  /* SlideHandler for buttons */
  const slideHandler = (direction) => {
    setSlideIndex((prev) => prev + direction);
  };

  /* stopAutoSlide when controlling slide with buttons */
  const stopAutoSlide = () => {
    setSlideInterval(10000000);
  };

  return (
    <>
      <Background>
        <SlideBtn
          className="Left"
          onMouseEnter={stopAutoSlide}
          onMouseLeave={intervalHandler}
          onClick={() => slideHandler(-1)}
        >
          <FontAwesomeIcon icon={faChevronLeft} size="2x" />
        </SlideBtn>
        <ImgContainer
          ref={slideRef}
          style={{
            width: `${bannerW}`,
            transition: "all 500ms ease-in-out",
            transform: `translateX(${
              -1 * ((100 / slideArr.length) * slideIndex)
            }%)`,
          }}
        >
          {slideArr.map((item, index) => (
            <ImgBox key={index}>
              {bannerW === "10500px" ? (
                <img src={item.img} />
              ) : (
                <img src={item.mimg} />
              )}
            </ImgBox>
          ))}
        </ImgContainer>
        <SlideBtn
          className="Right"
          onMouseEnter={stopAutoSlide}
          onMouseLeave={intervalHandler}
          onClick={() => slideHandler(+1)}
        >
          <FontAwesomeIcon icon={faChevronRight} size="2x" />
        </SlideBtn>
      </Background>
    </>
  );
};

export default BannerSlide;
