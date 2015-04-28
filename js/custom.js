/*
    Author: Preston Stosur-Bassett
    Date: 28.4.15
    Description: Handles checking that all appropriate information is available on the index.html page, and assembles the email to be sent.
*/

$(document).ready(function() {
  //Semi-Global Variables
  var repairOrNot = null;

  //Helper Functions
  function assembleRepairTemplate(employeeName, customerName, customerEmail, deviceMake, deviceModel, repairEstimate, repairSpecial) {
    var greeting = "Hello "+customerName+", \n";
    var sent1 = "Thank you for reaching out to us about your "+deviceMake+" "+deviceModel+". ";
    var sent2 = "Im sorry to hear that your device is broken. The good news is, we can fix it! In most cases that repair only costs $"+repairEstimate+". ";
    var sent3 = "In some cases, though, the damage is more severe internally and we wont know until we actually take the device apart. This is only an estimate. \n";
    var sent4 = "Something that sets us apart from other repair facilities is our warranty. We offer an in-store Limited 6-Month Warranty on all repairs (excluding water damage, physical damage, and game system repairs) and a 6-month Worldwide Warranty at any of our 200+ stores. If you would like to compare our prices, remember to always inquire about their warranty. In most cases it may only be a few weeks or months. We understand that your phones and gadgets are extremely important and we want to ensure you that we care just as much as you do, and thats what allows us to offer a six month warranty. We stand by our work. We also buy, sell, and trade phones. If you have any older phones that are lying around, gathering dust, why not trade it in and use that cash or credit towards this repair? \n";
    var sent5 = "Please call us at (269-216-4801) if you have any additional questions or concerns. \n";
    var sent6 = "Thanks again for your interest, \n";
    var sent7 = employeeName+" \n";
    var sent8 = "-- \nTHANK YOU FOR CONTACTING US!!!! \nBy the way, what separates us from the Competition? \n-Nationwide and In-Store Warranty \n-Onsite Repairs While You Wait \n-200+ stores worldwide \n-Advanced Repairs (Soldering, Water, Damage, ETC) \n-We Buy, Sell and Trade Phones \n-Highly Trained Staff and Comfortable Retail Store Front \n-Experience Managing Large Business Accounts";
    var fullMessage = greeting + sent1 + sent2 + sent3 + sent4 + sent5 + sent6 + sent7 + sent8;
    localStorage.message = fullMessage;
    localStorage.employee = employeeName;
    localStorage.customerEmail = customerEmail;
    window.location.href = "interm.html";
  }
  function assembleNoRepairTemplate(employeeName, customerName, customerEmail, deviceMake, deviceModel, message) {
    var greeting = "Hello "+customerName+", \n";
    var sent1 = "Thank you for reaching out to us about your "+deviceMake+" "+deviceModel+". ";
    var sent2 = "Im sorry to hear that your device is broken. Unfortunately, we do not have enough information about your device to give an accurate estimate. Feel free to bring your device into one of our locations, or reach out to us by phone at 1.269.216.4801 or email tech@kalamazoo-cpr.com. \n";
    var sent3 = message+" .\n";
    var sent4 = "Something that sets us apart from other repair facilities is our warranty. We offer an in-store Limited 6-Month Warranty on all repairs (excluding water damage, physical damage, and game system repairs) and a 6-month Worldwide Warranty at any of our 200+ stores. If you would like to compare our prices, remember to always inquire about their warranty. In most cases it may only be a few weeks or months. We understand that your phones and gadgets are extremely important and we want to ensure you that we care just as much as you do, and thats what allows us to offer a six month warranty. We stand by our work. We also buy, sell, and trade phones. If you have any older phones that are lying around, gathering dust, why not trade it in and use that cash or credit towards this repair? \n";
    var sent5 = "Please call us at (269-216-4801) if you have any additional questions or concerns. \n";
    var sent6 = "Thanks again for your interest, \n";
    var sent7 = employeeName+" \n";
    var sent8 = "-- \nTHANK YOU FOR CONTACTING US!!!! \nBy the way, what separates us from the Competition? \n-Nationwide and In-Store Warranty \n-Onsite Repairs While You Wait \n-200+ stores worldwide \n-Advanced Repairs (Soldering, Water, Damage, ETC) \n-We Buy, Sell and Trade Phones \n-Highly Trained Staff and Comfortable Retail Store Front \n-Experience Managing Large Business Accounts";
    var fullMessage = greeting + sent1 + sent2 + sent3 + sent4 + sent5 + sent6 + sent7 + sent8;
    localStorage.message = fullMessage;
    localStorage.employee = employeeName;
    localStorage.customerEmail = customerEmail;
    window.location.href = "interm.html";
  }

  //OnClickListeners
  $("#noRepairButton").click(function() {
    //Make the no repair form viewable
    $("#repairForm").hide();
    $("#noRepairForm").show();
    $("#goSection").show();
    repairOrNot = "No";
  });
  $("#repairButton").click(function() {
    //Make the repair form viewable
    $("#noRepairForm").hide();
    $("#repairForm").show();
    $("#goSection").show();
    repairOrNot = "Yes";
  });
  $("#getEstimate").click(function() {
    //Check To ensure that all the relevent information is present
    var employeeName = $("#employeeName").val();
    var customerName = $("#customerName").val();
    var customerEmail = $("#customerEmail").val();
    var deviceMake = $("#deviceMake").val();
    var deviceModel = $("#deviceModel").val();
    var passfail = true;

    if(employeeName == "" || employeeName == " " || employeeName == null || employeeName == undefined) {
      swal("Employee Name is Required", "Please complete all required fields.", "error");
      passfail = false;
    }
    if(customerName == "" || customerName == " " || customerName == null || customerName == undefined) {
      swal("Customer Name is Required", "Please complete all required fields.", "error");
      passfail = false;
    }
    if(customerEmail == "" || customerEmail == " " || customerEmail == null || customerEmail == undefined) {
      swal("Customer Email is Required", "Please complete all required fields.", "error");
      passfail = false;
    }
    if(deviceMake == "" || deviceMake == " " || deviceMake == null || deviceMake == undefined) {
      swal("Device Make is Required", "Please complete all required fields.", "error");
      passfail = false;
    }
    if(deviceModel == "" || deviceModel == " " || deviceModel == null || deviceModel == undefined) {
      swal("Device Model is Required", "Please complete all required fields.", "error");
      passfail = false;
    }

    if(repairOrNot == "No") {
      var noRepairMessage = $("#noRepairMessage").val();
      if(noRepairMessage == "" || noRepairMessage == " " || noRepairMessage == null || noRepairMessage == undefined) {
        swal("Message is Required", "Pleaes complete all required fields.", "error");
        passfail = false;
        console.log("DEBUG: message = "+noRepairMessage);
      }
    }
    else if(repairOrNot == "Yes") {
      var repairEstimate = $("#repairEstimate").val();
      var specialMessage = $("#repairSpecial").val();
      if(repairEstimate <= 35 || repairEstimate == null || repairEstimate == undefined || repairEstimate == "" || repairEstimate == " ") {
        swal("Incorrect Estimate", "Please make sure you complete the estimate field and that you quote at least $35.", "error");
        passfail = false;
      }
    }
    else {
      swal("Uh-oh!", "Something went wrong internally, please send a message to 1.630.677.2884 for technical support.", "error");
      passfail = false;
      console.log("Fatal Error Occured. Error Code = 001");
      console.log("DEBUG: REPAIRORNOT = "+repairOrNot);
    }

    if(passfail == true) {
      //Now that we've made sure we have all the correct information, now we can go ahead and try to compile the template.
      if(repairOrNot == "No") {
        //Compile the 'Not Enough Information Template'
        assembleNoRepairTemplate(employeeName, customerName, customerEmail, deviceMake, deviceModel, noRepairMessage);
      }
      else if(repairOrNot == "Yes") {
        //Compile the 'Enough Information Template'
        assembleRepairTemplate(employeeName, customerName, customerEmail, deviceMake, deviceModel, repairEstimate, specialMessage);
      }
      else {
        swal("Uh-oh!", "Something went wrong internally, please send a message to 1.630.677.2884 for technical support.", "error");
        console.log("Fatal Error Occured. Error Code = 002");
      }
    }
  });
});
