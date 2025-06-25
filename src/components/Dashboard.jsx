import {
  Row,
  Col,
  Card,
  Container,
  Dropdown,
  Table,
  CardTitle,
} from "react-bootstrap";
import "./Dashboard.scss";
import Barchart from "./Radialbarchart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
   maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
  },
  tension: 0.3,
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 2",
      data: labels.map(() => Math.floor(Math.random() * 2001) - 1000),
      borderColor: "#005226",
      backgroundColor: "#FFFFFF",
    },
  ],
};

const orderData = [
  {
    name: "Praveen",
    location: "Coimbatore",
    mobile: "9935267328",
    product: "Pants",
  },
  {
    name: "PIA",
    location: "Tirunelveli",
    mobile: "7694256789",
    product: "Tops",
  },
  {
    name: "Angel Chen",
    location: "Chennai",
    mobile: "4206972829",
    product: "Sarees",
  },
  { name: "Poise", location: "Madurai", mobile: "9485768213", product: "Arts" },
  {
    name: "Abisha",
    location: "Madurai",
    mobile: "4206972829",
    product: "Sarees",
  },
];

const lowstockData = [
  {
    code: "26767",
    product: "Saree",
    quantity: "9",
  },
  {
    code: "26766",
    product: "Leggins",
    quantity: "9",
  },
  {
    code: "26765",
    product: "Tshirt",
    quantity: "9",
  },
  {
    code: "26764",
    product: "Hand-kercheif",
    quantity: "9",
  },
  {
    code: "26763",
    product: "Nighty",
    quantity: "9",
  },
];

const expenseData = [
  {
    date: "10/11/2025",
    category: "plumbing",
    subCategory: "Taps, Pipes, Joints",
    amount: "Rs.10,000",
    status: "Paid",
  },
  {
    date: "10/11/2025",
    category: "plumbing",
    subCategory: "Taps, Pipes, Joints",
    amount: "Rs.10,000",
    status: "unpaid",
  },
  {
    date: "10/11/2025",
    category: "plumbing",
    subCategory: "Taps, Pipes, Joints",
    amount: "Rs.10,000",
    status: "Paid",
  },
  {
    date: "10/11/2025",
    category: "plumbing",
    subCategory: "Taps, Pipes, Joints",
    amount: "Rs.10,000",
    status: "unpaid",
  },
  {
    date: "10/11/2025",
    category: "plumbing",
    subCategory: "Taps, Pipes, Joints",
    amount: "Rs.10,000",
    status: "Paid",
  },
];

export default function Dashboard() {
  return (
    <div className="my-3">
      <Container className="mb-4">
        <Row>
          <Col>
            <Card bg="light" className="row-1 app-border">
              <Row>
                <Col xs={4}>
                  <Card.Img src="./src/assets/shirt.svg" />
                </Col>
                <Col xs={8}>
                  <Card.Text className="num">800</Card.Text>
                  <Card.Text className="text">Mens</Card.Text>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col>
            <Card bg="light" className="sm-3 row-1 app-border">
              <Row>
                <Col xs={4}>
                  <Card.Img src="./src/assets/womensdress.svg" />
                </Col>
                <Col xs={8}>
                  <Card.Text className="num">600</Card.Text>
                  <Card.Text className="text">Womens</Card.Text>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col>
            <Card bg="light" className="sm-3 row-1 app-border">
              <Row>
                <Col xs={4}>
                  <Card.Img src="./src/assets/kidsdress.svg" />
                </Col>
                <Col xs={8}>
                  <Card.Text className="num">400</Card.Text>
                  <Card.Text className="text">Kids</Card.Text>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col>
            <Card bg="light" className="sm-3 row-1 app-border">
              <Row>
                <Col xs={4}>
                  <Card.Img src="./src/assets/accessories.svg" />
                </Col>
                <Col xs={8}>
                  <Card.Text className="num">250</Card.Text>
                  <Card.Text className="text">Accessories</Card.Text>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card bg="light" className="row-2 app-border">
              <Row>
                <Col xs={10}>
                  <CardTitle className="card-header">Sale's Graph</CardTitle>
                </Col>
                <Col xs={2}>
                  <button className="app-btn action-btn">View All</button>
                </Col>
              </Row>
              <div style={{height: '200%' }}>
              <Line options={options} data={data} />
              </div>
            </Card>
          </Col>
          <Col>
            <Card bg="light" className="sm-3 row-2 app-border">
              <Row>
                <Col xs={10}>
                  <CardTitle className="card-header">Revenue</CardTitle>
                </Col>
                <Col xs={2}>
                  <button className="app-btn action-btn">View All</button>
                </Col>
              </Row>{" "}
              <div className="bar-chart">
                <Barchart />
              </div>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col sm={8}>
            <Card bg="light" className="row-3 app-border">
              <Row>
                <Col xs={10}>
                  <Card.Title className="card-header">Orders</Card.Title>
                </Col>
                <Col xs={2}>
                  <button className="app-btn action-btn">View All</button>
                </Col>
              </Row>
              <Row>
                <Table className="app-data-table" hover size="sm">
                  <thead>
                    <tr>
                      <th>Sl. no.</th>
                      <th>Name</th>
                      <th>Location</th>
                      <th>Mobile Number</th>
                      <th>Product</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData.map((order, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{order.name}</td>
                        <td>{order.location}</td>
                        <td>{order.mobile}</td>
                        <td>{order.product}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Row>
            </Card>
          </Col>
          <Col sm={4}>
            <Card bg="light" className="sm-3 row-3 app-border">
              <Card.Title className="card-header">Low Stock</Card.Title>
              <Row>
                <Table className="app-data-table" hover size="sm">
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Product</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowstockData.map((stock, index) => (
                      <tr key={index}>
                        <td>{stock.code}</td>
                        <td>{stock.product}</td>
                        <td>{stock.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Row>{" "}
            </Card>
          </Col>
        </Row>

        <Row className="pb-3">
          <Col>
            <Card bg="light" className="sm-3 row-4 app-border">
              <Row>
                <Col xs={10}>
                  <Card.Title className="card-header">Orders</Card.Title>
                </Col>
                <Col xs={2}>
                  <button className="app-btn action-btn">View All</button>
                </Col>
              </Row>
              <Row>
                <Table className="app-data-table" hover size="sm">
                  <thead>
                    <tr>
                      <th>Sl. no.</th>
                      <th>Date</th>
                      <th>Category</th>
                      <th> Sub Category</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenseData.map((expense, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{expense.date}</td>
                        <td>{expense.category}</td>
                        <td>{expense.subCategory}</td>
                        <td>{expense.amount}</td>
                        <td
                          className={
                            expense.status === "Paid"
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          {expense.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
