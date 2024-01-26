"use client"


import { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "@/app/Components/Navigation";


export default function Page({ params }: { params: { id: string } }) {
 
const [coinInfo, setCoinInfo] = useState()
const [error, setError]= useState(false)
const [isLoading, setIsLoading] = useState(false)


  const getCoinInfo = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/${params.id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`
      );
      console.log()
      setCoinInfo(data);
      console.log("coininfo", data);
      setIsLoading(false);
    } catch (err) {
      setError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCoinInfo();
  }, []);


 
 
 
 
 return (<>
    <Navigation/>
    <div>
      <h1>Card Information Page</h1>
      <h1> ID: {params.id}</h1>
    </div>
 </> );
}
