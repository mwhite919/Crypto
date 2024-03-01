import { useSelector } from "react-redux";

import React from "react";

const chartCoins = () => {
  const chartCoins = useSelector((state) => state.coins);

  return <div>chartCoins</div>;
};

export default chartCoins;
