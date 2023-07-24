function hide() {
  document.getElementById("comm").style.display = "none";
}

function show() {
  document.getElementById("popup").style.display="inline-block";
}

function validateForm() {
  var name = document.forms["form"]["name"].value;
  var email = document.forms["form"]["email"].value;
  var q1 = document.forms["form"]["q1"].value;
  var q2 = document.forms["form"]["q2"].value;
  var q3 = document.forms["form"]["q3"].value;
  var q4 = document.forms["form"]["q4"].value;
  var addcomment = document.forms["form"]["addcomment"].value;
  const emailvalidate =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (name == "") {
      alert("Name must be filled out");
      return false;
  }else if (email == "" ) {
      alert("Email must be filled out");
      return false;
  }else if (!email.match(emailvalidate)){
      alert("Must be Email")
      return false;
  }else if (q1 == "" ) {
      alert("Rating Question-1 must be filled out");
      return false;
  }else if (q2 == "" ) {
      alert("Rating Question-2 must be filled out");
      return false;
  }else if (q3 == "" ) {
      alert("Rating Question-3 must be filled out");
      return false;
  }else if (q4 == "") {
      alert("Rating Question-4 must be filled out");
      return false;
  }else if (addcomment == "") {
      alert("Reason must be filled out");
      return false;
  }else{
    hide();
    show();

  }
 
}