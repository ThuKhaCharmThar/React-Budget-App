import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import wave from "../assets/wave.svg";
import { fetchData } from "../pages/helper";
import Nav from "../components/Nav";

export function mainLoader() {
  const userName = fetchData("userName");
  return { userName };
}

function Main() {
  const { userName } = useLoaderData();
  return (
    <div className="layout">
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="wave" />
    </div>
  );
}

export default Main;
