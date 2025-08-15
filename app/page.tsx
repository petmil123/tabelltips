import { PLTable } from "@/components/PLTable";
import fetchTableData, { Team } from "@/lib/fetching";
import {promises as fs} from 'fs'

function calculatePoints(tableData: Team[], tips: string[]) {
  return tips.reduce((acc, guess, index) => {
    const guessedPlacement = index + 1;
    const team = tableData.find(t => t.name === guess);
    if (!team) return acc;
    if (team.place === guessedPlacement) return acc + 25;
    return acc + (20 - Math.abs(team.place - guessedPlacement));
  }, 0);
}

export const dynamic = 'force-dynamic';

export default async function Home() {
const tableData = await fetchTableData();
const predictions = await fs.readFile("app/data/tips.json", "utf-8").then(JSON.parse);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const predictionsWithPoints = predictions.map((prediction: any) => ({
  ...prediction,
  points: calculatePoints(tableData, prediction.tips)
}))
// eslint-disable-next-line @typescript-eslint/no-explicit-any
.sort((a: any, b: any) => b.points - a.points);
  return (
    <>
    <h1 className="text-2xl">Tabelltipsoversikt</h1>
    <PLTable tableData={tableData} predictions={predictionsWithPoints} />
    </>
  );
}
