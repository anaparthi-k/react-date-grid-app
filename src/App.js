import "./style.css";
import React, { useEffect, useState } from "react";

function App() {
  const currentTasks = [
    {
      title: "Task-1",
      Description: "The docusign signing sequence is sending wrong",
      start_date: "01/01/2024",
      end_date: "01/03/2024",
      status: "1",
      statusText: "Not started",
    },
    {
      title: "Task-2",
      Description: "Adding double charges",
      start_date: "01/03/2024",
      end_date: "01/06/2024",
      status: "2",
      statusText: "In Progress",
    },
    {
      title: "Task-3",
      Description: "In Global Customer transaction Tab agreement redirection",
      start_date: "01/06/2024",
      end_date: "01/10/2024",
      status: "3",
      statusText: "Completed",
    },
    {
      title: "Task-4",
      Description: "SSN Number encryption",
      start_date: "01/10/2024",
      end_date: "01/15/2024",
      status: "1",
      statusText: "Not started",
    },
    {
      title: "Task-5",
      Description: "Negative alert is showing",
      start_date: "01/15/2024",
      end_date: "01/18/2024",
      status: "3",
      statusText: "Completed",
    },
    {
      title: "Task-6",
      Description: "Forfit Invoice is not created",
      start_date: "01/19/2024",
      end_date: "01/21/2024",
      status: "2",
      statusText: "In Progress",
    },
    {
      title: "Task-7",
      Description: "Nubs resident resale",
      start_date: "01/21/2024",
      end_date: "01/25/2024",
    },
    {
      title: "Task-8",
      Description: "Screening Reports Restriction",
      start_date: "01/25/2024",
      end_date: "01/28/2024",
      status: "1",
      statusText: "Not started",
    },
    {
      title: "Task-9",
      Description: "Screening Reports Restriction",
      start_date: "01/03/2024",
      end_date: "01/05/2024",
      status: "1",
      statusText: "Not started",
    },
    {
      title: "Task-9",
      Description: "Screening Reports Restriction",
      start_date: "01/12/2024",
      end_date: "01/15/2024",
      status: "3",
      statusText: "Not started",
    },
    {
      title: "Task-1",
      Description: "Screening Reports Restriction",
      start_date: "02/12/2024",
      end_date: "02/15/2024",
      status: "1",
      statusText: "Not started",
    },
    {
      title: "Task-2",
      Description: "Screening Reports Restriction",
      start_date: "02/14/2024",
      end_date: "02/16/2024",
      status: "2",
      statusText: "Not started",
    },
    {
      title: "Task-1",
      Description: "Screening Reports Restriction",
      start_date: "03/06/2024",
      end_date: "03/16/2024",
      status: "3",
      statusText: "Not started",
    },
    {
      title: "Task-2",
      Description: "Screening Reports Restriction",
      start_date: "03/06/2024",
      end_date: "03/10/2024",
      status: "3",
      statusText: "Not started",
    },
    {
      title: "Task-1",
      Description: "Screening Reports Restriction",
      start_date: "03/21/2024",
      end_date: "03/26/2024",
      status: "3",
      statusText: "Not started",
    },
    {
      title: "Task-2",
      Description: "Screening Reports Restriction",
      start_date: "03/01/2024",
      end_date: "03/05/2024",
      status: "1",
      statusText: "Not started",
    },
  ];

  const getYearMonths = (tasks) => {
    let year = 0;
    const months = new Set();
    tasks.forEach((task) => {
      const start = new Date(task.start_date);
      year = start.getFullYear()
      months.add(start.getMonth());
    });
    return {year, months:[...months]};
  };

  const getTasksByMonth = (tasks, month) => {
    const currentTasks = tasks.filter((task) => {
      const start = new Date(task.start_date);
      return start.getMonth() === month;
    });

    currentTasks.sort(
      (a, b) => new Date(a.start_date) - new Date(b.start_date)
    );
    return currentTasks;
  };

  // Write a method get all dates in a month

  const getDatesDiffInDays = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const isDateFallsInTaskStartAndEndDates = (date, task) => {
    if (!task) {
      return false;
    }
    const startDate = new Date(task.start_date);
    const endDate = new Date(task.end_date);
    return date >= startDate && date <= endDate;
  };

  const getAllDatesInMonth = (year, month) => {
    let dates = [];
    let date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      dates.push(new Date(date).getDate());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  function getMonthIndexNameMap() {
    const monthIndexNames = new Map();
    for (let i = 0; i < 12; i++) {
      monthIndexNames.set(
        i,
        new Date(0, i).toLocaleString("default", { month: "long" })
      );
    }
    return monthIndexNames;
  }

  const getColorByStatus = (status) => {
    switch (status) {
      case "1":
        return "red";
      case "2":
        return "orange";
      case "3":
        return "green";
      default:
        return "black";
    }
  };

  const getTaskNames = (tasks) => {
    const taskNames = new Set();
    tasks.forEach((task) => {
      taskNames.add(task.title);
    });
    
    const names= [...taskNames];
    names.sort();
    return names;
  };

  const getTaskSpanOfDay = (taskName) => {
    const tasks =
      currentMonthTasks.filter((task) => task.title === taskName) || [];
    const year = currentYear;
    const month = currentMonth;

    let dateSpans = [];
    let currentDate = new Date(year, month, 1);
    let taskIndex = 0;
    while (currentDate.getMonth() === month) {
      let span = 1;
      let task = tasks[taskIndex];

      if (isDateFallsInTaskStartAndEndDates(currentDate, task)) {
        span = getDatesDiffInDays(task.start_date, task.end_date);
        span = Math.min(span + 1, currentMonthDates.length);
        dateSpans.push(
          <td
            key={dateSpans.length}
            colSpan={span}
            style={{ backgroundColor: getColorByStatus(task.status) }}
          ></td>
        );
        taskIndex++;
      } else {
        dateSpans.push(<td key={dateSpans.length}></td>);
      }

      currentDate.setDate(currentDate.getDate() + span);
    }

    return dateSpans;
  };

  const monthIndexNames = getMonthIndexNameMap();
  const yearOfMonths = getYearMonths(currentTasks);
  const [currentYear] = useState(yearOfMonths.year);
  const months = yearOfMonths.months;
  const [currentMonth, setCurrentMonth] = useState(months[0]);
  const [currentMonthDates, setCurrentMonthDates] = useState([]);
  const [currentMonthTasks, setCurrentMonthTasks] = useState([]);
  const [currentMonthTaskNames, setCurrentMonthTaskNames] = useState([]);

  const handleMonthChange = (event) => {
    const month = +event.target.value;
    const datesInMonth = getAllDatesInMonth(currentYear, month);
    const filteredTasksByMonth = getTasksByMonth(currentTasks, month);
    const filteredTasks = getTaskNames(filteredTasksByMonth);
    setCurrentMonth(month);
    setCurrentMonthDates(datesInMonth);
    setCurrentMonthTasks(filteredTasksByMonth);
    setCurrentMonthTaskNames(filteredTasks);
  };

  useEffect(()=>{
    handleMonthChange({target:{value:currentMonth}})
  },[])
  
  return (
    <div className="App">
      <h1>Grid App</h1>
      <table border={1} className="App-table">
        <thead>
          <tr>
            <th className="App-task-header"></th>
            <th className="App-task-desc"></th>
            <th className="App-task-dates" colSpan={currentMonthDates.length}>
              <select value={currentMonth} onChange={handleMonthChange}>
                {months.map((month, index) => (
                  <option key={index} value={month}>
                    {monthIndexNames.get(index)}
                  </option>
                ))}
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            {currentMonthDates.map((date, index) => (
              <td key={index}>{date}</td>
            ))}
          </tr>
          {currentMonthTaskNames.map((taskName, taskIndex) => {
            return (
              <tr key={taskIndex}>
                <td>{taskName}</td>
                <td></td>
                {getTaskSpanOfDay(taskName).map((task) => task)}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
