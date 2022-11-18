import { styled } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import HeaderHome from "./HeaderHome";
import FooterHome from "./FooterHome";

const RootStyle = styled("div")({
  background: '#121A27'
});
const MainStyle = styled("div")(({ theme }) => ({}));

export default function ClientLayout() {
  return (
    <RootStyle>
      <HeaderHome />
      <MainStyle>
        <Outlet />
      </MainStyle>
      <FooterHome />
    </RootStyle>
  );
}
