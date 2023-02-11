import React, { useState, useEffect } from "react";
import { Button, Card, Modal, Table } from "react-bootstrap";
import DataTable, { createTheme } from "react-data-table-component";
import "./style.css";

function Product() {
  const [productsList, setProductsList] = useState([]);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [filterdProductList, setFilterdProductList] = useState([]);
  const [itemName, setItemName] = useState();
  const [image, setImage] = useState();
  const [discription, setDiscription] = useState();
  const [dropdownList, setDropdownList] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const result = productsList.filter((product) => {
      return product.name.toLowerCase().match(search.toLowerCase());
    });
    setFilterdProductList(result);
    if (search !== "") {
      setDropdownList(result);
    }else {
      setDropdownList([])
    }
  }, [search]);

  const getData = async () => {
    let categories = await fetch("https://nick.wpweb.co.in/api/categories.php");
    categories = categories.json().then((res) => {
      setProductsList(res);
      setFilterdProductList(res);
    });
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: false,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => (
        <img className="mt-1 mb 1" src={row.image} alt="MDN logo" width={100} />
      ),
      sortable: false,
    },
    {
      name: "Action",
      selector: (row) => (
        <Button
          onClick={() => {
            handleShow();
            getDetails(row);
          }}
        >
          View
        </Button>
      ),
      sortable: false,
    },
  ];
  const getDetails = (row) => {
    setItemName(row.name);
    setImage(row.image);
    setDiscription(row.description);
  };

  const customStyles = {
    rows: {
      style: {
        minHeight: "100px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  createTheme(
    "solarized",
    {
      text: {
        primary: "#268bd2",
        secondary: "#2aa198",
      },
      background: {
        default: "#002b36",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "#073642",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

  return (
    <div className="product">
      <DataTable
        title="Product List"
        columns={columns}
        data={filterdProductList}
        defaultSortFieldId
        pagination={10}
        // fixedHeaderScrollHeight="450"
        highlightOnHover
        subHeader
        customStyles={customStyles}
        theme="solarized"
        subHeaderComponent={
          <div className="search-container">
            <div className=" search-input">
              <input
                type="text"
                placeholder="Serch Product"
                className="w-250 form-control"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="dropdown">
              {dropdownList.map((item) => (
                <div className="dropdown-row">{item.name}</div>
              ))}
            </div>
          </div>
        }
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Item Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Img variant="top" src={image} style={{ width: "100%" }} />
            <Card.Body>
              <Card.Text className="text-center">
                <p>Name: {itemName}</p>
                <p>Discription: {discription}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Product;
