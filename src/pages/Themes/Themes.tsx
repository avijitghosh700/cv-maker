import React from "react";

import { useNavigate } from "react-router-dom";

import { Button } from "antd";

import "./Themes.scss";

const Themes = () => {
  const navigate = useNavigate();

  const print = () => navigate("/themes/one");

  return (
    <section className="Themes">
      <Button type={"primary"} onClick={print}>
        Print
      </Button>
    </section>
  );
};

export default Themes;
