import { useState, useEffect } from "react";
import styled from "styled-components";
import { ExchangeIcon } from "../icons/Icons";

const DropdownRow = styled.div`
  cursor: pointer;
  text-align: start;
  margin: 2px, 0;
`;

const ConverterBox = styled.div`
  width: 1010px;
`;

const Converter = ({ allCoinsData }) => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [coin1, setCoin1] = useState(allCoinsData[0]);
  const [coin2, setCoin2] = useState(allCoinsData[1]);
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [variable1, setvariable1] = useState("0");
  const [variable2, setvariable2] = useState("0");

  const handleConversionLtR = (e) => {
    const result = e.target.value.replace(/\D/g, "");
    const conversion = (result * coin1.current_price) / coin2.current_price;
    setvariable1(result);
    setvariable2(conversion);
  };

  const handleConversionRtL = (e) => {
    const result = e.target.value.replace(/\D/g, "");
    const conversion = (result * coin2.current_price) / coin1.current_price;
    setvariable2(result);
    setvariable1(conversion);
  };

  const onChange1 = (e) => {
    setValue1(e.target.value);
  };

  const onChange2 = (e) => {
    setValue2(e.target.value);
  };

  const onSearch1 = (coin) => {
    setCoin1(coin);
    setValue1("");
  };

  const onSearch2 = (coin) => {
    setCoin2(coin);
    setValue2("");
  };

  return (
    <ConverterBox className="my-10 rounded-lg w-96 flex justify-between items-center">
      <div className="flex flex-col w-full">
        <div className="flex justify-center flex-col items-start border w-full bg-second h-full">
          <div className="flex justify-between items-end w-full py-3 px-5 ">
            <div>
              <h2 className="text-sm">You sell:</h2>
              {coin1 && (
                <div className="flex items-center">
                  <img src={coin1.image} className="h-8 m-2" />
                  <h1 className="text-xl">
                    {coin1.name} ({coin1?.symbol?.toUpperCase()})
                  </h1>
                </div>
              )}
            </div>
            <div>
              <input
                value={variable1}
                onChange={(value) => handleConversionLtR(value)}
                className="my-2 rounded-md pl-2 text-right bg-second"
              />
            </div>
          </div>
          <div className="mx-auto bg-accent m-2 h-px w-11/12"></div>
          <div className="pl-5">
            {coin1 && (
              <div className="text-sm">
                1{coin1.symbol.toUpperCase()}={currencySymbol}
                {coin1.current_price}
              </div>
            )}
            <input
              className="border-black my-4 rounded-md relative inline-block bg-slate-100"
              value={value1}
              onChange={onChange1}
              placeholder="Search Coins..."
            />
            <div className="absolute max-h-44 overflow-auto">
              {value1 &&
                allCoinsData
                  ?.filter((coin) => {
                    const name = coin.name.toLowerCase();
                    const search = value1.toLowerCase();
                    return name.startsWith(search);
                  })
                  .map((coin) => (
                    <DropdownRow
                      key={coin.id}
                      className="bg-slate-100 border-slate-300 block"
                      onClick={() => onSearch1(coin)}
                    >
                      {coin.name}
                    </DropdownRow>
                  ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 rounded-full border-solid bg-accent abolute">
        <ExchangeIcon />
      </div>

      <div className="flex justify-center flex-col items-start border w-full bg-second h-full">
        <div className="flex justify-between items-end w-full  py-3 px-5">
          <div className="flex flex-col">
            <div className="w-7/12">
              <h2 className="text-sm">You buy:</h2>
              {coin2 && (
                <div className="flex items-center">
                  <img alt="coin logo" src={coin2.image} className="h-8 m-2" />
                  <h1 className="text-xl">
                    {coin2.name}({coin2?.symbol?.toUpperCase()})
                  </h1>
                </div>
              )}
            </div>
          </div>
          <input
            onChange={(value) => handleConversionRtL(value)}
            value={variable2}
            id="v2"
            className="my-2 w-44 rounded-md pl-2 text-right bg-second"
          />
        </div>

        <div className="mx-auto m-3 bg-accent h-px w-11/12"></div>
        <div className="pl-5">
          {coin2 && (
            <div className="text-sm">
              1{coin2.symbol.toUpperCase()}={currencySymbol}
              {coin2.current_price}
            </div>
          )}
          <input
            className="border-black my-4 rounded-md relative inline-blockm bg-slate-100"
            type="text"
            value={value2}
            onChange={onChange2}
            placeholder="Search Coins..."
          />
          <div className="absolute max-h-44 overflow-auto">
            {value2 &&
              allCoinsData
                ?.filter((coin) => {
                  const name = coin.name.toLowerCase();
                  const search = value2.toLowerCase();
                  return name.startsWith(search);
                })
                .map((coin) => (
                  <DropdownRow
                    key={coin.id}
                    className="bg-slate-100 border-slate-300 block"
                    onClick={() => onSearch2(coin)}
                  >
                    {coin.name}
                  </DropdownRow>
                ))}
          </div>
        </div>
      </div>
    </ConverterBox>
  );
};

export default Converter;
