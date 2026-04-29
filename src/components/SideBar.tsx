import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import type { ReactNode } from 'react';

const SideBar = ({
  isOpen,
  setIsOpen,
  name,
  content,
  align,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  name: string;
  content: ReactNode;
  align: 'left' | 'right';
}) => (
  <Popover open={isOpen}>
    <PopoverTrigger asChild>
      <Button
        className="data-[state=open]:bg-accent h-7 w-7 grow-1"
        size="icon"
        variant="ghost"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {name}
      </Button>
    </PopoverTrigger>
    <PopoverContent
      align={align === 'left' ? 'start' : 'end'}
      className="overflow-hidden rounded-lg p-5 grow-1"
    >
      {content}
    </PopoverContent>
  </Popover>
);

export default SideBar;
