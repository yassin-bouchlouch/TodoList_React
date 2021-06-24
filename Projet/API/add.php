<?php
include('db.php');


function get_total_all_records()
{
	include('db.php');
	$statement = $connection->prepare("SELECT * FROM users");
	$statement->execute();
	$result = $statement->fetchAll();
	return $statement->rowCount();
}


if(isset($_POST["operation"]))
{
		$statement = $connection->prepare("
			INSERT INTO tasks (taskName ) 
			VALUES (:taskName)
		");
		$result = $statement->execute(
			array(
				':taskName'	=>	$_POST["taskName"],
			
			
			)
		);
		if(!empty($result))
		{
			echo 'Data Inserted';
		}
	}
		$statement = $connection->prepare(
			"UPDATE tasks 
			SET taskName = :taskName  
			WHERE id = :id
			"
		);
		$result = $statement->execute(
			array(
				':taskName'	=>	$_POST["taskName"],
				':id'			=>	$_POST["user_id"]
			)
		);
		if(!empty($result))
		{
			echo 'Data Updated';
		}
	

?>