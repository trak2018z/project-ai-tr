<?php
    require('db/DataBaseConnect.php');

    if((isset($_SESSION['logged'])) && ($_SESSION['logged'] == true))
    {
        header('Location: home.php');
        exit();
    }
?>

<!doctype html>

<html lang="en">
<head>
    <meta charset="utf-8">

    <title>The HTML5 Herald</title>
    <meta name="description" content="The HTML5 Herald">
    <meta name="author" content="SitePoint">

    <link rel="stylesheet" href="libraries/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="index.css" type="text/css" />



</head>

<body>
<div>
        <div class="col-lg-6 container">
            <form action="scripts/login.php" method="post">
                <input placeholder="Login" type="text" name="login" />
                <input placeholder="Hasło" type="password" name="haslo" />
                <input type="submit" value="Zaloguj się" />
            </form>
            <input class="regist" onclick="location.href='registration.php'" type="submit" value="Rejestracja" />
        </div>
</div>
<script>
    $(function () {
        console.log("ready!");
    });
</script>


</body>
