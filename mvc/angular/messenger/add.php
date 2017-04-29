<?php

// initialize variables
$msg 	= $_REQUEST['msg'];
$from 	= (isset($_REQUEST['from']))? $_REQUEST['from']: 'Mom';
$to 	= (isset($_REQUEST['to']))? $_REQUEST['to']: 'Dad';
$avatar = "https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png";

## TODO: NEED TO VALIDATE INPUT!!!

if ($msg == '')
	die();

// generate message array
$message 	= array(
	'msg'		=> $msg,
	'from' 		=> $from,
	'to'		=> $to,
	'avatar'	=> $avatar
);

// add message to json file
$messages 	= json_decode(file_get_contents('assets/json/messages.json'),TRUE);
array_push($messages,$message);
file_put_contents('assets/json/messages.json',json_encode($messages));

echo json_encode($message);