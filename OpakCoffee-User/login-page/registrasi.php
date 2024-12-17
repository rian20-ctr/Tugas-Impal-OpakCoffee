<?php
require 'koneksi.php'; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nama_user = mysqli_real_escape_string($conn, $_POST["nama_user"]);
    $alamat = mysqli_real_escape_string($conn, $_POST["alamat"]);
    $email = mysqli_real_escape_string($conn, $_POST["email"]);
    $password = $_POST["password"];
    $confirmPassword = $_POST["confirmPassword"];

    if ($password !== $confirmPassword) {
        echo "Password dan konfirmasi password tidak cocok.";
        exit();
    }
    $passwordHash = password_hash($password, PASSWORD_BCRYPT);

  
    $stmt = $conn->prepare("INSERT INTO user_admin (nama_user, alamat, email, password) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $nama_user, $alamat, $email, $passwordHash);

    if ($stmt->execute()) {
        echo "Pendaftaran Berhasil!";
        header("Location: index.html");
        exit(); 
    } else {
        echo "Pendaftaran Gagal: " . mysqli_error($conn);
    }
}
?>
