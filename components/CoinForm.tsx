import { useState } from "react";
import { usePortfolio } from "@/app/Providers/PortfolioProvider";

export const CoinForm = () => {
  const [coin, setCoin] = useState({});
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const { addCoin, removeCoin } = usePortfolio();

  return (
    <>
      <div>
        <form>
          <input type="text" value={coin} placeholder="Enter your coin..." />
          <input type="text" value={amount} placeholder="How much?" />
          <input type="date" value={date} />
        </form>
      </div>
    </>
  );
};
