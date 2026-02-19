import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import type { ReactNode } from "react";
const SideBar =
	({ isOpen, setIsOpen, name, content, align }:
		{ isOpen: boolean; setIsOpen: (value: boolean) => void; name: string, content: ReactNode; align: "left" | "right" }) => {
		return <>
			<Popover open={isOpen}>
				<PopoverTrigger asChild>
					<Button
						onClick={() => { setIsOpen(!isOpen) }}
						variant="ghost"
						size="icon"
						className="data-[state=open]:bg-accent h-7 w-7 grow-1"
					>
						{name}
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className="overflow-hidden rounded-lg p-5 grow-1"
					align={align === "left" ? "start" : "end"}
				>
					{content}
				</PopoverContent>
			</Popover>
		</>
	}

export default SideBar;
