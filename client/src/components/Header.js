import React from 'react';
import { Row, Col } from 'reactstrap';

const Header = () => {
  return (
    <div id="page-header" className="mb-3">
      <Row>
        <Col md="6" sm="auto" className="text-center m-auto">
          <h1>Enjoy Our Blog</h1>
          <p>Kilim's 프로젝트 작업블로그 입니다.</p>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
