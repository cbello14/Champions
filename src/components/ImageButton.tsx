import { Button } from '@/components/ui/button';

const ImageButton = ({
  source,
  onClick,
  name,
}: {
  source: string;
  onClick: () => void;
  name: string;
}) => (
  <div className="flex flex-col items-center">
    <img alt="" height={80} src={source} width={80} />
    <Button onClick={onClick}> {name} </Button>
  </div>
);
export default ImageButton;
