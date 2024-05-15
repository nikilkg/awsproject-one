<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $servername = "localhost";
  $username = "root";
  $password = "2003";
  $database = "magicpan";

  $conn = new mysqli($servername, $username, $password, $database);
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  $data = json_decode($_POST['data'], true);

  foreach ($data as $row) {
      $item = $conn->real_escape_string($row['item']);
      $rate = $conn->real_escape_string($row['rate']);
      $qty = $conn->real_escape_string($row['qty']);
      $amount = $conn->real_escape_string($row['amount']);

      $sql = "INSERT INTO order_details (item, rate, qty, amount) VALUES ('$item', '$rate', '$qty', '$amount')";

      if ($conn->query($sql) !== TRUE) {
          echo "Error: " . $sql . "<br>" . $conn->error;
      }
  }

  $conn->close();
}
?>
