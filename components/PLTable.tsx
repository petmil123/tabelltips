import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell, TableFooter } from "./ui/table";
import type { Team } from "@/lib/fetching";
type Prediction = {
    name: string;
    tips: string[];
    points: number;
};
interface PLTableProps {
    tableData: Team[];
    predictions: Prediction[];
}

const getPlacementString = (placementDiff: number) => {
    if (placementDiff === 0) return "🌟 (25p)";
    if (placementDiff > 0) return `⬆️${placementDiff} (${20 - (placementDiff)}p)`;
    if (placementDiff < 0) return `⬇️${Math.abs(placementDiff)} (${20 - Math.abs(placementDiff)}p)`;
    return "Not"
};

export const PLTable = ({ tableData, predictions }: PLTableProps) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Lag</TableHead>
                    <TableHead>K</TableHead>
                    <TableHead>+/-</TableHead>
                    <TableHead>P</TableHead>
                    {predictions.map(prediction => <TableHead key={prediction.name}>{prediction.name}</TableHead>)}
                </TableRow>
            </TableHeader>
            <TableBody>
                {tableData.map((team) => (
                    <TableRow key={team.name}>
                        <TableCell>{team.place}</TableCell>
                        <TableCell>{team.name}</TableCell>
                        <TableCell>{team.played}</TableCell>
                        <TableCell>{team.goalDifference}</TableCell>
                        <TableCell>{team.points}</TableCell>
                        {predictions.map(prediction => {
                            const tip = prediction.tips.findIndex(t => t === team.name);
                            return <TableCell key={prediction.name}>{tip !== -1 ?  getPlacementString(team.place - (tip + 1))  : "-"}</TableCell>;
                        })}
                    </TableRow>
                
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={5}>Total</TableCell>
                    {predictions.map(prediction => {
                        const totalPoints = prediction.points || 0;
                        return <TableCell key={prediction.name}>{totalPoints}p</TableCell>;
                    })}
                </TableRow>
            </TableFooter>
        </Table>
    );
}

