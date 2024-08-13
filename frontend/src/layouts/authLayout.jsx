import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import themes from "../utils/theme";

const AuthLayout = () => {
  return (
    <Box backgroundColor={themes.colors.primary['0']}>
        <Outlet />
    </Box>
  );
}

export default AuthLayout;