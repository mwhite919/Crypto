import React, { useRef, useState } from "react";
import { Pagination, Navigation } from "swiper/modules";
import SliderWrapper from "@/app/SliderWrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowDown, { ArrowUp } from "@/icons/Icons";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="h-24 bg-red-700"
        >
          <div>
            {top10.map((coin) => (
              <SwiperSlide
                key={coin.id}
                onClick={handleSelect}
                className="bg-second text-sm"
              >
                <img className="h-8" src={coin.image} />
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
                    {coin?.price_change_percentage_1h_in_currency}%
                  </div>
                </div>
                <div style={{ width: 100, height: 100 }} />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </SliderWrapper>
    </div>
  );
};
