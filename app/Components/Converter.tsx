import { useState, useEffect } from "react";
import styled from "styled-components";

const Dropdown = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
`;

const DropdownRow = styled.div`
  cursor: pointer;
  text-align: start;
  margin: 2px, 0;
`;

const Converter = ({ currentCoins }) => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [coin1, setCoin1] = useState({});
  const [coin2, setCoin2] = useState({});
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [varible1, setVarible1] = useState("1")
  const [varible2, setVarible2] = useState("1")

  const handleConversion= (e)=>{
    setVarible1(e.target.value)
  const conversion = varible1 * coin1.current_price / coin2.current_price
  setVarible2(conversion)
  console.log("v1", varible1, "v2", varible2, "con", conversion)
  }

  const onChange1 = (e) => {
    setValue1(e.target.value);
  };

  const onChange2 = (e) => {
    setValue2(e.target.value);
  };

  const onSearch1 = (coin) => {
    setCoin1(coin);
    setValue1("");
    console.log("fixed", coin1);
  };

  const onSearch2 = (coin) => {
    setCoin2(coin);
    setValue2("");
    console.log("fixed2", coin2);
  };

  return (
    <div className="bg-primaryBg bg-slate-300 m-11 h-96 flex justify-center items-center flex-col">
      <h1>Converter</h1>
      <div className=" flex">
        <div className="flex flex-col">
          <div>
            You sell:
            <div className="flex">
              <img src={coin1.image} className="h-8" />
              {coin1.name}
            </div>
          </div>
          {coin1.name && (
            <div>
              1{coin1.symbol.toUpperCase()}={currencySymbol}
              {coin1.current_price}
            </div>
          )}
          <input type="number" value={varible1} onChange={(e)=>handleConversion(e)} className="m-2" />
          <div>
            <input
              className="border-black m-4"
              type="text"
              value={value1}
              onChange={onChange1}
              placeholder="Search Coins..."
            />
          </div>

          {value1 &&
            currentCoins?.map((coin) => {
              const name = coin.name.toLowerCase();
              const searchValue = value1.toLowerCase();
              if (name.startsWith(searchValue))
                return (
                  <DropdownRow onClick={() => onSearch1(coin)}>
                    {coin.name}
                  </DropdownRow>
                );
            })}
        </div>
        <div className="flex flex-col">
          <div>
            You buy:
            <div className="flex">
              <img src={coin2.image} className="h-8" /> {coin2.name}
            </div>
          </div>
          {coin2.name && (
            <div>
              1{coin2.symbol.toUpperCase()}={currencySymbol}
              {coin2.current_price}
            </div>
          )}
          <input type="number" value={varible2} onChange={(e)=>setVarible2(e.target.value)} className="m-2" />
          <div></div>
          <div>
            <input
              className="border-black m-4"
              type="text"
              value={value2}
              onChange={onChange2}
              placeholder="Search Coins..."
            />
          </div>
          {value2 &&
            currentCoins?.map((coin) => {
              const name = coin.name.toLowerCase();
              const searchValue = value2.toLowerCase();
              if (name.startsWith(searchValue))
                return (
                  <DropdownRow onClick={() => onSearch2(coin)}>
                    {coin.name}
                  </DropdownRow>
                );
            })}
        </div>
      </div>
    </div>
  );
};

export default Converter;
