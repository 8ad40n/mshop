"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { LabelList, Pie, PieChart } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

export function CategoryPie() {
  const [categoryData, setCategoryData] = useState<
    { category: string; count: number; fill: string }[]
  >([]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/product");

        const categoryCount = response.data.reduce((acc: any, product: any) => {
          acc[product.category] = (acc[product.category] || 0) + 1;
          return acc;
        }, {});

        const formattedData = Object.keys(categoryCount).map((category) => ({
          category,
          count: categoryCount[category],
          fill: getRandomColor(),
        }));

        setCategoryData(formattedData);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchCategoryData();
  }, []);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Product Categories</CardTitle>
        <CardDescription>Distribution of Products by Category</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{
            count: { label: "Count" },
            ...categoryData.reduce((acc, item) => {
              acc[item.category] = { label: item.category, color: item.fill };
              return acc;
            }, {} as Record<string, { label: string; color: string }>)
          }}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="category" />}
            />
            <Pie data={categoryData} dataKey="count" nameKey="category" cx="50%" cy="50%">
              <LabelList
                dataKey="category"
                className="fill-background"
                stroke="none"
                fontSize={12}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
