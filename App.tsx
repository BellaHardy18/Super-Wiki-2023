import Home from "./Characters";
import React, { useEffect, useState } from "react";
import { Component } from "react";
const API_BASE_URL = "https://api.acmucsd.com/api/v2/event/past";

export default function App() {
  return (
    <div className="App">
      <h1 className="past-event">Past Events</h1>
      <Home></Home>
    </div>
  );
}
