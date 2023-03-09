import './App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Placeholder from 'react-bootstrap/Placeholder';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import {options, typeOfOptions, expiryDate, strikePrice, tablecol, testTableData} from './data'
import Form from 'react-bootstrap/Form';



function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Traders</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
        
      </Navbar>
      <Placeholder as="p" animation="wave">
        <Placeholder xs={12} />
      </Placeholder>
      <br />
    </>
  );
}



function App() {
  const [option, setOption] = useState(options);
  const [types, setType] = useState(typeOfOptions);
  const [expiryDates, setExpiryDate] = useState(expiryDate);
  const [strikePrices, setStrikePrices] = useState(strikePrice);
  const [tablecols, setTableCols] = useState(tablecol);
  const [tableData, setTableData] = useState([]);

  const [data, setData] = useState("BankNifty");
  const [currStrikePrice, setCurrStrikePrice] = useState("ATM");
  const [selectedType, setSelectedType] = useState("CE");
  const [selectedExpiryDates, setSelectedExpiryDates] = useState("2023-03-09");
  const [selectedStrikePrices, setSelectedStrikePrices] = useState("ITM7");

  // useEffect(() => {
  //   fetch(`https://dummyjson.com/products`)
  //     .then((response) => response.json())
  //     .then((actualData) => console.log(actualData))
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, []);
  function computeTableData(){
    if(data && selectedType && selectedExpiryDates && selectedStrikePrices){
      // let sign = ''
      // let val = `${(selectedStrikePrices-currStrikePrice)/100}`; 
      // if(val == 0)
      //   val = ""
      // if(currStrikePrice < selectedStrikePrices) sign = ' +'
      let arr = [];
      let entry = {
        "id":"1",
        "Instrument": "CE",
        "Exp_Date": selectedExpiryDates,
        "Action": "Sell",
        "Qty":"25",
        "Strike_Type":selectedStrikePrices
      };
      arr.push(entry);
      let entry1 = JSON.parse(JSON.stringify(entry));
      entry1["Instrument"] = "PE";
      entry1["id"] = "2";
      arr.push(entry1);
      setTableData(arr);
    }
  }

  function HorizontalButton() {

    return (
      <>
        {/* Nifty, Bank Nifty */}
      <Form.Select onChange={(e) => {setData(e.target.value)}}>
        {option.map((opt) => (
          <option>{opt.name}</option>
        ))}
      </Form.Select>
    
      {/* Type of Option */}
      <Form.Select onChange={(e) => {setSelectedType(e.target.value)}}>
        {types.map((type) => (
          <option>{type.name}</option>
        ))}
      </Form.Select>
    
      {/* Expiry Date */}
      <Form.Select onChange={(e) => {setSelectedExpiryDates(e.target.value)}}>
        {expiryDates.map((Date) => (
          <option>{Date.date}</option>
        ))}
      </Form.Select>
    
      {/* Strike Price Selector */}
      <Form.Select onChange={(e) => {setSelectedStrikePrices(e.target.value)}}>
        {strikePrices.map((strikePrice) => (
          <option>{strikePrice.price}</option>
        ))}
      </Form.Select>
      </>
    );
  }
  const DisplayData=tableData.map(
        (info)=>{
            return(
                <tr>
                    <td>{info.id}</td>
                    <td>{info.Instrument}</td>
                    <td>{info.Exp_Date}</td>
                    <td>{info.Action}</td>
                    <td>{info.Qty}</td>
                    <td>{info.Strike_Type}</td>
                </tr>
            )
        }
    )
  function showTable(){
    return(
      <>
      <Row>
        <Col>
        <div class="d-flex justify-content-center">
            <Button onClick={()=>(computeTableData())}>Add</Button>
        </div>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col>
          <Table striped>
            <thead>
              <tr>
                {tablecols.map((col)=>(
                  <th>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DisplayData}
            </tbody>
          </Table>
        </Col>
      </Row>
      </>
    )
  }
  return (
    <Container>
      <Row>
        <Col>
          {ColorSchemesExample()}
        </Col>
      </Row>
      <Row>
        <Col>
          <div class="d-flex justify-content-center">
            <h1>STRATEGY PARAMETERS</h1>
          </div>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col>
          <div class="d-flex justify-content-center">
            {HorizontalButton()}
          </div>
        </Col>
      </Row>
      <br></br>
      {showTable()}
    </Container>
  );
}

export default App;
