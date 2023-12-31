import axios from "axios";

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const colors = [
  "#0088FE",
  "#0088FE",
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "red",
  "pink",
  "#0088FE",
  "#0088FE",
  "#0088FE",
  "#0088FE",
];

export const handleMonthChange = (e, setMonth) => {
  setMonth(parseInt(e.target.value, 10));
};

export const fetchInactiveData = async (setInactiveUsers, year) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/admin/analytics/api/user/status/${year}`
      );
      const apiData = response.data.Data;
      console.log(response);
      setInactiveUsers(apiData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
};
  
export const fetchData = async (setData, year) => {
  try {
    const response = await axios.get(
        `http://localhost:5000/admin/analytics/api/user/${year}`
      );
      const apiData = response.data.Data;
      setData(apiData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
};

export const fetchServiceMaterialData = async (setData) => {
  try {
    const response = await axios.get(
        `http://localhost:5000/admin/analytics/api/materials-count`
      );
      const apiData = response.data.Data;
      setData(apiData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
};

export const fetchRevenueData = async (setData, year) => {
  try {
    const response = await axios.get(
        `http://localhost:5000/admin/analytics/api/revenue/${year}`
      );
      const apiData = response.data.Data;
      setData(apiData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
}