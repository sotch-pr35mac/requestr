/*
    Author: Preston Stosur-Bassett
    Date: 28.4.15
    Description: preload.js handles some preloading functions for the index.html page, specifically it checks to see if the employee has already used the application, and, if so, automatically adds their name.
*/

$(document).ready(function(){
  //If the employee has already used the application,
  if(localStorage.employee != null || localStorage.employee != undefined) {
    $("#employeeName").val(localStorage.employee);
  }

  //If the location has already been set, set it again
  if(localStorage.store != null || localStorage.store != undefined) {
    $("#storeLocation").val(localStorage.store);
  }
});
