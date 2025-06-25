import { Navbar, Nav } from "react-bootstrap";
import "./Sidebar.scss";
import { NavLink } from "react-router-dom";

const menu = [
  {
    label: "Dashboard",
    icon: "dashboard",
    route: "/dashboard",
  },
  {
    label: "Upload Products",
    icon: "shopping_bag",
    route: "/upload-products",
  },
  {
    label: "Orders",
    icon: "package_2",
    route: "/orders",
  },
  {
    label: "Delivery Tracking",
    icon: "local_shipping",
    route: "/delivery-tracking",
  },
  {
    label: "Stocks",
    icon: "inventory",
    route: "/stocks",
  },
  {
    label: "Expenses",
    icon: "account_balance",
    route: "/expense",
  },
  {
    label: "Reviews & Ratings",
    icon: "reviews",
    route: "/reviews&ratings",
  },
  {
    label: "Advertisements",
    icon: "campaign",
    route: "/advertisement",
  },
];

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Nav className="flex-column">
        {menu.map((item) => (
          <NavLink
            to={item.route}
            key={item.route}
            className={({ isActive }) =>
              `nav-link d-flex align-items-center ${
                isActive ? "active-menu" : ""
              }`
            }
          >
            <span className="nav-icon material-symbols-outlined">
              {item.icon}
            </span>
            {item.label}
          </NavLink>
        ))}

        {/* <Nav.Link href="/upload">Upload Products</Nav.Link>
        <Nav.Link href="/orders">Orders</Nav.Link>
        <Nav.Link href="/tracking">Delivery Tracking</Nav.Link>
        <Nav.Link href="/stocks">Stocks</Nav.Link>
        <Nav.Link href="/expense">Expense</Nav.Link>
        <Nav.Link href="/reviews">Reviews & Ratings</Nav.Link>
        <Nav.Link href="/ads">Advertisement</Nav.Link> */}
      </Nav>
    </div>
  );
}
