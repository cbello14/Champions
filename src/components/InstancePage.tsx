import { useState } from 'react';

import { useParams } from 'react-router';

import { Instance } from '@/features/instances/instance';
import { useStore } from '@/utils/storage';

import BoardInstance from './BoardComponents/BoardInstance';
import { Button } from './ui/button';
import { Card, CardHeader } from './ui/card';
import { Popover, PopoverContent, PopoverHeader, PopoverTitle, PopoverTrigger } from './ui/popover';

const InstancePage = () => {
  const { instanceId } = useParams<{ instanceId: string }>();
  const instanceJSON = useStore((state) => (instanceId ? state.instances[instanceId] : null));
  const saveInstance = useStore((state) => state.setInstance);
  const [instance, setInstance] = useState<Instance | null>(
    instanceJSON ? Instance.fromJSON(instanceJSON) : null
  );
  const [currentTeam, setCurrentTeam] = useState<number>(1);

  const nextTeam = () => {
    if (!instance) return;
    setCurrentTeam((team) => (team + 1) % instance.numTeams);
    saveInstance(instance);
  };

  const teamName = (n: number) => {
    switch (n) {
      case 1:
        return 'White';

      case 2:
        return 'Orange';

      case 3:
        return 'Purple';

      default:
        return 'Black';
    }
  };

  return (
    <div className="flex flex-row justify-between h-full gap-4 p-4">
      <main className="flex grow-5 items-center justify-center">
        <div className="flex flex-col center">
          <Popover>
            <PopoverTrigger asChild />
            <PopoverContent align="start" className="w-64">
              <PopoverHeader>
                <PopoverTitle>Play Another?</PopoverTitle>
              </PopoverHeader>
              <Button> Rematch </Button>
              <br />
              <Button> Another </Button>
              <br />
              <Button> Quit </Button>
              <br />
            </PopoverContent>
          </Popover>
          <Card className="m-5">
            <CardHeader className="flex flex-row items-center">
              <h3>{teamName(currentTeam)} Teams Turn</h3>
            </CardHeader>
          </Card>
          {instance ? (
            <BoardInstance
              cellWidth={100}
              currentTeam={currentTeam}
              instance={instance}
              nextTeam={nextTeam}
              setInstance={setInstance}
            />
          ) : (
            <div>Could not find game</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default InstancePage;
