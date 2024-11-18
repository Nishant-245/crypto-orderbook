import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrderbookImbalance({ imbalance }) {
  return (
    <Card className="bg-gray-800 border-green-500 shadow-lg opacity-95 w-[550px] mr-14">
      <CardHeader>
        <CardTitle className="text-green-500">Orderbook Imbalance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] flex flex-col justify-center">
          <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
            <div
              className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-4 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${(imbalance + 1) * 50}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Sell Pressure</span>
            <span>Neutral</span>
            <span>Buy Pressure</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}