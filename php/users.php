<?php
// This module read Users
error_reporting(0); // To prevent send errors instead $response event
header('Content-type: application/json; charset=utf-8');
// Database connection
function connection()
{
	try {
		// You can add sensible information (database vars) in a different path
		$connection = new PDO('mysql:host=localhost;dbname=ajax;charset=utf8', 'root', null);
		$statement = $connection->query("SELECT * FROM users");
		$statement->execute();
		$results = $statement->fetchAll(PDO::FETCH_ASSOC);
		/* echo '<pre>';
		var_dump($results); */
		$response = [];
		// For each user/document/result/ create an array and save it in $response[]
		foreach ($results as $result) {
			// echo '<pre>';
			// var_dump($result['name']);
			array_push($response, $result);
		}
		// echo '<pre>';
		// var_dump($response);
		// json_encode() is the response for this module
		echo json_encode($response);
	} catch (PDOException $event) {
		$response = ['error' => true];
		echo $event;
	}
}
connection();
