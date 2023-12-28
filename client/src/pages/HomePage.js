import React, { useState, useEffect, useCallback } from "react";
import Layout from "../components/Layout/Layout";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  message,
  Table,
  DatePicker,
} from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Spinner from "../components/Layout/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selecteDate, setSelecteDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      render: (text, record) => {
        return(
        <div>
          <EditOutlined
            className="mx-2"
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined className="mx-2" onClick={() => {handleDelete(record)}} />
        </div>)
      },
    },
  ];

  const getAllTransaction = useCallback(async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const result = await axios.post("/api/v1/transactions/get-transaction", {
        userid: user._id,
        frequency,
        selecteDate,
        type,
      });
      setLoading(false);
      setAllTransaction(result.data);
      console.log(result.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error(
        "Error during getting the transaction Homepage getAll function"
      );
    }
  }, [frequency, selecteDate, type]);

  useEffect(() => {
    getAllTransaction();
  }, [getAllTransaction]);

  //form handling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if (editable) {
        await axios.post("/api/v1/transactions/edit-transaction", {
          payload:{
            ...values,
            userId:user._id,

          },
          transactionId: editable._id,
        });
        setLoading(false);
        message.success("Transaction Updated successfully");
      } else {
        await axios.post("/api/v1/transactions/add-transaction", {
          ...values,
          userid: user._id,
        });
        setLoading(false);
        message.success("Transaction Added successfully");
      }
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("Failed to Add Event. Please Retry!");
    }
  };


  // delete handler
  const handleDelete= async(record)=>{
    try {
      setLoading(true);
      await axios.post("/api/v1/transactions/delete-transaction",{transactionId:record._id}); 
      setLoading(false);
      message.success("Transaction Deleted succesfully")
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Unable to Delete the transaction!")
    }
  }


  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div className="frequency-filter">
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selecteDate}
              onChange={(values) => setSelecteDate(values)}
            />
          )}
        </div>

        <div className="type-filter">
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="income">INCOME</Select.Option>
            <Select.Option value="Expense">EXPENSE</Select.Option>
          </Select>
        </div>

        <div className="switch-icons">
          <UnorderedListOutlined
            className={`mx-2 ${
              viewData === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("table")}
          />
          <AreaChartOutlined
            className={`mx-2 ${
              viewData === "analytics" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("analytics")}
          />
        </div>
        <div>
          <Button type="primary" onClick={() => setShowModal(true)}>
            Add New
          </Button>
        </div>
      </div>
      <div className="content">
        {viewData === "table" ? (
          <Table columns={columns} dataSource={allTransaction} />
        ) : (
          <Analytics allTransaction={allTransaction} />
        )}
      </div>
      <Modal
        title={editable ? "Edit Transaction" : "Add Transaction"}
        open={showModal}
        footer={false}
        onCancel={() => setShowModal(false)}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editable}
        >
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="Expense">expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="share-market">Share Market</Select.Option>
              <Select.Option value="freelancing">Freelancing</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="outing">Outing</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="grocery">Grocery</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>

          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
