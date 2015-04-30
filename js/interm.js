/*
    Author: Preston Stosur-Bassett
    Date: 27.4.15
    Description: interm.js adds the message to be proof-read to the page and handles how to send the page.
*/

$(document).ready(function() {
  //Get the page started
  var passfail = true;

  if(localStorage.customerEmail == undefined || localStorage.customerEmail == null || localStorage.customerEmail == "") {
    swal("Uh-oh!", "An internal error occured while trying to fetch the customer's email. Please contact 1.630.677.2884 for technical support.", "error");
    passfail = false;
    console.log("A fatal error occured. Error code = 003");
  }
  if(localStorage.message == undefined || localStorage.message == null || localStorage.message == "") {
    swal("Uh-oh!", "An internal error occured while trying to fetch the compiled template. Please contact 1.630.677.2884 for technical support.", "error");
    passfail = false;
    console.log("A fatal error occured. Error code = 004");
  }

  if(passfail == true) {
    $("#proof_read").val(localStorage.message);
  }

  //OnClikListeners
  $("#copyText").click(function() {
    var textToCopy = $("#proof_read").val();
    //Somehow copy the text to the clipboard here
  });
  $("#cancelSend").click(function() {
    window.location.href = "index.html";
  });
  $("#sendMessage").click(function() {
    var message = $("#proof_read").val();
    var email = localStorage.customerEmail;
    var subject = "Your Repair Inquiry";
    var store = localStorage.store;
    var techEmail;

    if(store == "kalamazoo") {
      techEmail = "tech@kalamazoo-cpr.com";
    }
    else if(store == "portage") {
      techEmail = "tech@cpr-portage.com";
    }

    if(message != undefined || message != null || message != "" || message != " " || techEmail == undefined || techEmail == null || techEmail == "" || techEmail == " ") {
      if(email != undefined || email != null || email != "" || message != " ") {
        //Send the message
        $.ajax({
          type: 'POST',
          url: 'php/contact.php',
          data: {
            message: message,
            email: email,
            subject: subject,
            store: storeEmail
          },
          success: function(data) {
            if(data == "Message failed to send.") {
              swal("FATAL", "There was a fatal error when trying to send your message.", "error");
              console.log(data);
            }
            else {
              swal("Whoo!", "Your message has been sent!", "success");
              window.location.href = "index.html"
            }
          },
          error: function(data) {
            swal("FATAL", "There was a fatal error when trying to send your message.", "error");
            console.log(data);
          }
        });
      }
      else {
        swal("Uh-oh!", "The email for the user does not exist. Please try again....", "error");
        console.log("A fatal error occurred. Error Code = 006");
      }
    }
    else {
      swal("Uh-oh!", "The message isn't complete...", "error");
      console.log("A fatal error occured: Error Code = 005");
    }
  });
});
