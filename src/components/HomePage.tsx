import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="content-center">
      <div className="flex flex-row justify-evenly gap-x-10 m-10">
        <div className="flex grow flex-col justify-evenly gap-y-10">
          <Button
            className="flex-auto"
            onClick={() => {
              navigate('start');
            }}
          >
            {' '}
            Start A Game{' '}
          </Button>
          <div className="flex flex-row flex-grow gap-x-10 ">
            <Button
              className="flex-1 h-full"
              onClick={() => {
                navigate('pieces');
              }}
            >
              {' '}
              Create Custom Piece
            </Button>
            <Button
              className="flex-1 h-full"
              onClick={() => {
                navigate('boards');
              }}
            >
              {' '}
              Create Custom Board
            </Button>
            <Button
              className="flex-1 h-full"
              onClick={() => {
                navigate('games');
              }}
            >
              {' '}
              Create Custom Game
            </Button>
          </div>
          <Button
            className="flex-auto"
            onClick={() => {
              navigate('current-games');
            }}
          >
            {' '}
            Current Games{' '}
          </Button>
        </div>
        <img
          alt=""
          src="https://www.regencychess.co.uk/images/how-to-set-up-a-chessboard/how-to-set-up-a-chessboard-7.jpg"
        />
      </div>
    </div>
  );
};
export default HomePage;
