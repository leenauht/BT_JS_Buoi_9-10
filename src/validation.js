import { getElmID } from "./utils.js";

class Validation {
  checkEmpty(value, spanId, mess) {
    if (value === "") {
      getElmID(spanId).innerHTML = mess;
      getElmID(spanId).style.display = "block";
      return false;
    }
    getElmID(spanId).innerHTML = "";
    getElmID(spanId).style.display = "none";
    return true;
  }

  checkSelect(value, spanId, mess) {
    if (value === "Chọn chức vụ") {
      getElmID(spanId).innerHTML = mess;
      getElmID(spanId).style.display = "block";
      return false;
    }
    getElmID(spanId).innerHTML = "";
    getElmID(spanId).style.display = "none";
    return true;
  }

  /**
   * match xài với string và regex(/^[A-Za-z]+$/)
   * test xài với regex(/^[A-Za-z]+$/)
   */
  checkCharacterString(value, spanId, mess) {
    const letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";

    if (value.match(letter)) {
      getElmID(spanId).innerHTML = "";
      getElmID(spanId).style.display = "none";
      return true;
    }
    getElmID(spanId).innerHTML = mess;
    getElmID(spanId).style.display = "block";
    return false;
  }

  checkCharacterNumber(value, spanId, mess) {
    const regexNumber = /^[0-9]+$/;
    if (regexNumber.test(value)) {
      getElmID(spanId).innerHTML = "";
      getElmID(spanId).style.display = "none";
      return true;
    }
    getElmID(spanId).innerHTML = mess;
    getElmID(spanId).style.display = "block";
    return false;
  }

  checkLength(value, spanId, mess, min, max) {
    if (value.length >= min && value.length <= max) {
      getElmID(spanId).innerHTML = "";
      getElmID(spanId).style.display = "none";
      return true;
    }
    getElmID(spanId).innerHTML = mess;
    getElmID(spanId).style.display = "block";
    return false;
  }

  checkEmail(value, spanId, mess) {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regexEmail.test(value)) {
      getElmID(spanId).innerHTML = "";
      getElmID(spanId).style.display = "none";
      return true;
    }
    getElmID(spanId).innerHTML = mess;
    getElmID(spanId).style.display = "block";
    return false;
  }

  checkDate(value, spanId, mess) {
    const regexDate = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (regexDate.test(value)) {
      getElmID(spanId).innerHTML = "";
      getElmID(spanId).style.display = "none";
      return true;
    }
    getElmID(spanId).innerHTML = mess;
    getElmID(spanId).style.display = "block";
    return false;
  }

  checkPassword(value, spanId, mess) {
    const regexPassword =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{1,}$/;
    if (regexPassword.test(value)) {
      getElmID(spanId).innerHTML = "";
      getElmID(spanId).style.display = "none";
      return true;
    }
    getElmID(spanId).innerHTML = mess;
    getElmID(spanId).style.display = "block";
    return false;
  }

  checkRangeNumber(value, spanId, mess, min, max) {
    if (value >= min && value <= max) {
      getElmID(spanId).innerHTML = "";
      getElmID(spanId).style.display = "none";
      return true;
    }
    getElmID(spanId).innerHTML = mess;
    getElmID(spanId).style.display = "block";
    return false;
  }
}

export default Validation;
