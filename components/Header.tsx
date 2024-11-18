import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tradingPairs } from "@/constants/trading";

export default function Header({ selectedPair, onPairChange }) {
  return (
    <header className="text-center space-y-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-500">
        Blockchain Exchange
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-400">
        Real-time cryptocurrency orderbook and market data
      </p>
      <Select onValueChange={onPairChange} defaultValue={selectedPair.symbol}>
        <SelectTrigger className="w-full sm:w-[180px] bg-gray-800 text-gray-400 border-green-500 mx-auto">
          <SelectValue placeholder="Select trading pair" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 text-gray-400 border-green-500">
          {tradingPairs.map((pair) => (
            <SelectItem
              key={pair.symbol}
              value={pair.symbol}
              className="hover:bg-gray-700"
            >
              {pair.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </header>
  );
}
