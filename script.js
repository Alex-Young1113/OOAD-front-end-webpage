function addRow() {
  if (check() == true) {
    num = Number(document.getElementById("num").innerHTML);
    if (num == -1) {
      var table = document.getElementById("tb");
      var row = table.insertRow();
      var cell1 = row.insertCell();
      var cell2 = row.insertCell();
      var cell3 = row.insertCell();
      var cell4 = row.insertCell();
      var cell5 = row.insertCell();
      var cell6 = row.insertCell();
      var cell7 = row.insertCell();
      var cell8 = row.insertCell();
      var cell9 = row.insertCell();
      cell1.innerHTML = document.getElementById("cname").value;
      cell2.innerHTML = document.getElementById("ccode").value;
      var selectLang = document.querySelector('input[name="Language"]:checked');
      cell3.innerHTML = selectLang.defaultValue;
      cell4.innerHTML = document.getElementById("tname").value;
      cell5.innerHTML = document
        .querySelector('input[type="date"]')
        .value.replaceAll("-", "/");
      cell6.innerHTML = document.getElementById("courseTime").value;
      cell7.innerHTML = document.getElementById("locations").value;
      cell8.innerHTML = document.getElementById("du").value;
      cell9.innerHTML =
        "<button type='button' onclick='editRow(this)'>edit</button><br>\
      <button type='button' onclick='deleteRow(this)'>delete</button>";
      disableForm();
    } else {
      var row = document.getElementById("tb").getElementsByTagName("tr")[num];
      row.cells[0].innerHTML = document.getElementById("cname").value;
      row.cells[1].innerHTML = document.getElementById("ccode").value;
      var selectLang = document.querySelector('input[name="Language"]:checked');
      row.cells[2].innerHTML = selectLang.defaultValue;
      row.cells[3].innerHTML = document.getElementById("tname").value;
      row.cells[4].innerHTML = document
        .querySelector('input[type="date"]')
        .value.replaceAll("-", "/");
      row.cells[5].innerHTML = document.getElementById("courseTime").value;
      row.cells[6].innerHTML = document.getElementById("locations").value;
      row.cells[7].innerHTML = document.getElementById("du").value;
      row.cells[8].innerHTML =
        "<button type='button' onclick='editRow(this)'>edit</button><br>\
      <button type='button' onclick='deleteRow(this)'>delete</button>";
      disableForm();
    }
  }
}
function check() {
  courseName = document.getElementById("cname").value;
  courseCode = document.getElementById("ccode").value;
  var selectLang = document.querySelector('input[name="Language"]:checked');
  language = selectLang.defaultValue;
  time = document.getElementById("courseTime").value;
  teacherName = document.getElementById("tname").value;
  date = document
    .querySelector('input[type="date"]')
    .value.replaceAll("-", "/");
  courseTime = document.getElementById("courseTime").value;
  locations = document.getElementById("locations").value;
  duration = document.getElementById("du").value;
  let courseCodeRegex = new RegExp(/^[0-9a-zA-Z]+$/);
  num = Number(document.getElementById("num").innerHTML);
  if (!courseCodeRegex.test(courseCode)) {
    alert("invalid course code");
    return false;
  }
  let courseNameRegex = new RegExp(/^[a-zA-Z ]+$/);
  if (!courseNameRegex.test(courseName)) {
    alert("invalid course name");
    return false;
  }
  if (courseTime == "") {
    alert("invalid course time!");
    return false;
  }
  let teacherNameRegex = new RegExp(/^[a-zA-Z ]+$/);
  if (!teacherNameRegex.test(teacherName)) {
    alert("invalid teacher name");
    return false;
  }
  var d = new Date(date);
  var now = new Date();
  if (d < now) {
    alert("invalid date");
    return false;
  }
  table = document.getElementById("tb");
  var ri = 0;
  for (let row of table.rows) {
    if (
      ri != num &&
      row.cells[6].innerHTML == locations &&
      row.cells[5].innerHTML == time
    ) {
      alert(
        "Any two different courses cannot share one room at the same time!"
      );
      return false;
    }
    if (
      ri != num &&
      row.cells[3].innerHTML == teacherName &&
      row.cells[4].innerHTML == date
    ) {
      alert("Each teacher can take no more than one lecture per day!");
      return false;
    }
    if (
      (ri != num &&
        row.cells[0].innerHTML == courseName &&
        row.cells[1].innerHTML != courseCode) ||
      (ri != num &&
        row.cells[0].innerHTML != courseName &&
        row.cells[1].innerHTML == courseCode)
    ) {
      alert("Different courses should have different course codes!");
      return false;
    }
    if (
      ri != num &&
      row.cells[0].innerHTML == courseName &&
      row.cells[4].innerHTML == date
    ) {
      alert("One course is scheduled at most once a day!");
      return false;
    }
    ri = ri + 1;
  }
  let durationRegex = new RegExp(/^[0-9]+$/);
  if (!durationRegex.test(duration)) {
    alert("invalid duration");
    return false;
  }
  return true;
}
function editRow(o) {
  var row = o.parentNode.parentNode;
  document.getElementById("legend").innerHTML = "Edit course";
  var table = document.getElementById("tb");
  var i = 0;
  for (let rows of table.rows) {
    if (rows != row) {
      i = i + 1;
    }
  }
  var num = document.getElementById("num");
  num.innerHTML = i;
  var form = document.getElementById("addCoursePage");
  form.style.display = "block";
}
function deleteRow(o) {
  var p = o.parentNode.parentNode;
  p.parentNode.removeChild(p);
}
function enableForm() {
  document.getElementById("legend").innerHTML = "Add course";
  document.getElementById("cname").value = "";
  document.getElementById("ccode").value = "";
  document.getElementById("tname").value = "";
  document.getElementById("du").value = "";
  document.getElementById("num").innerHTML = "-1";
  document.getElementById("locations").value = "";
  document.getElementById("courseDate").value = "";
  document.getElementById("courseTime").value = "";
  document.getElementById("en").check = false;
  document.getElementById("cn").check = true;
  var form = document.getElementById("addCoursePage");
  form.style.display = "block";
}
function disableForm() {
  var form = document.getElementById("addCoursePage");
  form.style.display = "none";
}
