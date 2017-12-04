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



</head>

<body>
<div class="container">
    <div class="row">
        <div class="col-lg-6">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At obcaecati quisquam
            recusandae?
            <br />
            <form action="scripts/login.php" method="post">
                Login: <br /> <input type="text" name="login" /> <br />
                Hasło: <br /> <input type="password" name="haslo" /> <br /><br />
                <input type="submit" value="Zaloguj się" />
            </form>
        </div>
        <div class="col-lg-6">
            <?php
            //$db = new DataBaseConnect();
            //$db->getAllUsers();
            ?>

            <input onclick="location.href='registration.php'" type="submit" value="Rejestracja" />
        </div>
    </div>
</div>
<script>
    $(function () {
        console.log("ready!");
    });
</script>


</body>
