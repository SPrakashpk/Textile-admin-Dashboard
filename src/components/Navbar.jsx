import {
  Navbar,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import "./Navbar.scss";
import { FaSearch } from "react-icons/fa";

function AppNavbar() {
  return (
    <Navbar bg="light" expand="lg" fixed="top" className="custom-navbar px-4">
      <Container fluid>
        <Navbar.Brand href="#" className="fw-bold">
          .cloths
        </Navbar.Brand>

        <Form className="search-wrapper">
          <div style={{paddingLeft:"200px"}}>
            <FormControl
              type="search"
              placeholder="Search...."
              className="search-input"
            />
            <FaSearch className="search-icon" />
          </div>
        </Form>
        <Button style={{paddingLeft:"350px"}} variant="outline-light">
          <img src="./src/assets/Notification.svg" />
        </Button>
        <div className="vertical-line"></div>
        <img
          style={{ height: "50px", width: "50px" }}
          alt="Profile"
          src="./src/assets/MyPhotocircle.png"
        />
        <p>
          Prakash
          <br />
          Admin
        </p>
        <Button variant="outline-light">
          <img src="./src/assets/dropArrow.svg" />
        </Button>
      </Container>
    </Navbar>
  );
}
export default AppNavbar;
