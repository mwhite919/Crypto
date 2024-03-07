import { useCrypto } from "@/app/Providers/CryptoProvider";
import { useEffect, useState } from "react";
import { useGetAllCoinsQuery } from "@/app/Providers/api/apiSlice";
import ArrowDown, { ArrowUp } from "@/app/icons/Icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./coin-swiper.css";
import { useAppSelector } from "@/redux/hooks";

export const CoinSwiper = ({ handleClick, combinedChartCoins }) => {
  const currency = useAppSelector((state) => state.currency);

  const { data: allCoinsData, error, isError, isLoading } = useGetAllCoinsQuery(
    {
      currency: currency.currency,
      sortValue: "volume_desc",
    }
  );

  let top10Coins: any[] = [];
  if (allCoinsData !== null && typeof allCoinsData === "object") {
    top10Coins = Object.values(allCoinsData)?.slice(0, 10);
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  return (
    <div>
      {top10Coins && (
        <div>
          <Slider {...settings}>
            {top10Coins?.map((coin) => (
              <div key={coin.id}>
                <div>
                  <div
                    className={`bg-second flex items-center justify-start text-xs ml-2 my-2 h-20 p-3 drop-shadow-md rounded-md 
                    ${
                      combinedChartCoins?.find((c) => c.id === coin.id)
                        ? "border-2 border-accent hover:scale-105"
                        : "hover:scale-105"
                    }`}
                    onClick={() => handleClick(coin)}
                  >
                    <div>
                      <img className="w-9 m-4" src={coin.image} />
                    </div>
                    <div className="flex flex-col">
                      <div>
                        {coin.name}({coin.symbol.toUpperCase()})
                      </div>
                      <div>
                        {currency.symbol}
                        {coin.current_price}
                      </div>
                      <div className="flex items-center">
                        {coin?.price_change_percentage_1h_in_currency > 0 ? (
                          <ArrowUp className="h-3" />
                        ) : (
                          <ArrowDown className="h-3" />
                        )}
                        {coin?.price_change_percentage_1h_in_currency.toFixed(
                          2
                        )}
                        %
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};
