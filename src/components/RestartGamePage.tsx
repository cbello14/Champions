import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Instance } from '@/features/instances/instance';
import { useStore } from '@/utils/storage';

import SnapshotButton from './SnapshotButton';

import type { InstanceJSON } from '@/features/instances/instance';

const RestartGamePage = () => {
  const navigate = useNavigate();
  const savedInstances = useStore((state) => state.instances);
  const instances = Object.values(savedInstances);

  if (!instances.length) {
    return (
      <main className="p-4 flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Current Games</h2>
        <p>No saved games in progress.</p>
        <Button
          onClick={() => {
            navigate('/start');
          }}
        >
          Start A Game
        </Button>
      </main>
    );
  }

  return (
    <main className="p-4 flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Current Games</h2>
      <p>Saved games found.</p>
      <div className="flex flex-row">
        {instances.map((instanceJSON: InstanceJSON) => {
          const instance = Instance.fromJSON(instanceJSON);

          return (
            <div key={instance.id} className="p-4">
              <SnapshotButton
                snapshotItem={instance}
                text="Resume Game"
                onClick={() => {
                  navigate(`/play/${instance.id}`);
                }}
              />
            </div>
          );
        })}
      </div>
      <Button
        variant="outline"
        onClick={() => {
          navigate('/start');
        }}
      >
        Start New Game
      </Button>
    </main>
  );
};

export default RestartGamePage;
