import { createId } from "./utils.js";

class Staff {
  constructor(
    account,
    name,
    email,
    password,
    workday,
    basicSalary,
    role,
    workingHours,
    id
  ) {
    this.account = account;
    this.name = name;
    this.email = email;
    this.password = password;
    this.workday = workday;
    this.basicSalary = basicSalary;
    this.role = role;
    this.workingHours = workingHours;
    this.totalSalary = 0;
    this.type = "";
    this.id = id ? id : createId();
    this.calcTotalSalary();
    this.employeeClassification();
  }

  calcTotalSalary() {
    if (this.role === "Sếp") {
      this.totalSalary = this.basicSalary * 3;
    } else if (this.role === "Trưởng phòng") {
      this.totalSalary = this.basicSalary * 2;
    } else if (this.role === "Nhân viên") {
      this.totalSalary = this.basicSalary;
    }
  }

  employeeClassification() {
    const workingHours = this.workingHours;
    if (workingHours < 160) {
      this.type = "Trung bình";
    } else if (workingHours >= 160 && workingHours < 176) {
      this.type = "Khá";
    } else if (workingHours >= 176 && workingHours < 192) {
      this.type = "Giỏi";
    } else if (workingHours >= 192) {
      this.type = "Xuất sắc";
    }
  }

  changeInfo(newStaff) {
    this.account = newStaff.account;
    this.name = newStaff.name;
    this.email = newStaff.email;
    this.password = newStaff.password;
    this.workday = newStaff.workday;
    this.basicSalary = newStaff.basicSalary;
    this.role = newStaff.role;
    this.workingHours = newStaff.workingHours;
    this.calcTotalSalary();
    this.employeeClassification();
  }
}

export default Staff;
