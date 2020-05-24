const viewBtn = document.getElementById("view-api-button");
const copyBtn = document.getElementById("copy-api-button");
const apiIpt = document.getElementById("api-key");

const showAPIforThreeSec = () => {
  // Show API key for 3 seconds
  apiIpt.type = "text";
  setTimeout(() => (apiIpt.type = "password"), 3000);
};

const copyAPIKeytoClipboard = (event) => {
  apiIpt.type = "text";
  apiIpt.focus();
  apiIpt.select();
  try {
    document.execCommand("copy");
  } catch (error) {
    console.log(error);
    console.log("Oops, unable to copy");
  }
  apiIpt.type = "password";
};

function init() {
  viewBtn.addEventListener("click", showAPIforThreeSec);
  copyBtn.addEventListener("click", copyAPIKeytoClipboard);
}

if (viewBtn) {
  init();
}
