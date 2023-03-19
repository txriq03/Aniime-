import { createTheme } from "@mui/system";
import react from 'react';

const Theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#bd284d'
      },
      background: {
        default: '#0E0E0E',
      }
    },
    typography: {
      fontFamily: 'Youtube Sans',
    },
    components: {
      MuiInputLabel: {
        defaultProps: {
          sx: {
            fontSize: "1rem",
          },
        },
      },
    }
  });

export default Theme