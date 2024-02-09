import React, { useRef, useState } from "react";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowDown, { ArrowUp } from "@/icons/Icons";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SliderWrapper = styled.div`

  position: relative;
    width: 1010px;
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;

 
  
  ${({arrows}) => arrows && css`
    .swiper-button {
      &-next,
      &-prev {
        top: 50%;
        z-index: 9;
        width: 10px;
        height: 10px;
        margin: auto;
        line-height: 40px;
        position: absolute;
        visibility: hidden;
        text-align: center;
        transform: translateY(-50%);
        color: #000000;
        transition: all 0.4s ease 0s;
        border-radius: 50%;
        background-color: #ffffff;
        box-shadow: 0 3px 25.5px 4.5px rgba(0, 0, 0, .06);
        &:hover {
          color: #212121;
          background-color: #ff7004;
        }
        &:after {
          font-size: 14px;
        }
      }
      &-prev {
        outline: 0; 
        right: auto;
        left: -20px;
        &:after {
          margin-right: 3px;
        }
      }
      &-next {
        outline: 0;
        left: auto;
        right: -20px;
        &:after {
          margin-left: 3px;
        }
      }
      &-disabled {
        opacity: 0.1;
      }
    }
    &:hover {
      .swiper-button {
        &-prev, &-next {
          visibility: visible;
        }
        &-prev {
          left: 10px;
        }
        &-next {
          right: 10px;
        }
      }
    }
  `}
  ${({dots}) => dots && css`
    .swiper-pagination {
      &-bullet {
        cursor: pointer;
        width: 10px;
        height: 10px;
        display: inline-block;
        border-radius: 50%;
        background: #ff7004;
        opacity: 0.2;
        border: 1px solid #ff7004;
        margin: 0 5px;
        box-shadow: none;
        transition: all 0.4s ease 0s;
        transform: scale(0.8);
        &:hover, &-active {
          background-color: #ff7004;
          border-color: #ff7004;
          transform: scale(1.0);
          opacity: 1;
        }
      }
    }
  `};
`
  
export const CoinSwiper = ({ currentCoins }) => {
  function handleSelect() {
    console.log("click", top10);
  }



  const top10 = Object.values(currentCoins).slice(0, 10);

  return (
    <div>
      <SliderWrapper>
        <Swiper
          slidesPerView={"5"}
          spaceBetween={10}
          loop={true}

          navigation={true}
          modules={[Pagination, Navigation]}
          className="h-24"
        >
          <div>
            {top10.map((coin) => (
              <SwiperSlide
                key={coin.id}
                onClick={handleSelect}
                className="bg-second text-xs flex p-3 justify-center "
              >
                <img className="h-8 m-2" src={coin.image} />
                <div className="flex flex-col">
                  <div>
                    {coin.name}({coin.symbol.toUpperCase()})
                  </div>
                  <div>{coin.current_price}</div>
                  <div className="flex items-center">
                    
                    {coin?.price_change_percentage_1h_in_currency > 0 ? (
                      <ArrowUp className="h-3" />
                    ) : (
                      <ArrowDown className="h-3" />
                    )}
                    {coin?.price_change_percentage_1h_in_currency.toFixed(2)}%
                  </div>
                </div>
      
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </SliderWrapper>
    </div>
  );
};
