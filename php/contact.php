<?php
	$mailFrom = "tech@kalamazoo-cpr.com";
	$mailTo = $_POST['email'];
	$subject = $_POST['subject'];
	$message = $_POST['message'];

	if(mail($mailTo, $subject, $message, $mailFrom)) {
		echo "Message sent successfully.";
	}
	else {
		echo "Message failed to send.";
	}
