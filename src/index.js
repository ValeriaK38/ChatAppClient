import $ from "jquery";
import { createUser, loginUser, createMessage, createGuest,getAllMesseges} from "./rest";
import { openConnection, sendPlainMessage } from "./sockets";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

$(() => {

  $("#reg-btn").on("click", () => {
    const user = {
      email: $("#emailInput").val(),
      nickName: $("#userInput").val(),
      password: $("#passwordInput").val(),
    };
    createUser(user);
  });

 $("#reg-geust-btn").on("click", () => {
    const user = {
      nickName: $("#nicknameInput").val(),
    };
    createGuest(user);
  });

  $("#send-btn").on("click", () => {
    const message = $("#message-input").val()
    const token = sessionStorage.getItem("token")
  
    createMessage(token,message);
    sendPlainMessage(sessionStorage.getItem("nickName"), $("#message-input").val());
    document.getElementById("message-input").value = "";
  });

  $("#login-btn").on("click", () => {
    const user = {
      email: $("#emailInput").val(),
      password: $("#passwordInput").val(),
    };
    loginUser(user);
  });

  $("#export-btn").on("click",async () => {
  const messages = await getAllMesseges();
 var jsonObj = messages.map(o => Object.values(o).join(' : '));
  var jsonObject = JSON.stringify(jsonObj,"dontHave","\t");
  downloadCSV(jsonObject);
  });





function downloadCSV(csvStr) {
    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csvStr);
    hiddenElement.target = "_blank";
    hiddenElement.download = "Exported chat.csv";
    hiddenElement.click();
  }
})


   async function exportChat(){
    try {

    const messages = await getAllMesseges();
        console.log(messages);
    }
  catch(e) {
    console.log(e);
  }
   }
openConnection();

export{exportChat};