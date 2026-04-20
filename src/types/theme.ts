type color = string
interface theme {
	gridPrimaryColor: color,
	gridAlternateColor: color,
	gridOutlineColor: color
	teamColors: color[]
}

const basic_theme: theme = {
	gridPrimaryColor: "blue",
	gridAlternateColor: "tan",
	gridOutlineColor: "black",
	teamColors: ["black", "white", "orange", "purple"]
}

export { basic_theme }
export type { theme }
