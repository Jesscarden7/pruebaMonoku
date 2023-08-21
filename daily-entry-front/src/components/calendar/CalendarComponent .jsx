/* eslint-disable react/prop-types */
import { useState } from "react";
import Calendar from "react-calendar";
import Card from "@mui/material/Card";
import "react-calendar/dist/Calendar.css";

import "./Calendar.css";

export default function CalendarComponent({ DailyList }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  let calendarData = {};

  DailyList.forEach((entry) => {
    calendarData[entry.date] = entry.emoji;
  });

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toISOString().split("T")[0];
      const value = calendarData[dateString];
      return <div style={{ fontSize: "20px" }}>{value}</div>;
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className='calendarContainer'>
      <Card
        sx={{
          borderRadius: "10px",
          width: "100%",
          height: "100%",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          padding: "15px",
        }}>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={tileContent}
        />
      </Card>
    </div>
  );
}
