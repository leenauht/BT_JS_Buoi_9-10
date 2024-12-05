import Staff from "./staff.js";
import StaffList from "./staffList.js";
import { getElmID } from "./utils.js";
import Validation from "./validation.js";

const validation = new Validation();
const staffList = new StaffList();
renderStaffList(staffList.arr);

const getInfoStaffForm = () => {
  const account = getElmID("tknv").value;
  const name = getElmID("name").value;
  const email = getElmID("email").value;
  const password = getElmID("password").value;
  const workday = getElmID("datepicker").value;
  const basicSalary = getElmID("luongCB").value;
  const role = getElmID("chucvu").value;
  const workingHours = getElmID("gioLam").value;

  // Check validation
  let isValid = true;

  // staff acount
  isValid &=
    validation.checkEmpty(account, "tbTKNV", "Please input staff acount!") &&
    validation.checkCharacterString(
      account,
      "tbTKNV",
      "Account must contain only letters!"
    ) &&
    validation.checkLength(
      account,
      "tbTKNV",
      "Account from 4 to 6 characters!",
      4,
      6
    );

  // staff name
  isValid &=
    validation.checkEmpty(name, "tbTen", "Please input full name!") &&
    validation.checkCharacterString(
      name,
      "tbTen",
      "Name must contain only letters!"
    );

  // staff email
  isValid &=
    validation.checkEmpty(email, "tbEmail", "Please input email!") &&
    validation.checkEmail(email, "tbEmail", "Email must have a valid format!");

  // staff password
  isValid &=
    validation.checkEmpty(password, "tbMatKhau", "Please input password!") &&
    validation.checkLength(
      password,
      "tbMatKhau",
      "Password from 6 to 10 characters!",
      6,
      10
    ) &&
    validation.checkPassword(
      password,
      "tbMatKhau",
      "Password must contain at least 1 number, 1 uppercase letter, and 1 special character!"
    );

  // Staff workday
  isValid &=
    validation.checkEmpty(workday, "tbNgay", "Workday cannot be left blank!") &&
    validation.checkDate(workday, "tbNgay", "Invalid date format!");

  // Staff basicSalary
  isValid &=
    validation.checkEmpty(
      basicSalary,
      "tbLuongCB",
      "Please input basic salary!"
    ) &&
    validation.checkRangeNumber(
      basicSalary,
      "tbLuongCB",
      "The basic salary ranges from 1tr to 20tr VND!",
      1000000,
      20000000
    );

  // Staff role
  isValid &= validation.checkSelect(role, "tbChucVu", "Please choose role!");

  // Staff workingHours
  isValid &=
    validation.checkEmpty(
      workingHours,
      "tbGiolam",
      "Please input working hours!"
    ) &&
    validation.checkRangeNumber(
      workingHours,
      "tbGiolam",
      "Working hours per month range from 80 to 200 hours!",
      80,
      200
    );

  if (!isValid) return;

  return {
    account,
    name,
    email,
    password,
    workday,
    basicSalary,
    role,
    workingHours,
  };
};

const createStaff = () => {
  const staffInfo = getInfoStaffForm();
  if (!staffInfo) return;

  const {
    account,
    name,
    email,
    password,
    workday,
    basicSalary,
    role,
    workingHours,
  } = staffInfo;

  // Create new staff object from class Staff
  const staff = new Staff(
    account,
    name,
    email,
    password,
    workday,
    basicSalary,
    role,
    workingHours
  );

  return staff;
};

function renderStaffList(data) {
  let content = "";
  data.forEach((staff) => {
    const { account, name, email, workday, role, totalSalary, type, id } =
      staff;

    content += `
      <tr>
        <td>${account}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${workday}</td>
        <td>${role}</td>
        <td>${totalSalary}</td>
        <td>${type}</td>
        <td>
          <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="handleEditStaff('${id}')">Edit</button>
          <button class="btn btn-danger" onclick="handleDeleteStaff('${id}')">Delete</button>
        </td>
      </tr>
    `;
  });
  getElmID("tableDanhSach").innerHTML = content;
}

