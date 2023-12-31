import { TabTitle } from "../../../../utils/GeneralFunctions";
import axios from "axios";
import React, { useState, useEffect } from "react";
import LoadingComponent from "../../../../utils/LoadingComponent";
import "./Order.css";
import { Actions, OrdersTable } from "./components/Components";

function Orders() {
  TabTitle("Orders", false);
  const [orders, Setorders] = useState([]);
  const [filter, setFilter] = useState([]);
  const [UpdateStatus, setUpdateStatus] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/orders");

        if (Array.isArray(response.data)) {
          console.log("API response is an array:", response.data)
          Setorders(response.data);
          setFilter(response.data);
        } else {
          console.error("API response is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/updateStatus/${selectedOrder.orderID}`,
        {
          status: selectedStatus,
          uniqueNum: selectedOrder.uniqueNum,
          TotalAmount: selectedOrder.totalAMount,
          Service: selectedOrder.genServiceName,
          matName: selectedOrder.matName,
          matSize: selectedOrder.matSize,
          email: selectedOrder.userEmail,
          userName: selectedOrder.userName
        }
      );

      console.log("Status updated successfully", response.data.message);
      setUpdateStatus(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleUpdatePopup = (order) => {
    setUpdateStatus(true);
    setSelectedOrder(order);
  };

  const handleUpdatePopupClose = () => {
    setUpdateStatus(false);
    setSelectedOrder(null);
    setSelectedStatus("");
  };

  if (loading) {
    return <LoadingComponent loading={loading} />;
  }

  return (
    <div className="w-full h-[90%] flex flex-col gap-2">
      <header className="flex flex-col gap ml-5 h-[10%] text-white">
        <div className="flex items-center gap-5 w-[90%]">
          <h1 className="text-left">Orders</h1>
        </div>
        <p className="text-left">
          This component will allow the admin to see orders made by the users.
          Here they can also update the status of the order.
        </p>
      </header>
      <Actions data={orders} setFilter={setFilter}/>
      <OrdersTable orders={filter} handleUpdatePopup={handleUpdatePopup} />
      {UpdateStatus && selectedOrder && (
        <div className="popup-container">
          <div className="popup-content">
            <form onSubmit={handleSubmit}>
              <label htmlFor="status">Update Status:</label>
              <select
                id="status"
                name="status"
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                <option value="">Select Status</option>
                <option value="pending">pending</option>
                <option value="on-going">on-going</option>
                <option value="completed">completed</option>
              </select>
              <button className="submit-button" type="submit">
                Update
              </button>
            </form>
            <button className="close-button" onClick={handleUpdatePopupClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
