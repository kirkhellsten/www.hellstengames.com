<?php

$MAX_STRLEN_NAME = 50;
$MAX_STRLEN_EMAIL = 64;
$MAX_STRLEN_MESSAGE = 5000;

$PURPOSE_ARRAY_OF_VALID_VALUES = array(
    "support" => "support",
    "press" => "press",
    "partnership" => "partnership",
    "other" => "other"
);

// define variables and set to empty values
$name = $email = $message = $purpose = "";
$nameErr = $emailErr = $purposeErr = "";

function validateName() {
  if (!preg_match("/^[a-zA-Z' ]*$/", $GLOBALS["name"])) {
    $GLOBALS["nameErr"] = "Only letters and white space allowed";
    return FALSE;
  }
  return TRUE;
}

function validateEmail() {
  if (!filter_var($GLOBALS["email"], FILTER_VALIDATE_EMAIL)) {
    $GLOBALS["emailErr"] = "Invalid email format";
    return FALSE;
  }
  return TRUE;
}

function prepareContactFormInput() {
  $GLOBALS["purpose"] = strtolower($GLOBALS["purpose"]);
}

function clearContactForm() {
  $GLOBALS["name"] = "";
  $GLOBALS["email"] = "";
  $GLOBALS["message"] = "";
  $GLOBALS["purpose"] = "";
}

function checkContactFormRequiredFields() {

  $contactFormFieldRequired = FALSE;

  if (empty($GLOBALS["name"])) {
    $GLOBALS["nameErr"] = "Name is a required field";
    $contactFormFieldRequired = TRUE;
  }

  if (empty($GLOBALS["email"])) {
    $GLOBALS["emailErr"] = "E-mail is a required field";
    $contactFormFieldRequired = TRUE;
  }

  if (empty($GLOBALS["purpose"])) {
    $GLOBALS["purposeErr"] = "Purpose is a required field";
    $contactFormFieldRequired = TRUE;
  }

  return $contactFormFieldRequired;

}

function validateContactFormInput() {

  $isContactFormValid = TRUE;

  // Validate if fields are required

  if (empty($GLOBALS["name"])) {
    $GLOBALS["nameErr"] = "Name is a required field";
    $isContactFormValid = FALSE;
  }

  if (empty($GLOBALS["email"])) {
    $GLOBALS["emailErr"] = "E-mail is a required field";
    $isContactFormValid = FALSE;
  }

  if (empty($GLOBALS["purpose"])) {
    $GLOBALS["purposeErr"] = "Purpose is a required field";
    $isContactFormValid = FALSE;
  }

  // Validate Length for inputs
  if (strlen($GLOBALS["name"]) > $GLOBALS["MAX_STRLEN_NAME"]) {
    $GLOBALS["nameErr"] = "Name has exceeded max number of characters (" . $GLOBALS["MAX_STRLEN_NAME"] . ")";
    $isContactFormValid = FALSE;
  }
  if (strlen($GLOBALS["email"]) > $GLOBALS["MAX_STRLEN_EMAIL"]) {
    $GLOBALS["emailErr"] = "E-mail has exceeded max number of characters (" . $GLOBALS["MAX_STRLEN_EMAIL"] . ")";
    $isContactFormValid = FALSE;
  }
  if (strlen($GLOBALS["message"]) > $GLOBALS["MAX_STRLEN_MESSAGE"]) {
    $GLOBALS["messageErr"] = "Message has exceeded max number of characters (" . $GLOBALS["MAX_STRLEN_MESSAGE"] . ")";
    $isContactFormValid = FALSE;
  }

  // Validate Type of values for inputs
  if (validateName() === FALSE) {
    $isContactFormValid = FALSE;
  }
  if (validateEmail() === FALSE) {
    $isContactFormValid = FALSE;
  }

  foreach($GLOBALS["PURPOSE_ARRAY_OF_VALID_VALUES"] as $purpose_array_key => $purpose_array_value) {
    $purpose_array_value = strtolower($purpose_array_value);
    if ($GLOBALS["purpose"] == $purpose_array_value) {
      $isPurposeFieldValid = TRUE;
      break;
    }
  }


  return $isContactFormValid;

}