// handle delete staff
const handleDeleteStaff = (id) => {
  staffList.removeStaff(id);
  renderStaffList(staffList.arr);
  setLocalStorage();
};
window.handleDeleteStaff = handleDeleteStaff;

// handle edit staff
const handleEditStaff = (id) => {
  const staff = staffList.findStaff(id);
  // Edit header title
  getElmID("header-title").innerHTML = "Edit Staff";
  // Hide button add staff
  getElmID("btnThemNV").style.display = "none";
  // Show button update staff
  getElmID("btnCapNhat").style.display = "inline-block";
  if (staff) {
    getElmID("tknv").value = staff.account;
    getElmID("name").value = staff.name;
    getElmID("email").value = staff.email;
    getElmID("password").value = staff.password;
    getElmID("datepicker").value = staff.workday;
    getElmID("luongCB").value = staff.basicSalary;
    getElmID("chucvu").value = staff.role;
    getElmID("gioLam").value = staff.workingHours;
  }
  handleUpdate(staff);
};
window.handleEditStaff = handleEditStaff;

// Set Local Storage
const setLocalStorage = () => {
  const dataJSON = staffList.arr;
  // Convert dataJSON to string
  const dataString = JSON.stringify(dataJSON);
  // Save dataString to localStorage
  localStorage.setItem("STAFF_LIST", dataString);
};

// // Get Local Storage
// const getLocalStorage = () => {
//   const dataString = localStorage.getItem("STAFF_LIST");
//   if (!dataString) return;
//   // Convert dataString to JSON
//   const dataJSON = JSON.parse(dataString);
//   const staffArray = dataJSON?.map((item) => {
//     const {
//       account,
//       name,
//       email,
//       password,
//       workday,
//       basicSalary,
//       role,
//       workingHours,
//       id,
//     } = item;
//     const staff = new Staff(
//       account,
//       name,
//       email,
//       password,
//       workday,
//       basicSalary,
//       role,
//       workingHours,
//       id
//     );
//     return staff;
//   });
//   // Update staffList.arr
//   staffList.arr = staffArray;
//   // Render staff list
//   renderStaffList(staffList.arr);
// };
// getLocalStorage();

getElmID("btnThemNV").onclick = function () {
  // Get staff from form
  const staff = createStaff();

  if (!staff) return;

  // Add staff to staff list
  staffList.addStaff(staff);
  // Render staff list
  renderStaffList(staffList.arr);
  // Set local storage
  setLocalStorage();
  // Close modal
  getElmID("btnDong").click();
};

// Add staff
getElmID("btnThem").onclick = function () {
  handleResetValidation();
  // Edit header title
  getElmID("header-title").innerHTML = "Add Staff";
  // Hide button update staff
  getElmID("btnCapNhat").style.display = "none";
  // Show button add staff
  getElmID("btnThemNV").style.display = "inline-block";
  // reset value form
  getElmID("staffForm").reset();
};

const handleUpdate = function (staff) {
  // Update staff
  getElmID("btnCapNhat").onclick = function () {
    // Get staff from form
    const newInfoStaff = getInfoStaffForm();

    if (!newInfoStaff) return;

    staff.changeInfo(newInfoStaff);
    renderStaffList(staffList.arr);
    // Close modal
    getElmID("btnDong").click();
  };
};

getElmID("btnDong").onclick = function () {
  handleResetValidation();
};
const handleResetValidation = () => {
  const elmError = document.querySelectorAll("#staffForm .sp-thongbao");
  for (let i = 0; i < elmError.length; i++) {
    elmError[i].style.display = "none";
  }
};

/**
 * search staff
 */
getElmID("searchName").addEventListener("keyup", function () {
  const keyword = getElmID("searchName").value;
  const staffsSerach = staffList.searchStaff(keyword);
  if (keyword === "") {
    getElmID("tableDanhSach").classList.remove("noti");
    renderStaffList(staffsSerach);
  } else if (staffsSerach.length > 0) {
    getElmID("tableDanhSach").classList.remove("noti");
    renderStaffList(staffsSerach);
  } else {
    getElmID(
      "tableDanhSach"
    ).innerHTML = `Không tìm thấy nhân viên có loại "${keyword}"`;
    getElmID("tableDanhSach").classList.add("noti");
  }
});
