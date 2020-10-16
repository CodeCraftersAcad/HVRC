import React from 'react';
import {Container, Row, Col} from "react-bootstrap";

const Footer = () => {
    return (
        <footer>
          <Container>
              <Row>
                  <Col className='text-center py-3'>
                      Copyright &copy; High Voltage R/C <small>Built by: <a href="http://www.codecraftersacad.com" target='_blank' rel="noopener noreferrer">Code Crafters Acad</a></small>
                  </Col>
              </Row>
          </Container>
        </footer>
    );
};

export default Footer;