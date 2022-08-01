import React from "react";

import { Link, useNavigate } from "react-router-dom";

import { Button, Card, Col, Row, Typography } from "antd";

import "./Themes.scss";

const { Meta } = Card;
const { Title } = Typography;

const Themes = () => {
  return (
    <section className="Themes">
      <div className="Themes__heading mb-3">
        <Title level={4} className="text-center fw-normal m-0">
          Select a theme
        </Title>
      </div>

      <Row gutter={16}>
        <Col span={24} sm={8} md={6}>
          <Link to={"/themes/one"}>
            <Card className="Themes__card">
              <Meta
                className="Themes__card--caption"
                style={{ textAlign: "center" }}
                title="Theme One"
              />
            </Card>
          </Link>
        </Col>
      </Row>
    </section>
  );
};

export default Themes;
