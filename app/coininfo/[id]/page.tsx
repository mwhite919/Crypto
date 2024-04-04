"use client";

import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  CopyIcon,
  StackIcon,
  ArrowBullet,
  FacebookIcon,
  XIcon,
  RedditIcon,
  NewTabLinkIcon,
  TriangleUp,
  TriangleDown,
} from "@/app/icons/Icons";
import { useAppSelector } from "@/redux/hooks";
import { useGetSingleCoinQuery } from "@/app/Providers/api/apiSlice";
import { useCrypto } from "@/app/Providers/CryptoProvider";

export default function Page({ params }: { params: { id: string } }) {
  const { palette, mode } = useCrypto();

  const { data: coinInfo, error, isError, isLoading } = useGetSingleCoinQuery(
    params.id
  );

  const currency = useAppSelector((state) => state.currency);

  const [copied, setCopied] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const icon = coinInfo?.image?.small;
  const name = coinInfo?.name;
  const abv = coinInfo?.symbol?.toUpperCase();
  const webPage = coinInfo?.links?.homepage[0];
  const blockChainwebPage = coinInfo?.links?.blockchain_site[0];
  const officialForumwebPage = coinInfo?.links?.official_forum_url[0];
  const facebookLink = coinInfo?.links?.facebook_username;
  const XScreenName = coinInfo?.links?.twitter_screen_name;
  const redditPage = coinInfo?.links?.subreddit_url;
  const currentPrice = coinInfo?.market_data?.current_price[
    currency.currency
  ].toFixed(2);
  const ath = coinInfo?.market_data?.ath[currency.currency].toFixed(2);
  const formattedAth = new Date(
    coinInfo?.market_data?.ath_date[currency.currency]
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const atl = coinInfo?.market_data?.atl[currency.currency].toFixed(2);
  const priceChange24h = coinInfo?.market_data?.price_change_percentage_24h_in_currency[
    currency.currency
  ].toFixed(2);
  const formattedAtl = new Date(
    coinInfo?.market_data?.atl_date[currency.currency]
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const marketCap = coinInfo?.market_data?.market_cap[currency.currency];
  const fullyDiluted =
    coinInfo?.market_data?.fully_diluted_valuation[currency.currency];
  const volume24h = coinInfo?.market_data?.price_change_24h?.toFixed(4);
  const volumeMarket = (volume24h / marketCap)?.toFixed(3);
  const totalVolume = coinInfo?.market_data?.total_volume[currency.currency];
  const totalSupply = coinInfo?.market_data?.total_supply;
  const description = coinInfo?.description?.en;
  const publicNotice = coinInfo?.public_notice;

  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noreferrer");
  };

  return (
    <>
      <div
        className={`flex items-center justify-center sm:justify-start flex-col w-screen text-sm text-shadowDark theme-${palette} theme-${mode} bg-base ${
          isLoading && "cursor-wait"
        }`}
      >
        <div className=" w-[300px] sm:w-[1000px] sm:grid grid-cols-1 sm:grid-cols-4 sm:gap-2 justify-center items-start mt-36 ">
          {params === undefined ? (
            <div>Coin not found. Please check your spelling and try again.</div>
          ) : (
            ""
          )}
          <div className="flex flex-col items-center justify-center col-span-1 p-5 h-60 bg-second shadow-sm shadow-accent m-4 sm:m-3 rounded-lg ">
            <div>
              <img src={icon} />
            </div>
            <div className="text-xl font-bold drop-shadow-sm">
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

          <div className="flex flex-col items-center justify-between col-span-1 h-60 bg-second p-5 rounded-lg m-4 sm:m-3 shadow-sm shadow-accent ">
            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl text-accent font-bold drop-shadow-sm">
                {currency.symbol}
                {currentPrice}
              </div>
              <div className="flex items-center justify-center">
                {priceChange24h >= 0 ? <TriangleUp /> : <TriangleDown />}
                {currency.symbol}
                {priceChange24h}(24h)
              </div>
              <div>
                <StackIcon />
              </div>
            </div>
            <div className="flex flex-col text-sm">
              <div className="flex flex-col">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center mr-1">
                    <TriangleUp /> All time high:{" "}
                  </div>
                  <div className="text-lg font-semibold">
                    {currency.symbol}
                    {ath}
                  </div>
                </div>
                <div className="text-xs flex justify-center">
                  {formattedAth}
                </div>
              </div>
              <div className="m-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center mr-1">
                    <TriangleDown /> All time low:{" "}
                  </div>
                  <div className="text-lg font-semibold">
                    {" "}
                    {currency.symbol}
                    {atl}
                  </div>
                </div>
                <div className="text-xs flex justify-center">
                  {formattedAtl}
                </div>
              </div>
            </div>
            <div></div>
          </div>

          <div className="flex flex-col items-center justify-between col-span-1 sm:col-span-2 p-5 h-60 bg-second m-4 sm:m-3 rounded-lg shadow-sm shadow-accent ">
            <div className="flex justify-between w-full">
              <div className="flex items-center">
                <ArrowBullet />
                Market Cap
              </div>
              <div>
                {currency.symbol}
                {marketCap}
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex items-center">
                <ArrowBullet />
                Fully Diluted Valuation{" "}
              </div>
              <div>
                {currency.symbol}
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
                Total Supply
              </div>
              <div>{totalSupply}</div>
            </div>
          </div>

          <div className="bg-second m-4 sm:m-3 p-5 col-span-1 sm:col-span-2 rounded-lg shadow-sm shadow-accent text-sm">
            {showMore ? (
              <div dangerouslySetInnerHTML={{ __html: description }} />
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: `${description?.substring(0, 500)}`,
                }}
              />
            )}
            {description?.length > 500 && (
              <button
                className="text-accent italic drop-shadow-sm"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? " See less" : "...See more"}
              </button>
            )}
          </div>

          <div className="flex flex-col col-span-2">
            {publicNotice && (
              <div className="bg-second m-4 sm:m-3 p-5 flex items-center font-italic shadow-sm shadow-accent rounded-lg">
                <p className="italic">
                  Public Notice:{" "}
                  <div dangerouslySetInnerHTML={{ __html: publicNotice }} />
                </p>
              </div>
            )}

            {webPage && (
              <div className="h-6 bg-second m-4 sm:m-3 p-5 flex items-center shadow-sm shadow-accent rounded-lg">
                <button onClick={() => openInNewTab(`${webPage}`)}>
                  <NewTabLinkIcon />
                </button>
                {webPage}
                <CopyToClipboard text={webPage} onCopy={() => setCopied(true)}>
                  <CopyIcon />
                </CopyToClipboard>
              </div>
            )}

            {blockChainwebPage && (
              <div className="h-6 bg-second m-4 sm:m-3 p-5 flex items-center shadow-sm shadow-accent rounded-lg">
                <button onClick={() => openInNewTab(`${blockChainwebPage}`)}>
                  <NewTabLinkIcon />
                </button>
                {webPage}
                <CopyToClipboard
                  text={blockChainwebPage}
                  onCopy={() => setCopied(true)}
                >
                  <CopyIcon />
                </CopyToClipboard>
              </div>
            )}

            {officialForumwebPage && (
              <div className="h-6 bg-second m-3 p-5 flex items-center shadow-sm shadow-accent rounded-lg">
                <button onClick={() => openInNewTab(`${officialForumwebPage}`)}>
                  <NewTabLinkIcon />
                </button>
                {webPage}
                <CopyToClipboard
                  text={officialForumwebPage}
                  onCopy={() => setCopied(true)}
                >
                  <CopyIcon />
                </CopyToClipboard>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
