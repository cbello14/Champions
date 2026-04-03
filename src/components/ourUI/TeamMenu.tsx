import type { Game } from "@/features/games/game";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";

const TeamMenu = ({ game, teamId, setTeamId }: { game: Game, teamId: number, setTeamId: (id: number) => void }) => {
  const teamIds = Object.keys(game.teams).map(Number).sort();
  // const [teamId, setTeamId] = useState<number>(teamIds[0]);

  return <div className="flex flex-row" >
      <label>Team: </label>
      <Select
        value={String(teamId)}
        onValueChange={(e) => setTeamId(Number(e))}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent >
          <SelectGroup>
            {
              teamIds.map(teamId => 
                <SelectItem value={String(teamId)}>{teamId + ": " + game.teams[teamId].color}</SelectItem>
              )
            }
          </SelectGroup>
        </SelectContent>
      </Select>
  </div>
};

export default TeamMenu;