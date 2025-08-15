export type Team = {
    name: string;
    place: number;
    played: number;
    goalDifference: number;
    points: number;
}

const fetchTableData = async () : Promise<Team[]> => {
  const response = await fetch("https://v3api.nifs.no/stages/699613/table/");
  const data = await response.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.teams.map((team: any) => ({
    name: team.name,
    place: team.place,
    played: team.played,
    goalDifference: team.goalDifference,
    points: team.points
  }));
};

export default fetchTableData;
