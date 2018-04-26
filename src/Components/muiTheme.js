import getMuiTheme from "material-ui/styles/getMuiTheme";
import { blueGrey700, blueGrey400 } from "material-ui/styles/colors";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey700,
    primary2Color: blueGrey700,
    primary3Color: blueGrey700,
    accent1Color: blueGrey400,
    accent2Color: blueGrey400,
    accent3Color: blueGrey400
  }
});
export default muiTheme;
