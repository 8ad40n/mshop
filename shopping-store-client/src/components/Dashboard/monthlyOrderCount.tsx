"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import axios from "axios"
import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, Tooltip, XAxis } from "recharts"

// Function to group orders by month
const groupOrdersByMonth = (orders: { createdAt: string }[]) => {
  const result: Record<string, number> = {}

  orders.forEach((order) => {
    const month = new Date(order.createdAt).toLocaleString("default", { month: "long", year: "numeric" }) // Get full month name and year
    result[month] = (result[month] || 0) + 1
  })

  return Object.keys(result).map((month) => ({
    month,
    orders: result[month],
  }))
}

export function MonthlyOrderCount() {
  const [processedData, setProcessedData] = useState<{ month: string; orders: number }[]>([])

  useEffect(() => {
    // Fetch orders using axios
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/order/allOrders")
        const data = response.data

        if (data.message === "All orders retrieved successfully") {
          const groupedData = groupOrdersByMonth(data.orders)
          console.log("Grouped Data: ", groupedData)  // Log the processed data to check
          setProcessedData(groupedData)
        }
      } catch (error) {
        console.error("Error fetching orders:", error)
      }
    }

    fetchOrders()
  }, [])

  // Check if processedData is empty or not before rendering the chart
  if (processedData.length === 0) {
    return (
      <Card>
        <CardContent>
          <div>Loading or No Data</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>Monthly Orders</CardTitle>
        <CardDescription>Order count per month</CardDescription>
      </CardHeader>
      <CardContent>
        <BarChart
          data={processedData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          width={500}  
          height={300}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)} 
            //"Jan", "Feb"
          />
          <Tooltip />
          <Bar dataKey="orders" fill="#8884d8" radius={8}>
            <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
          </Bar>
        </BarChart>
      </CardContent>
    </Card>
  )
}
