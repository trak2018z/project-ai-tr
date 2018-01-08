
<?php
    require_once("db/DataBaseConnect.php");
    if(!((isset($_SESSION['logged'])) && ($_SESSION['logged'] == true)))
    {
        session_unset();
        header('Location: index.php');
        exit();
    }
?>

<!DOCTYPE html>

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
    <div class="nav">
        <div class="col-lg-9">
            <p>Jestes zalogowany jako:
            <?php
                echo $_SESSION['sur_name']. " ". $_SESSION['name'];
            ?>
            </p>
        </div>
        <div class="col-lg-3">
            <button onclick="location.href='scripts/logout.php'" type="submit" >Wyloguj sie</button>
        </div>
    </div>
    <?php
    if ($_SESSION['type'] == 'teacher')
    {?>
    <div class="nav" id="nav">
        <div class="col-lg-3">
            <button class="btnNav btn button" id="buttonAddNewLesson" >Dodaj nowe zajecia</button>
        </div>
        <div class="col-lg-3">
            <button class="btnNav btn button" id="buttonAddNewGroup" >Dodaj grupe</button>
        </div>
        <div class="col-lg-3">
            <button class="btnNav btn button" id="buttonSchoolDiary" >Dziennik</button>
        </div>
        <div class="col-lg-3">
            <button>4</button>
        </div>
    </div>
    <?php
    }
    ?>
    <div class="row">
        <div class="col-lg-10" id="content" >
        </div>
        <div class="col-lg-2">
            <img src="images/Default_profile_picture_(male).jpg" height="125" width="125" alt="test">
            <br />
            personal info
        </div>
    </div>
</div>
<script>
    $(function () {
        console.log("ready!");
    });
</script>
<script type="text/javascript" src="libraries/jQuery/jquery-3.2.1.js"></script>
<script type="text/javascript" src="libraries/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="libraries/tether/tether_1.2.4.js"></script>
<script type="text/javascript" src="jsScripts/home.js"></script>
</body>
</html>