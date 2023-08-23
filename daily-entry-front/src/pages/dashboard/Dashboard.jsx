/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import CalendarComponent from "../../components/calendar/CalendarComponent ";
import ChartComponent from "../../components/chart/ChartComponent";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import useApi from "../../hooks/useApi";

import "./Dashboard.css";

const Dashboard = () => {
  const { userInfo } = useContext(UserContext);
  const [DailyList, setDailyList] = useState([]);
  const [trendSummary, setTrendSummary] = useState("");
  const [loading, setLoading] = useState(true);

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
      setTrendSummary(data.trendSummary);
      setLoading(false);
    });
  }, []);

  if (!userInfo.isLoggedin) {
    return <Navigate to='/signin' />;
  }

  return (
    <div className='dashboarContainer'>
      {loading ? (
        <div>
          <Typography variant='h6' style={{ color: "#fff" }}>
            Cargando datos...
          </Typography>
          <CircularProgress />
        </div>
      ) : (
        <>
          <CalendarComponent DailyList={DailyList} />
          <ChartComponent DailyList={DailyList} />
          {trendSummary.length > 0 && (
            <Card
              sx={{
                borderRadius: "10px",
                width: "100%",
                height: "100%",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "15px",
                fontSize: "20px",
              }}>
              <span className='trendSummary'>Resumen de Análisis</span>
              {trendSummary}
            </Card>
          )}

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
        </>
      )}
    </div>
  );
};

export default Dashboard;
