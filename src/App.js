import "./App.css";
import React, { useState } from "react";

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

  // const currentYear = 2024;

  const getMonths = (tasks, year) => {
    const months = new Set();
    tasks.forEach((task) => {
      const start = new Date(task.start_date);
      if (start.getFullYear() !== year) {
        return;
      }
      // console.log("[start]", start);
      months.add(start.getMonth());
    });
    return [...months];
  };

  const getTasksByMonth = (tasks, month) => {
    // Date.parse("01/01/2024");
    // console.log("[month]", month);
    // console.log("[tasks]", tasks);
    const currentTasks = tasks.filter((task) => {
      const start = new Date(task.start_date);
      // const end = new Date(task.end_date);
      return start.getMonth() === month;
    });

    currentTasks.sort(
      (a, b) => new Date(a.start_date) - new Date(b.start_date)
    );

    // console.log("[filtered tasks]", currentTasks);
    return currentTasks;
  };

  // function formatDate(inputDate, format) {
  //   if (!inputDate) return "";
  //   const padZero = (value) => (value < 10 ? `0${value}` : `${value}`);
  //   const parts = {
  //     yyyy: inputDate.getFullYear(),
  //     MM: padZero(inputDate.getMonth() + 1),
  //     dd: padZero(inputDate.getDate()),
  //     HH: padZero(inputDate.getHours()),
  //     hh: padZero(
  //       inputDate.getHours() > 12 ? inputDate.getHours() - 12 : inputDate.getHours()
  //     ),
  //     mm: padZero(inputDate.getMinutes()),
  //     ss: padZero(inputDate.getSeconds()),
  //     tt: inputDate.getHours() < 12 ? "AM" : "PM",
  //   };

  //   return format.replace(
  //     /yyyy|MM|dd|HH|hh|mm|ss|tt/g,
  //     (match) => parts[match]
  //   );
  // }

  // const convertToDate = (dateString) => {
  //    formatDate(new Date(dateString), "yyyy-MM-dd HH:mm:ss tt");
  //   // const options = { year: 'numeric', month: '2-digit', day: '2-digit' }; // Example format
  //   // Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  //   // date.toLocaleDateString('en-US', options)
  // };

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
    // Create a date object at the start of the month
    let date = new Date(year, month, 1);
    // While the month is the same, add the date to the array and increment the day
    while (date.getMonth() === month) {
      dates.push(new Date(date).getDate()); // Clone the date object to avoid mutations
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
    // console.log("[current tasks]", tasks);
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
    // Create a date object at the start of the month
    let currentDate = new Date(year, month, 1);
    // While the month is the same, add the date to the array and increment the day
    let taskIndex = 0;

    // const spanLogs = [];

    // console.log("[Task Name]", taskName, "[tasks]", tasks);

    while (currentDate.getMonth() === month) {
      let span = 1;
      let task = tasks[taskIndex];

      if (isDateFallsInTaskStartAndEndDates(currentDate, task)) {
        // console.log("Adding span for task");
        // console.log(
        //   "[currentDate]",
        //   currentDate,
        //   "[startDate]",
        //   startDate,
        //   "[endDate]",
        //   endDate
        // );
        span = getDatesDiffInDays(task.start_date, task.end_date);
        span = Math.min(span + 1, currentMonthDates.length);
        // console.log("[task]", task, "[span]", span);
        dateSpans.push(
          <td
            key={dateSpans.length}
            colSpan={span}
            style={{ backgroundColor: getColorByStatus(task.status) }}
          ></td>
        );
        taskIndex++;
        // spanLogs.push(span);
      } else {
        // spanLogs.push(1);
        dateSpans.push(<td key={dateSpans.length}></td>);
      }

      // console.log("[date]", currentDate, "[task]", task, "[span]", span);
      currentDate.setDate(currentDate.getDate() + span);
    }

    // console.log("[dateSpans]", dateSpans);
    // console.log("task", taskName, "[spanLogs]", spanLogs);
    return dateSpans;
  };

  const monthIndexNames = getMonthIndexNameMap();
  const [currentYear] = useState(2024);
  const months = getMonths(currentTasks, currentYear);
  // console.log("[months]", months);
  const [currentMonth, setCurrentMonth] = useState(months[0]);
  const [currentMonthDates, setCurrentMonthDates] = useState(() =>
    getAllDatesInMonth(currentYear, currentMonth)
  );
  const [currentMonthTasks, setCurrentMonthTasks] = useState(() =>
    getTasksByMonth(currentTasks, currentMonth)
  );
  const [currentMonthTaskNames, setCurrentMonthTaskNames] = useState(() =>
    getTaskNames(currentMonthTasks)
  );

  const handleMonthChange = (event) => {
    const month = +event.target.value;
    console.log("[month]", month);
    const datesInMonth = getAllDatesInMonth(currentYear, month);
    const filteredTasksByMonth = getTasksByMonth(currentTasks, month);
    const filteredTasks = getTaskNames(filteredTasksByMonth);

    // console.log("datesInMonth", datesInMonth,"[filteredTasksByMonth]", filteredTasksByMonth,"[filteredTasks]", filteredTasks);

    setCurrentMonth(month);
    setCurrentMonthDates(datesInMonth);
    setCurrentMonthTasks(filteredTasksByMonth);
    setCurrentMonthTaskNames(filteredTasks);
  };

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
