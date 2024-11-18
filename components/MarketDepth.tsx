import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Spinner } from "@/components/ui/spinner";

export default function MarketDepth({
  loading,
  orderBookData,
  className = "",
}) {
  const processMarketDepthData = (bids, asks) => {
    let bidTotal = 0;
    let askTotal = 0;

    const processedBids = bids
      .sort((a, b) => b.price - a.price)
      .map((bid) => {
        bidTotal += bid.amount;
        return { price: bid.price, total: bidTotal, type: "bid" };
      })
      .reverse();

    const processedAsks = asks
      .sort((a, b) => a.price - b.price)
      .map((ask) => {
        askTotal += ask.amount;
        return { price: ask.price, total: askTotal, type: "ask" };
      });

    return [...processedBids, ...processedAsks];
  };

  return (
    <Card
      className={`bg-gray-800 border-green-500 shadow-lg opacity-95 ml-14 mr-14 ${className}`}
    >
      <CardHeader>
        <CardTitle className="text-green-500">Market Depth</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Spinner />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={processMarketDepthData(
                orderBookData.bids,
                orderBookData.asks
              )}
            >
              <XAxis
                dataKey="price"
                stroke="#22c55e"
                domain={["dataMin", "dataMax"]}
                type="number"
                tickFormatter={(value) => value.toFixed(2)}
              />
              <YAxis
                stroke="#22c55e"
                tickFormatter={(value) => value.toFixed(2)}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #22c55e",
                  color: "#22c55e",
                }}
                itemStyle={{ color: "#FFD700" }}
                formatter={(value, name, props) => [
                  value.toFixed(5),
                  props.payload.type === "bid" ? "Bid Total" : "Ask Total",
                ]}
              />
              <Area
                type="stepAfter"
                dataKey="total"
                stroke="#22c55e"
                fill="url(#bidGradient)"
                fillOpacity={0.5}
                data={orderBookData.bids}
                name="Bid"
                isAnimationActive={false}
              />
              <Area
                type="stepAfter"
                dataKey="total"
                stroke="#ef4444"
                fill="url(#askGradient)"
                fillOpacity={0.5}
                name="Ask"
                isAnimationActive={false}
                data={orderBookData.asks}
              />
              <defs>
                <linearGradient id="bidGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="askGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}