/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import CalendarComponent from "../../components/calendar/CalendarComponent ";
import ChartComponent from "../../components/chart/ChartComponent";
import Button from "@mui/material/Button";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import useApi from "../../hooks/useApi";

import "./Dashboard.css";

const Dashboard = () => {
  const { userInfo } = useContext(UserContext);
  const [DailyList, setDailyList] = useState([]);

  const api = useApi();

  useEffect(() => {
    const getDailyEntries = async () => {
      const response = await api.fetchData("dailyEntry/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-token": userInfo.token,
        },
      });

      return response;
    };

    getDailyEntries().then((data) => {
      setDailyList(data.list);
    });
  }, []);

  if (!userInfo.isLoggedin) {
    return <Navigate to='/signin' />;
  }

  return (
    <div className='dashboarContainer'>
      <CalendarComponent DailyList={DailyList} />
      <ChartComponent DailyList={DailyList} />
      <Link to={"/mood"}>
        <Button
          id='entryButton'
          variant='contained'
          size='large'
          startIcon={<CalendarTodayIcon />}>
          Entrada Diaria
        </Button>
      </Link>
      {api.error && <div>Se presentó un error: {api.error}</div>}
    </div>
  );
};

export default Dashboard;
