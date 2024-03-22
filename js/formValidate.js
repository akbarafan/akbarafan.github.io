
function validateForm() {
  var name = document.getElementById("name").value;
  var message = document.getElementById("message").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var subject = document.getElementById("subject").value;

  if (name.trim() == "" || name.trim() == null) {
    playSound(false);
    alert("Name must not be empty");
    return false;
  } else if (!validateEmail(email.trim())) {
    playSound(false);
    alert(
      "Please enter a valid e-mail address.\n Email address must be like xyz@xyz.xyz"
    );
    return false;
  } else if (email.trim() == "" || email.trim() == null) {
    playSound(false);
    alert("Email should present.");
    return false;
  } else if (subject.trim() == "" || subject.trim() == null) {
    playSound(false);
    alert("Subject is compulsary");
    return false;
  } else if (phone.length > 10) {
    playSound(false);
    alert("Phone Number should not exceed 10 characters");
    return false;
  } else if (isNaN(phone)) {
    
    playSound(false);
    alert("non numeric phone number detected");
    return false;
  } else if (message.trim() == "" || message.trim() == null) {
    playSound(false);
    alert("message must not be empty");
    return false;
  } else if (message.length > 100) {
    playSound(false);
    alert("Message can't exceed 100 characters.");
    return false;
  } else {
    playSound(true);
    alert(name + " , Your message is sent successfully.");
    true;
  }
}

function playSound(type) {
  if (type) {
    document.getElementById("success").play();
  } else {
    document.getElementById("alert").play();
  }
}

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
