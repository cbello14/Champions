type Color = string;
interface Theme {
  gridPrimaryColor: Color;
  gridAlternateColor: Color;
  gridOutlineColor: Color;
  teamColors: Color[];
}

const basicTheme: Theme = {
  gridPrimaryColor: 'blue',
  gridAlternateColor: 'tan',
  gridOutlineColor: 'black',
  teamColors: ['black', 'white', 'orange', 'purple'],
};

export { basicTheme };
export type { Theme as theme };
