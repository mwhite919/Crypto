"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyIcon } from "@/icons/Icons";

export default function Page({ params }: { params: { id: string } }) {
  const [coinInfo, setCoinInfo] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currency, setCurrency] = useState("usd");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [copied, setCopied] = useState(false);

  const icon = coinInfo?.image?.small;
  const name = coinInfo.name;
  const webPage = coinInfo?.links?.homepage[0];
  const blockChainwebPage = coinInfo?.links?.blockchain_site[0];
  const officialForumwebPage = coinInfo?.links?.official_forum_url[0];

  const ath = coinInfo.market_data?.ath.usd; //come back to put currency in state//
  const athChange = coinInfo.market_data?.ath_change_percentage?.usd;
  const athDate = coinInfo.market_data?.ath_data?.usd;
  const atl = coinInfo.market_data?.atl?.usd; //come back to put currency in state//
  const atlChange = coinInfo.market_data?.atl_change_percentage?.usd;
  const atlDate = coinInfo.market_data?.atl_data?.usd;
  const marketCap = coinInfo.market_data?.market_cap.usd;
  const fullyDiluted = coinInfo.market_data?.fully_diluted_valuation.usd;
  const volume24h = coinInfo.market_data?.price_change_24h;
  const volumeMarket = volume24h / marketCap;
  const totalVolume = coinInfo.market_data?.total_volume.usd;
  const totalSupply = coinInfo.market_data?.total_supply;
  const maxSupply = coinInfo.market_data?.max_supply;
  const description = coinInfo?.description?.en; //should I used dangerouslysetHTML for these descriptions? the text contains a few a tags written in html//

  const markup = { __html: { description } };

  const getCoinInfo = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/${params.id}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`
      );

      setCoinInfo(data);

      setIsLoading(false);
    } catch (err) {
      setError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCoinInfo();
  }, []);
  return (
    <>
      <div className="flex items-center justify-center flex-col">
        <h1>Your Summary:</h1>
        <h1> ID: {params.id}</h1>
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center  w-2/6 p-5 h-60 bg-slate-400 max-w-96 min-w-72 m-3 ">
            <div>
              <img src={icon} />
            </div>
            <div>{name}</div>
            <div></div>
          </div>

          <div className="flex flex-col items-center justify-between w-2/6 h-60 bg-slate-400 p-5  max-w-96 min-w-72 m-3">
            <div>COME BACK TO FIX</div>
            <div>percentage of something COME BAC</div>
            <div>some icon</div>
            <div className="flex ">
              <div>
                All time high:
                <div>
                  {currency}
                  {ath}
                </div>
                <div>{athChange}</div>
                <div>{athDate}</div>
              </div>
              <div>
                All time low:
                <div>{atl}</div>
                <div>{atlChange}</div>
                <div>{atlDate}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between w-2/6 p-5 h-60 bg-slate-400 max-w-96 min-w-72 m-3">
            <div className="flex justify-between w-full">
              <div>Market Cap</div>
              <div>
                {currencySymbol}
                {marketCap}
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div>Fully Diluted Valuation </div>
              <div>
                {currencySymbol}
                {fullyDiluted}
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div>Volume 24h</div>
              <div>{volume24h}</div>
            </div>
            <div className="flex justify-between w-full">
              <div>Volume/Market</div>
              <div>{volumeMarket}</div>
            </div>
            <div className="flex justify-between w-full">
              <div>Total Volume</div>
              <div>{totalVolume}</div>
            </div>
            <div className="flex justify-between w-full">
              <div>Circulating Supply</div>
              <div>{totalSupply}</div>
            </div>
            <div className="flex justify-between w-full">
              <div>Max Supply</div>
              <div>{maxSupply}</div>
            </div>
          </div>
        </div>
        <div className="flex">
          <CopyToClipboard
            className="h-6 bg-slate-300 m-5 p-8 flex items-center"
            text={webPage}
            onCopy={() => setCopied(true)}
          >
            <button>
              {webPage}
              <CopyIcon />
            </button>
          </CopyToClipboard>

          <CopyToClipboard
            className="h-5 bg-slate-300 m-5 p-8  flex items-center"
            text={blockChainwebPage}
            onCopy={() => setCopied(true)}
          >
            <button>
              {blockChainwebPage}
              <CopyIcon />
            </button>
          </CopyToClipboard>

          <CopyToClipboard
            className="h-5 bg-slate-300 m-5 p-8  flex items-center"
            text={officialForumwebPage}
            onCopy={() => setCopied(true)}
          >
            <button>
              {officialForumwebPage}
              <CopyIcon />
            </button>
          </CopyToClipboard>
        </div>
        <div className="bg-slate-400 m-3 p-5" style={{ maxWidth: 918 }}>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </div>
    </>
  );
}
