<?php
session_start();
require 'koneksi.php'; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = mysqli_real_escape_string($conn, $_POST["email"]);
    $password = mysqli_real_escape_string($conn, $_POST["password"]);

    $query = "SELECT * FROM user_admin WHERE email = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id_admin']; 
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['user_name'] = $user['nama_admin'];

            header("Location: dashboard.html");
            exit();
        } else {
            echo "Password salah!";
        }
    } else {
        
        echo "Email tidak terdaftar!";
    }
}
?>