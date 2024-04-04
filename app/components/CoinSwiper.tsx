import { useGetAllCoinsQuery } from "@/app/Providers/api/apiSlice";
import ArrowDown, { ArrowUp } from "@/app/icons/Icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/app/constants/coin-swiper.css";
import { useAppSelector } from "@/redux/hooks";
import { ChartCoin } from "../sharedinterfaces";

interface Coin {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_1h_in_currency: number;
}

interface Props {
  handleClick: (coin: Coin) => void;
  combinedChartCoins: ChartCoin[];
}

export const CoinSwiper: React.FC<Props> = ({
  handleClick,
  combinedChartCoins,
}) => {
  const currency = useAppSelector((state) => state.currency);

  const { data: allCoinsData, isError, isLoading } = useGetAllCoinsQuery({
    currency: currency.currency,
    sortValue: "volume_desc",
  });

  let top10Coins: any[] = [];
  if (allCoinsData !== null && typeof allCoinsData === "object") {
    top10Coins = Object.values(allCoinsData)?.slice(0, 10);
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      {top10Coins && (
        <div>
          {isLoading && (
            <div className="w-full h-full flex justify-center items-center cursor-wait">
              Loading...
            </div>
          )}
          {isError && (
            <h2>An error occured while loading. Please try again.</h2>
          )}

          <Slider {...settings}>
            {top10Coins?.map((coin) => (
              <div key={coin.id}>
                <div>
                  <div
                    className={`flex items-center justify-center sm:justify-start text-xs m-2 sm:ml-2 sm:mb-2 h-12 sm:h-16 p-3 drop-shadow-md rounded-md cursor-pointer
                    ${
                      combinedChartCoins?.find((c) => c.id === coin.id)
                        ? "border-2 border-accentLight bg-accent text-second hover:scale-105"
                        : "bg-second hover:scale-105"
                    }`}
                    onClick={() => handleClick(coin)}
                  >
                    <div>
                      <img className="w-7 m-2" src={coin.image} />
                    </div>
                    <div className="flex flex-col justify-center items-even h-full ">
                      <div className=" text-sm font-semibold sm:hidden">
                        {coin.symbol.toUpperCase()}
                      </div>
                      <div className="font-semibold mb-0.5 text-sm hidden sm:inline">
                        {coin.name.length > 11
                          ? coin.name.substring(0, 16).concat("...")
                          : coin.name + "  " + `(${coin.symbol.toUpperCase()})`}
                      </div>
                      <div className="hidden sm:flex">
                        {" "}
                        <div>
                          {currency.symbol}
                          {coin.current_price.toFixed(2)}
                        </div>
                        <div className="items-center ml-1 ">
                          {coin?.price_change_percentage_1h_in_currency > 0 ? (
                            <ArrowUp />
                          ) : (
                            <ArrowDown />
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
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};
