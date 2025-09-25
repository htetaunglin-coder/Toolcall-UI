import { ChartProps } from "@/components/chart/chart-renderer"

export type MockChartProps = {
  name: string
} & ChartProps

export const mockCharts: MockChartProps[] = [
  // 1. Simple Bar Chart - One Bar (GDP by sector)
  {
    name: "Simple Bar Chart",
    type: "bar",
    title: "GDP by Sector (USD billions)",
    description: "Breakdown of GDP contribution by major sectors (latest year)",
    categoryKey: "sector",
    valueKeys: ["gdp"],
    data: [
      { sector: "Services", gdp: 9800 },
      { sector: "Industry", gdp: 4200 },
      { sector: "Agriculture", gdp: 760 },
      { sector: "Construction", gdp: 520 },
      { sector: "Mining", gdp: 310 },
    ],
    legend: false,
    config: {
      series: [{ key: "gdp", color: "#3B82F6", label: "GDP (USD bn)" }],
    },
  },

  // 2. Grouped Bar Chart (Quarterly growth % by sector)
  {
    name: "Grouped Bar Chart",
    type: "bar",
    title: "Quarterly Growth (%) by Sector",
    description: "Q1–Q3 growth rates across sectors",
    categoryKey: "sector",
    valueKeys: ["Q1", "Q2", "Q3"],
    data: [
      { sector: "Services", Q1: 1.8, Q2: 2.1, Q3: 2.5 },
      { sector: "Industry", Q1: 0.9, Q2: 1.4, Q3: 1.8 },
      { sector: "Agriculture", Q1: 0.5, Q2: 0.6, Q3: 0.7 },
      { sector: "Construction", Q1: 1.2, Q2: 1.0, Q3: 1.3 },
    ],
    legend: true,
    config: {
      series: [
        { key: "Q1", color: "#8B5CF6", label: "Q1" },
        { key: "Q2", color: "#06D6A0", label: "Q2" },
        { key: "Q3", color: "#F59E0B", label: "Q3" },
      ],
    },
  },

  // 3. Stacked Bar Chart (GDP composition by year)
  {
    name: "Stacked Bar Chart",
    type: "bar",
    title: "GDP Composition by Component",
    description: "How consumption, investment and government spending contributed to GDP over years",
    categoryKey: "year",
    valueKeys: ["consumption", "investment", "government"],
    data: [
      { year: "2019", consumption: 5600, investment: 2200, government: 900 },
      { year: "2020", consumption: 5300, investment: 1800, government: 1050 },
      { year: "2021", consumption: 6000, investment: 2400, government: 980 },
      { year: "2022", consumption: 6500, investment: 2700, government: 1020 },
    ],
    stacked: true,
    legend: true,
    config: {
      series: [
        { key: "consumption", color: "#10B981", label: "Consumption" },
        { key: "investment", color: "#3B82F6", label: "Investment" },
        { key: "government", color: "#EF4444", label: "Government" },
      ],
    },
  },

  // 4. Stacked Grouped Bar Chart (Regional: 2019 vs 2024 components)
  {
    name: "Stacked Grouped Bar Chart",
    type: "bar",
    title: "Regional GDP Components — 2019 vs 2024",
    description: "Compare composition across regions and two years (stacked groups)",
    categoryKey: "region",
    valueKeys: ["2019_cons", "2019_inv", "2019_gov", "2024_cons", "2024_inv", "2024_gov"],
    data: [
      {
        region: "North America",
        "2019_cons": 2100,
        "2019_inv": 850,
        "2019_gov": 420,
        "2024_cons": 2500,
        "2024_inv": 980,
        "2024_gov": 480,
      },
      {
        region: "Europe",
        "2019_cons": 1700,
        "2019_inv": 640,
        "2019_gov": 380,
        "2024_cons": 1900,
        "2024_inv": 720,
        "2024_gov": 420,
      },
      {
        region: "Asia Pacific",
        "2019_cons": 2600,
        "2019_inv": 1200,
        "2019_gov": 510,
        "2024_cons": 3100,
        "2024_inv": 1450,
        "2024_gov": 590,
      },
    ],
    stacked: true,
    stackGroups: {
      "2019": ["2019_cons", "2019_inv", "2019_gov"],
      "2024": ["2024_cons", "2024_inv", "2024_gov"],
    },
    legend: true,
    config: {
      series: [
        { key: "2019_cons", color: "#60A5FA", label: "2019 Consumption" },
        { key: "2019_inv", color: "#3B82F6", label: "2019 Investment" },
        { key: "2019_gov", color: "#1F2937", label: "2019 Government" },
        { key: "2024_cons", color: "#34D399", label: "2024 Consumption" },
        { key: "2024_inv", color: "#10B981", label: "2024 Investment" },
        { key: "2024_gov", color: "#059669", label: "2024 Government" },
      ],
    },
  },

  // 5. Simple Horizontal Bar Chart (Exports by Category)
  {
    name: "Simple Horizontal Bar Chart",
    type: "bar",
    title: "Top Export Categories (USD millions)",
    description: "Largest export categories this year — horizontal layout",
    categoryKey: "category",
    valueKeys: ["exports"],
    data: [
      { category: "Electronics", exports: 85000 },
      { category: "Automotive", exports: 62000 },
      { category: "Pharmaceuticals", exports: 41000 },
      { category: "Textiles", exports: 29000 },
      { category: "Agricultural", exports: 17000 },
    ],
    orientation: "horizontal",
    legend: false,
    config: {
      series: [{ key: "exports", color: "#8B5CF6", label: "Exports (USD m)" }],
    },
  },

  // 6. Grouped Horizontal Bar Chart (Export growth vs Domestic growth)
  {
    name: "Grouped Horizontal Bar Chart",
    type: "bar",
    title: "Export vs Domestic Sales Growth by Sector",
    description: "Comparing export growth and domestic sales growth (YTD)",
    categoryKey: "sector",
    valueKeys: ["exportGrowth", "domesticGrowth"],
    data: [
      { sector: "Electronics", exportGrowth: 12.5, domesticGrowth: 6.2 },
      { sector: "Automotive", exportGrowth: 8.0, domesticGrowth: 3.4 },
      { sector: "Textiles", exportGrowth: 6.8, domesticGrowth: 2.1 },
      { sector: "Food", exportGrowth: 4.9, domesticGrowth: 5.5 },
    ],
    orientation: "horizontal",
    legend: true,
    config: {
      series: [
        { key: "exportGrowth", color: "#06D6A0", label: "Export Growth %" },
        { key: "domesticGrowth", color: "#F59E0B", label: "Domestic Growth %" },
      ],
    },
  },

  // 7. Stacked Horizontal Bar Chart (Household Spending composition)
  {
    name: "Stacked Horizontal Bar Chart",
    type: "bar",
    title: "Household Spending Composition (Stacked)",
    description: "Composition of household spending categories",
    categoryKey: "quintile",
    valueKeys: ["housing", "food", "transport", "other"],
    data: [
      { quintile: "Lowest 20%", housing: 320, food: 280, transport: 120, other: 150 },
      { quintile: "Second 20%", housing: 400, food: 260, transport: 140, other: 180 },
      { quintile: "Middle 20%", housing: 500, food: 240, transport: 180, other: 220 },
      { quintile: "Top 20%", housing: 700, food: 200, transport: 220, other: 300 },
    ],
    orientation: "horizontal",
    stacked: true,
    legend: true,
    config: {
      series: [
        { key: "housing", color: "#3B82F6", label: "Housing" },
        { key: "food", color: "#F97316", label: "Food" },
        { key: "transport", color: "#06D6A0", label: "Transport" },
        { key: "other", color: "#8B5CF6", label: "Other" },
      ],
    },
  },

  // 8. Stacked Group Horizontal Bar Chart (Household spending 2015 vs 2025 by quintile)
  {
    name: "Stacked Group Horizontal Bar Chart",
    type: "bar",
    title: "Household Spending: 2015 vs 2025",
    description: "Compare composition changes across quintiles between 2015 and 2025",
    categoryKey: "quintile",
    valueKeys: [
      "2015_housing",
      "2015_food",
      "2015_transport",
      "2015_other",
      "2025_housing",
      "2025_food",
      "2025_transport",
      "2025_other",
    ],
    data: [
      {
        quintile: "Lowest 20%",
        "2015_housing": 350,
        "2015_food": 300,
        "2015_transport": 100,
        "2015_other": 120,
        "2025_housing": 400,
        "2025_food": 280,
        "2025_transport": 130,
        "2025_other": 150,
      },
      {
        quintile: "Top 20%",
        "2015_housing": 600,
        "2015_food": 250,
        "2015_transport": 200,
        "2015_other": 280,
        "2025_housing": 700,
        "2025_food": 220,
        "2025_transport": 230,
        "2025_other": 320,
      },
    ],
    orientation: "horizontal",
    stacked: true,
    stackGroups: {
      "2015": ["2015_housing", "2015_food", "2015_transport", "2015_other"],
      "2025": ["2025_housing", "2025_food", "2025_transport", "2025_other"],
    },
    legend: true,
    config: {
      series: [
        { key: "2015_housing", color: "#60A5FA", label: "2015 Housing" },
        { key: "2015_food", color: "#FB923C", label: "2015 Food" },
        { key: "2015_transport", color: "#34D399", label: "2015 Transport" },
        { key: "2015_other", color: "#A78BFA", label: "2015 Other" },
        { key: "2025_housing", color: "#3B82F6", label: "2025 Housing" },
        { key: "2025_food", color: "#F97316", label: "2025 Food" },
        { key: "2025_transport", color: "#10B981", label: "2025 Transport" },
        { key: "2025_other", color: "#7C3AED", label: "2025 Other" },
      ],
    },
  },

  // 9. Simple Line Chart (Monthly Inflation Rate)
  {
    name: "Simple Line Chart",
    type: "line",
    title: "Monthly Inflation Rate (%)",
    description: "Inflation rate over the last 12 months",
    categoryKey: "month",
    valueKeys: ["inflation"],
    data: [
      { month: "Jan", inflation: 2.1 },
      { month: "Feb", inflation: 2.3 },
      { month: "Mar", inflation: 2.7 },
      { month: "Apr", inflation: 3.0 },
      { month: "May", inflation: 3.4 },
      { month: "Jun", inflation: 3.1 },
      { month: "Jul", inflation: 3.2 },
      { month: "Aug", inflation: 3.6 },
      { month: "Sep", inflation: 3.8 },
      { month: "Oct", inflation: 3.5 },
      { month: "Nov", inflation: 3.3 },
      { month: "Dec", inflation: 3.1 },
    ],
    legend: false,
    config: {
      series: [{ key: "inflation", color: "#EF4444", label: "Inflation %" }],
    },
  },

  // 10. Multi Line Chart (Unemployment vs Labor Force Participation)
  {
    name: "Multi Line Chart",
    type: "line",
    title: "Unemployment & Labour Participation (%)",
    description: "Monthly unemployment rate against labour participation",
    categoryKey: "month",
    valueKeys: ["unemployment", "participation"],
    data: [
      { month: "Jan", unemployment: 6.2, participation: 62.0 },
      { month: "Feb", unemployment: 6.0, participation: 62.2 },
      { month: "Mar", unemployment: 5.8, participation: 62.4 },
      { month: "Apr", unemployment: 5.9, participation: 62.6 },
      { month: "May", unemployment: 5.6, participation: 62.8 },
      { month: "Jun", unemployment: 5.4, participation: 63.0 },
      { month: "Jul", unemployment: 5.3, participation: 63.2 },
    ],
    legend: true,
    config: {
      series: [
        { key: "unemployment", color: "#3B82F6", label: "Unemployment %" },
        { key: "participation", color: "#F59E0B", label: "Labour Participation %" },
      ],
    },
  },

  // 11. Area Chart (Exports vs Imports)
  {
    name: "Area Chart",
    type: "area",
    title: "Monthly Trade Flows (Exports & Imports, USD millions)",
    description: "Stacked area: exports and imports over the year",
    categoryKey: "month",
    valueKeys: ["exports", "imports"],
    data: [
      { month: "Jan", exports: 4200, imports: 3800 },
      { month: "Feb", exports: 4500, imports: 4100 },
      { month: "Mar", exports: 4800, imports: 4600 },
      { month: "Apr", exports: 5100, imports: 4900 },
      { month: "May", exports: 5300, imports: 5200 },
      { month: "Jun", exports: 5700, imports: 5600 },
    ],
    legend: true,
    config: {
      series: [
        { key: "exports", color: "#06D6A0", label: "Exports" },
        { key: "imports", color: "#118AB2", label: "Imports" },
      ],
    },
  },

  // 12. Pie Chart (Regional GDP Market Share)
  {
    name: "Pie Chart",
    type: "pie",
    title: "Global GDP Market Share by Region (%)",
    description: "Share of global GDP by region",
    categoryKey: "region",
    valueKeys: ["share"],
    data: [
      { region: "North America", share: 30 },
      { region: "Europe", share: 23 },
      { region: "Asia Pacific", share: 36 },
      { region: "Latin America", share: 6 },
      { region: "Africa", share: 5 },
    ],
    legend: true,
    config: {
      items: [
        { key: "North America", color: "#3B82F6", label: "North America" },
        { key: "Europe", color: "#8B5CF6", label: "Europe" },
        { key: "Asia Pacific", color: "#06D6A0", label: "Asia Pacific" },
        { key: "Latin America", color: "#F59E0B", label: "Latin America" },
        { key: "Africa", color: "#EF4444", label: "Africa" },
      ],
    },
  },

  // 13. Donut Chart - Without Total (Sectoral Export Share)
  {
    name: "Donut Chart",
    type: "donut",
    title: "Export Share by Industry (%)",
    description: "Proportional breakdown of exports by industry",
    categoryKey: "industry",
    valueKeys: ["share"],
    data: [
      { industry: "Electronics", share: 34 },
      { industry: "Automotive", share: 24 },
      { industry: "Pharma", share: 15 },
      { industry: "Textiles", share: 13 },
      { industry: "Agriculture", share: 8 },
      { industry: "Other", share: 6 },
    ],
    showTotal: false,
    legend: true,
    config: {
      items: [
        { key: "Electronics", color: "#3B82F6", label: "Electronics" },
        { key: "Automotive", color: "#10B981", label: "Automotive" },
        { key: "Pharma", color: "#F59E0B", label: "Pharmaceuticals" },
        { key: "Textiles", color: "#8B5CF6", label: "Textiles" },
        { key: "Agriculture", color: "#EF4444", label: "Agriculture" },
        { key: "Other", color: "#64748B", label: "Other" },
      ],
    },
  },

  // 14. Donut Chart - With Total Value (Government Revenue Sources)
  {
    name: "Donut Chart - With Total Value",
    type: "donut",
    title: "Government Revenue Sources (Total: 1,000 USD m)",
    description: "Main revenue sources and the total amount (showTotal enabled)",
    categoryKey: "source",
    valueKeys: ["amount"],
    data: [
      { source: "Income Tax", amount: 480 },
      { source: "Corporate Tax", amount: 260 },
      { source: "VAT", amount: 180 },
      { source: "Tariffs", amount: 30 },
      { source: "Other", amount: 50 },
    ],
    showTotal: true, // total = 480+260+180+30+50 = 1000
    legend: true,
    config: {
      items: [
        { key: "Income Tax", color: "#06D6A0", label: "Income Tax" },
        { key: "Corporate Tax", color: "#3B82F6", label: "Corporate Tax" },
        { key: "VAT", color: "#F59E0B", label: "VAT" },
        { key: "Tariffs", color: "#EF4444", label: "Tariffs" },
        { key: "Other", color: "#64748B", label: "Other" },
      ],
    },
  },

  // 15. Radial Chart (Economic Health Indices)
  {
    name: "Radial Chart",
    type: "radial",
    title: "Economic Health Index (0–100)",
    description: "Key indices summarizing the economic health",
    categoryKey: "metric",
    valueKeys: ["score"],
    data: [
      { metric: "GDP Growth", score: 78 },
      { metric: "Inflation Control", score: 72 },
      { metric: "Employment", score: 81 },
      { metric: "Trade Balance", score: 69 },
      { metric: "Fiscal Strength", score: 75 },
    ],
    legend: false,
    config: {
      items: [
        { key: "GDP Growth", color: "#3B82F6", label: "GDP Growth" },
        { key: "Inflation Control", color: "#EF4444", label: "Inflation Control" },
        { key: "Employment", color: "#06D6A0", label: "Employment" },
        { key: "Trade Balance", color: "#F59E0B", label: "Trade Balance" },
        { key: "Fiscal Strength", color: "#8B5CF6", label: "Fiscal Strength" },
      ],
    },
  },
]
