import Staff from "./staff.js";

class StaffList {
  constructor() {
    this.arr = this.getLocalStorage() ? this.getLocalStorage() : [];
  }

  // Get Local Storage
  getLocalStorage = () => {
    const dataString = localStorage.getItem("STAFF_LIST");
    if (!dataString) return;
    // Convert dataString to JSON
    const dataJSON = JSON.parse(dataString);

    const dataInit = [];

    for (let index = 0; index < dataJSON.length; index++) {
      const element = dataJSON[index];
      const {
        account,
        name,
        email,
        password,
        workday,
        basicSalary,
        role,
        workingHours,
        id,
      } = element;
      const staff = new Staff(
        account,
        name,
        email,
        password,
        workday,
        basicSalary,
        role,
        workingHours,
        id
      );
      dataInit.push(staff);
    }

    return dataInit;
  };

  addStaff(staff) {
    this.arr.push(staff);
  }

  // getStaffFromId(id) {
  //   return this.arr.find((staff) => staff.id === id);
  // }

  /**
   * 0. Tạo biến index = -1
   * 1. Duyệt qua từng phần tử trong mảng arr
   *  1.1 chuyển id sang kiểu dữ liệu number
   *  1.2 Nếu id (user xóa) trùng với i
   *    => Đúng: gán i cho index
   *    => break;
   *  2. Trả index
   */

  findIndexStaff(id) {
    let index = -1;
    for (let i = 0; i < this.arr.length; i++) {
      const staff = this.arr[i];
      if (id === staff.id) {
        index = i;
        break;
      }
    }
    return index;
  }
  s;
  removeStaff(id) {
    // Tìm vị trí của staff cần xóa
    const index = this.findIndexStaff(id);
    // Xóa staff khỏi mảng
    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  }

  findStaff(id) {
    // Tìm vị trí của staff cần edit
    const index = this.findIndexStaff(id);
    // Lấy staff từ vị trí tìm thấy trong mảng
    if (index !== -1) {
      // Trả về staff
      return this.arr[index];
    }
    return null;
  }

  searchStaff(keyword) {
    /**
     * 0. Tao mảng result = []
     * 1. Duyệt qua từng phần tử trong mảng arr
     *    1.1. staff = arr[i]
     *    1.2. Nếu staff.name trùng với keyword
     *        => Đúng: thêm food vào result
     * 2. trả về result
     */
    let result = [];
    for (let i = 0; i < this.arr.length; i++) {
      // console.log(type);

      const staff = this.arr[i];
      // chuyển keyword và staff.type về chữ thường
      const keywordLowerCase = keyword.toLowerCase();
      const staffNameLowerCase = staff.type.toLowerCase();
      if (staffNameLowerCase.indexOf(keywordLowerCase) !== -1) {
        result.push(staff);
      }
    }
    return result;
  }
}
export default StaffList;
