<?php
// This module delete Users
error_reporting(0);
header('Content-type: application/json; charset=utf-8');


// Database connection
function connection()
{
    try {
        $connection = new PDO('mysql:host=localhost;dbname=ajax;charset=utf8', 'root', null);
        $id = $_POST['id'];

        $statement = $connection->prepare("DELETE FROM users WHERE id = :id");
        //$statement->bindParam(':id', $id);
        $statement->execute(array('id' => $id));

        if ($statement->rowCount() <= 0) {
            $response = ['error' => true];
        }
        $response = [];
        echo ('document successfully deleted!');

        echo json_encode($response);
    } catch (PDOException $event) {

        echo $event;
    }
}
connection();