function removeExploitsForInput($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $GLOBALS["name"] = removeExploitsForInput($_POST["name"]);
  $GLOBALS["email"] = removeExploitsForInput($_POST["email"]);
  $GLOBALS["message"] = removeExploitsForInput($_POST["message"]);
  $GLOBALS["purpose"] = removeExploitsForInput($_POST["purpose"]);

  prepareContactFormInput();

  $isContactFormValid = validateContactFormInput();

  if ($isContactFormValid === TRUE) {

    // use wordwrap() if lines are longer than 70 characters
    $GLOBALS["message"] = wordwrap($GLOBALS["message"], 70);

    $messageText = "Name: " . $GLOBALS["name"] . "\n";
    $messageText .= "Email: " . $GLOBALS["email"] . "\n";
    $messageText .= "Message: \n\n" . $GLOBALS["message"] . "\n";

    $subjectText = "Hellsten Games Contact Us - " . ucfirst($GLOBALS["purpose"]);

    // send email
    mail("hellstengames@gmail.com", $subjectText, $messageText);

    clearContactForm();

  }

}

?>


<!DOCTYPE html>
<html lang="en">

<head>
    <title>Hellsten Games Contact Us</title>

    <link rel="stylesheet" href="css/contact.css" />

    <?php
    echo file_get_contents("commonhead.php");
     ?>
</head>

<body>

  <?php
  echo file_get_contents("commonheader.php");
   ?>

  <section id="section-contact" class="main-content-section">
    <div class="main-inner-content">
      <h1>Contact Us</h1>
      <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
        <span class="form-heading">Name <span class="required-character">*</span> </span>
          <input class="<?php
            if ($GLOBALS["nameErr"]) {
              echo "error";
            }
            ?>"
          type="text" name="name" value="<?php echo $GLOBALS["name"]; ?>">
        <span class="error"><?php echo $GLOBALS["nameErr"]; ?></span>
        <span class="form-heading">E-mail <span class="required-character">*</span> </span>
        <input class="<?php
          if ($GLOBALS["emailErr"]) {
            echo "error";
          }
          ?>" type="text" name="email" value="<?php echo $GLOBALS["email"]; ?>">
        <span class="error"><?php echo $GLOBALS["emailErr"]; ?></span>
        <span class="form-heading">Message: </span>
        <textarea type="text" name="message" rows="8" cols="50"><?php echo $GLOBALS["message"]; ?></textarea>
        <i>Cannot exceed 5000 characters</i>
        <span class="error"><?php echo $GLOBALS["messageErr"]; ?></span>
        <span class="form-heading">Purpose <span class="required-character">*</span> </span>
        <select class="<?php
          if ($GLOBALS["purposeErr"]) {
            echo "error";
          }
          ?>" name="purpose" id="purposes">
  <option <?php
      if ($GLOBALS["purpose"] == "") {
        echo 'selected="'+ $GLOBALS["purpose"] + '"';
      }
  ?> value="">---</option>
  <option <?php
      if ($GLOBALS["purpose"] == "support") {
        echo 'selected="selected"';
      }
  ?> value="Support">Support</option>
  <option <?php
      if ($GLOBALS["purpose"] == "press") {
        echo 'selected="selected"';
      }
  ?> value="Press">Press</option>
  <option <?php
      if ($GLOBALS["purpose"] == "partnership") {
        echo 'selected="selected"';
      }
  ?> value="Partnership">Partnership</option>
  <option <?php
      if ($GLOBALS["purpose"] == "other") {
        echo 'selected="selected"';
      }
  ?> value="Other">Other</option>
</select>
<span class="error"><?php echo $GLOBALS["purposeErr"]; ?></span>
    <br>
        <input type="submit" value="Send Message">
      </form>
    </div>
  </section>

  <?php
  echo file_get_contents("commonfooter.php");
   ?>

   <div class='message <?php if ($isContactFormValid === TRUE) { echo "comein"; } ?>'>
     <div class='check <?php if ($isContactFormValid === TRUE) { echo "scaledown"; } ?>'>
       &#10004;
     </div>
     <p>Success</p>
     <p>Your message has been sent successfully, I hope to respond within 24 hours.</p>
     <button id='ok'>OK</button>
   </div>

</body>

</html>
