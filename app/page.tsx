"use client";

import { useState, useEffect } from "react";
import VantaBackground from "@/app/components/VantaBackground";
import Header from "@/components/Header";
import SpreadIndicator from "@/components/SpreadIndicator";
import OrderbookImbalance from "@/components/OrderbookImbalance";
import MarketDepth from "@/components/MarketDepth";
import OrderBook from "@/components/OrderBook";
import { tradingPairs } from "@/constants/trading";

export default function Home() {
  const [orderBookData, setOrderBookData] = useState({ bids: [], asks: [] });
  const [spreadHistory, setSpreadHistory] = useState([]);
  const [imbalance, setImbalance] = useState(0);
  const [selectedPair, setSelectedPair] = useState(tradingPairs[0]);
  const [ws, setWs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ws) {
      ws.close();
    }

    const newWs = new WebSocket(
      `wss://stream.binance.com:9443/ws/${selectedPair.symbol.toLowerCase()}@depth20@100ms`
    );
    setWs(newWs);

    newWs.onopen = () => setLoading(false);

    newWs.onmessage = (event) => {
      const data = JSON.parse(event.data);

      const processPriceLevel = (level) => {
        return Array.isArray(level)
          ? { price: parseFloat(level[0]), amount: parseFloat(level[1]) }
          : {
              price: parseFloat(level.price),
              amount: parseFloat(level.amount),
            };
      };

      const processOrders = (orders) => {
        return Array.isArray(orders)
          ? orders.map(processPriceLevel)
          : typeof orders === "object" && orders !== null
          ? Object.entries(orders).map(([price, amount]) => ({
              price: parseFloat(price),
              amount: parseFloat(amount),
            }))
          : [];
      };

      const bids = processOrders(data.bids);
      const asks = processOrders(data.asks);

      setOrderBookData((prevData) => {
        const newBids = bids.slice(0, 10).map((bid, index) => ({
          ...bid,
          total: bids.slice(0, index + 1).reduce((sum, b) => sum + b.amount, 0),
          change: prevData.bids[index]
            ? bid.amount - prevData.bids[index].amount
            : 0,
        }));

        const newAsks = asks
          .slice(0, 10)
          .reverse()
          .map((ask, index) => ({
            ...ask,
            total: asks
              .slice(0, index + 1)
              .reduce((sum, a) => sum + a.amount, 0),
            change: prevData.asks[index]
              ? ask.amount - prevData.asks[index].amount
              : 0,
          }));

        return { bids: newBids, asks: newAsks };
      });

      const bestBid = bids.length > 0 ? bids[0].price : 0;
      const bestAsk = asks.length > 0 ? asks[0].price : 0;
      const spread = bestAsk - bestBid;
      setSpreadHistory((prev) => [
        ...prev.slice(-59),
        { time: new Date().getTime(), spread },
      ]);

      const bidVolume = bids.reduce((sum, bid) => sum + bid.amount, 0);
      const askVolume = asks.reduce((sum, ask) => sum + ask.amount, 0);
      setImbalance((bidVolume - askVolume) / (bidVolume + askVolume));
    };

    return () => {
      if (newWs) {
        newWs.close();
      }
    };
  }, [selectedPair]);

  const handlePairChange = (value) => {
    const newPair = tradingPairs.find((pair) => pair.symbol === value);
    setSelectedPair(newPair);
    setLoading(true);
  };

  return (
    <VantaBackground>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
          <Header selectedPair={selectedPair} onPairChange={handlePairChange} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SpreadIndicator loading={loading} spreadHistory={spreadHistory} />
            <OrderbookImbalance imbalance={imbalance} />
            <MarketDepth
              loading={loading}
              orderBookData={orderBookData}
              className="lg:col-span-2"
            />
            <OrderBook
              loading={loading}
              orderBookData={orderBookData}
              className="lg:col-span-2"
            />
          </div>
        </div>
      </div>
    </VantaBackground>
  );
}
