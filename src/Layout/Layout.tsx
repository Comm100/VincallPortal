import { Layout as AdminLayout, LayoutProps } from "react-admin";
import { isEmbeddedMode } from "../Helpers/Index";
import AppBar from "./AppBar";
import Menu from "./Menu";
import { CssBaseline, Container } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import { Error } from "react-admin";

export const Layout = (props: LayoutProps) => {
  if (isEmbeddedMode) {
    return (
      <>
        <CssBaseline />
        {/* <Header /> */}
        <Container>
          <main id="main-content">
            {/* @ts-ignore */}
            <ErrorBoundary FallbackComponent={Error}>
              {props.children}
            </ErrorBoundary>
          </main>
        </Container>
      </>
    );
  }
  return (
    <AdminLayout
      {...props}
      appBar={!isEmbeddedMode ? AppBar : () => null}
      menu={!isEmbeddedMode ? Menu : () => null}
    />
  );
};
