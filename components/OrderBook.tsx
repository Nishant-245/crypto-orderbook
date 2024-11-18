import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";

export default function OrderBook({ loading, orderBookData, className = "" }) {
  return (
    <Card
      className={`bg-gray-800 border-green-500 shadow-lg opacity-95 ml-14 mr-14 ${className}`}
    >
      <CardHeader>
        <CardTitle className="text-green-500">Order Book</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-center text-green-500 font-semibold mb-2">
                Bids
              </h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right text-green-400">
                      Price
                    </TableHead>
                    <TableHead className="text-right text-green-400">
                      Amount
                    </TableHead>
                    <TableHead className="text-right text-green-400">
                      Total
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderBookData.bids.map((bid) => (
                    <TableRow
                      key={bid.price}
                      className={`transition-colors ${
                        bid.change > 0
                          ? "text-green-500"
                          : bid.change < 0
                          ? "text-red-500"
                          : "text-green-400"
                      }`}
                    >
                      <TableCell className="text-right font-medium">
                        {bid.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        {bid.amount.toFixed(5)}
                      </TableCell>
                      <TableCell className="text-right">
                        {bid.total.toFixed(5)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div>
              <h3 className="text-center text-red-500 font-semibold mb-2">
                Asks
              </h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right text-green-400">
                      Price
                    </TableHead>
                    <TableHead className="text-right text-green-400">
                      Amount
                    </TableHead>
                    <TableHead className="text-right text-green-400">
                      Total
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderBookData.asks.map((ask) => (
                    <TableRow
                      key={ask.price}
                      className={`transition-colors ${
                        ask.change > 0
                          ? "text-green-500"
                          : ask.change < 0
                          ? "text-red-500"
                          : "text-green-400"
                      }`}
                    >
                      <TableCell className="text-right font-medium">
                        {ask.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        {ask.amount.toFixed(5)}
                      </TableCell>
                      <TableCell className="text-right">
                        {ask.total.toFixed(5)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}