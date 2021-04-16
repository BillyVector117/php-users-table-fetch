<?php
// This module INSERTS a new User to database
// error_reporting(0); // To prevent sending errors instead $response event
header('Content-type: application/json; charset=utf-8');
$name = $_POST['name'];
$year = $_POST['year'];
$country = $_POST['country'];
$email = $_POST['email'];
var_dump($_POST);
function validateData($name, $year, $country, $email)
{
    if ($name == '') {
        return false;
    } elseif ($year == '' && is_int($year)) {
        return false;
    } elseif ($country == '') {
        return false;
    } elseif ($email == '') {
        return false;
    }
    return true;
}
// Clean any typed-string
function cleanData($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
$name = cleanData($name);
$year = filter_var($year, FILTER_SANITIZE_NUMBER_INT);
$country = cleanData($country);
$email =  filter_var($email, FILTER_SANITIZE_EMAIL);
// Success case: validateData() == True send data to Database
if (validateData($name, $year, $country, $email)) {
    try {
        // You can add sensible information (database vars) in a different path
        $connection = new PDO('mysql:host=localhost;dbname=ajax;charset=utf8', 'root', null);
        // Set placeholders in query statement
        $statement = $connection->prepare("INSERT INTO users (name, year, country, email) VALUES (:name, :year, :country, :email)");
        // $statement->bindParam("siss", $name, $year, $country, $email); or refers each Param attribut with its placeholder
        $statement->bindParam(':name', $name);
        $statement->bindParam(':year', $year);
        $statement->bindParam(':country', $country);
        $statement->bindParam(':email', $email);
        $statement->execute();
        // This means query does not run/ No document added
        if ($statement->rowCount() <= 0) {
            $response = ['error' => true];
        }
        $response = [];
        echo ('data successfully submit!');
        echo json_encode($response);
    } catch (PDOException $event) {
        $response = ['error' => true];
        echo $event;
    }
}
