import { Button } from "@/components/ui/button";

const ImageButton = ({
  source,
  onClick,
  name,
}: {
  source: string;
  onClick: () => void;
  name: string;
}) => {
  return (
    <div className="flex flex-col items-center">
      <img src={source} height={80} width={80} />
      <Button onClick={onClick}> {name} </Button>
    </div>
  );
};
export default ImageButton;
