
<?php
    session_start();
    if(!((isset($_SESSION['logged'])) && ($_SESSION['logged'] == true)))
    {
        session_unset();
        header('Location: index.php');
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
    <script type="text/javascript" src="libraries/jQuery/jquery-3.2.1.js"></script>


</head>

<body>
<div class="container">
    <div class="row">
        <div class="col-lg-6">
            <p>Jestes zalogowany jako:
            <?php
                echo $_SESSION['sur_name']. " ". $_SESSION['name'];
            ?>
            </p>
        </div>
        <div class="col-lg-6">
            <input onclick="location.href='scripts/logout.php'" type="submit" value="Wyloguj sie" />
            <?php
                if ($_SESSION['type'] == 'teacher')
                { /* this will temporarily "stop" php --> */ ?>
                    <div class="col-lg-6">
                        <form action="scripts/regist.php" method="post"><br />
                            Nazwa Grupy: <br/> <input type="text" value=" " name="group_name"/><br/><br />

                            <input onclick="location.href='scripts/addGroup.php'" type="submit" value="Dodaj Grupę" /><br />
                    </div>
                    <?php /* <-- php resumes now */
                }
            ?>
        </div>
    </div>
</div>
<script>
    $(function () {
        console.log("ready!");
    });
</script>
</body>
</html>