import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "../src/views/main/Main";
import { Toolbar } from "../src/views/toolbar/Toolbar";

const routes = {
  "/main": <Main />,
  "/toolbar": <Toolbar />,
};

export function ViewRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {Object.entries(routes).map(([key, element]) => {
          return <Route path={key} element={element} />;
        })}
        <Route path="*" element={<div>Specify registered view</div>} />
      </Routes>
    </BrowserRouter>
  );
}
