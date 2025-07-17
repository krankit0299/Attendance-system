function markAttendance() {
  const name = document.getElementById("nameInput").value.trim();
  const status = document.getElementById("statusInput").value;
  if (name === "") {
    alert("Please enter a name!");
    return;
  }

  const table = document.getElementById("attendanceTable");
  const newRow = table.insertRow(-1);

  const nameCell = newRow.insertCell(0);
  const dateCell = newRow.insertCell(1);
  const statusCell = newRow.insertCell(2);

  const today = new Date();
  const dateStr = today.toLocaleDateString() + ' ' + today.toLocaleTimeString();

  nameCell.textContent = name;
  dateCell.textContent = dateStr;
  statusCell.textContent = status;

  document.getElementById("nameInput").value = "";

  saveToLocalStorage(name, dateStr, status);
}

function saveToLocalStorage(name, date, status) {
  const data = JSON.parse(localStorage.getItem("attendanceData")) || [];
  data.push({ name, date, status });
  localStorage.setItem("attendanceData", JSON.stringify(data));
}

function clearAttendance() {
  if (confirm("Are you sure you want to clear all records?")) {
    localStorage.removeItem("attendanceData");
    location.reload();
  }
}

function exportCSV() {
  const data = JSON.parse(localStorage.getItem("attendanceData")) || [];
  if (data.length === 0) {
    alert("No data to export!");
    return;
  }

  let csvContent = "data:text/csv;charset=utf-8,Name,Date,Status\n";
  data.forEach(record => {
    csvContent += `${record.name},${record.date},${record.status}\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "attendance_records.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

window.onload = () => {
  const table = document.getElementById("attendanceTable");
  const data = JSON.parse(localStorage.getItem("attendanceData")) || [];

  data.forEach(record => {
    const newRow = table.insertRow(-1);
    newRow.insertCell(0).textContent = record.name;
    newRow.insertCell(1).textContent = record.date;
    newRow.insertCell(2).textContent = record.status;
  });
};