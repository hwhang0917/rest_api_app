var password = document.getElementById("password"),
  confirm_password = document.getElementById("confirm_password");

function validatePassword() {
  if (password.value != confirm_password.value) {
    confirm_password.setCustomValidity("비밀번호가 일치하지 않습니다.");
  } else {
    confirm_password.setCustomValidity("");
  }
}

function init() {
  password.onchange = validatePassword;
  confirm_password.onkeyup = validatePassword;
}

if (password) {
  init();
}
