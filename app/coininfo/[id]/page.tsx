"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  CopyIcon,
  StackIcon,
  ArrowBullet,
  FacebookIcon,
  XIcon,
  RedditIcon,
} from "@/icons/Icons";
import FormattedDate from "@/components/FormatDate";

export default function Page({ params }: { params: { id: string } }) {
  const [coinInfo, setCoinInfo] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currency, setCurrency] = useState("usd");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [copied, setCopied] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const icon = coinInfo?.image?.small;
  const name = coinInfo.name;
  const abv = coinInfo.symbol?.toUpperCase();
  const webPage = coinInfo?.links?.homepage[0];
  const blockChainwebPage = coinInfo?.links?.blockchain_site[0];
  const officialForumwebPage = coinInfo?.links?.official_forum_url[0];
  const facebookLink = coinInfo?.links?.facebook_username;
  const XScreenName = coinInfo?.links?.twitter_screen_name;
  const redditPage = coinInfo?.links?.subreddit_url;
  const currentPrice = coinInfo.market_data?.current_price.usd?.toFixed(2);
  const ath = coinInfo.market_data?.ath.usd;
  const athChange = coinInfo.market_data?.ath_change_percentage?.usd;
  const athDate = coinInfo.market_data?.ath_date?.usd;
  const atl = coinInfo.market_data?.atl?.usd;
  const atlChange = coinInfo.market_data?.atl_change_percentage?.usd;
  const atlDate = coinInfo.market_data?.atl_date?.usd;
  const marketCap = coinInfo.market_data?.market_cap.usd;
  const fullyDiluted = coinInfo.market_data?.fully_diluted_valuation.usd;
  const volume24h = coinInfo.market_data?.price_change_24h?.toFixed(4);
  const volumeMarket = (volume24h / marketCap)?.toFixed(3);
  const totalVolume = coinInfo.market_data?.total_volume.usd;
  const totalSupply = coinInfo.market_data?.total_supply;
  const maxSupply = coinInfo.market_data?.max_supply;
  const description = coinInfo?.description?.en;

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
  console.log(coinInfo);
  useEffect(() => {
    getCoinInfo();
  }, []);

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  return (
    <>
      <div className="flex items-center justify-center flex-col w-screen">
        <div className="w-5/6 flex flex-col justify-center items-center m-6">
          <div className="flex items-center justify-center w-5/6">
            <div className="flex flex-col items-center justify-center w-1/4 p-5 h-60 bg-second shadow-md shadow-accent m-3 rounded-lg ">
              <div>
                <img src={icon} />
              </div>
              <div className="text-2xl font-bold drop-shadow-md">
                {name}({abv})
              </div>
              <div className="flex h-4">
                {facebookLink && (
                  <button
                    onClick={() =>
                      openInNewTab(`https://www.facebook.com/${facebookLink}`)
                    }
                  >
                    <FacebookIcon />
                  </button>
                )}
                {XScreenName && (
                  <button
                    onClick={() =>
                      openInNewTab(`https://www.twitter.com/${XScreenName}`)
                    }
                  >
                    <XIcon />
                  </button>
                )}
                {redditPage && (
                  <button onClick={() => openInNewTab(`${redditPage}`)}>
                    <RedditIcon />
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center justify-between w-1/4 h-60 bg-second p-5 rounded-lg m-3 shadow-md shadow-accent ">
              <div></div>
              <div className="text-2xl font-bold drop-shadow-md">
                {currencySymbol}
                {currentPrice}
              </div>
              <div>
                <StackIcon />
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <div className="flex">
                    All time high:
                    <div>
                      {currencySymbol}
                      {ath}
                    </div>
                  </div>
                  <div>{athDate}</div>
                </div>
                <div>
                  All time low:
                  <div>{atl}</div>
                  <div>{atlDate}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between w-1/2 p-5 h-60 bg-second m-3 rounded-lg shadow-md shadow-accent ">
              <div className="flex justify-between w-full">
                <div className="flex items-center">
                  <ArrowBullet />
                  Market Cap
                </div>
                <div>
                  {currencySymbol}
                  {marketCap}
                </div>
              </div>
              <div className="flex justify-between w-full">
                <div className="flex items-center">
                  <ArrowBullet />
                  Fully Diluted Valuation{" "}
                </div>
                <div>
                  {currencySymbol}
                  {fullyDiluted}
                </div>
              </div>
              <div className="flex justify-between w-full">
                <div className="flex items-center">
                  <ArrowBullet />
                  Volume 24h
                </div>
                <div>{volume24h}</div>
              </div>
              <div className="flex justify-between w-full">
                <div className="flex items-center">
                  <ArrowBullet />
                  Volume/Market
                </div>
                <div>{volumeMarket}</div>
              </div>
              <div className="flex justify-between w-full">
                <div className="flex items-center">
                  <ArrowBullet />
                  Total Volume
                </div>
                <div>{totalVolume}</div>
              </div>
              <div className="flex justify-between w-full">
                <div className="flex items-center">
                  <ArrowBullet />
                  Circulating Supply
                </div>
                <div>{totalSupply}</div>
              </div>
              <div className="flex justify-between w-full">
                <div className="flex items-center">
                  <ArrowBullet />
                  Max Supply
                </div>
                <div>{maxSupply}</div>
              </div>
            </div>
          </div>

          <div className="flex items-start justify-center w-5/6">
            <div className="bg-second m-3 p-5 h-1/2 rounded-lg shadow-md shadow-accent">
              {showMore ? (
                <div dangerouslySetInnerHTML={{ __html: description }} />
              ) : (
                `${description?.substring(0, 500)}`
              )}
              <button
                className="text-accent italic drop-shadow-md"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? " See less" : "...See more"}
              </button>
            </div>
            <div className="flex flex-col w-1/2 rounded-lg ">
              {webPage && (
                <CopyToClipboard
                  className="h-6 bg-second m-3 p-5 flex items-center shadow-md shadow-accent"
                  text={webPage}
                  onCopy={() => setCopied(true)}
                >
                  <button>
                    {webPage}
                    <CopyIcon />
                  </button>
                </CopyToClipboard>
              )}

              {blockChainwebPage && (
                <CopyToClipboard
                  className="h-5 bg-second m-3 p-5 rounded-lg flex items-center shadow-md shadow-accent"
                  text={blockChainwebPage}
                  onCopy={() => setCopied(true)}
                >
                  <button>
                    {blockChainwebPage}
                    <CopyIcon />
                  </button>
                </CopyToClipboard>
              )}

              {officialForumwebPage && (
                <CopyToClipboard
                  className="h-5 bg-second m-3 p-5 rounded-lg flex items-center shadow-md shadow-accent"
                  text={officialForumwebPage}
                  onCopy={() => setCopied(true)}
                >
                  <button>
                    {officialForumwebPage}
                    <CopyIcon />
                  </button>
                </CopyToClipboard>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
