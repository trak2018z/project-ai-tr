
<?php
    require_once("db/DataBaseConnect.php");
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
            <button onclick="location.href='scripts/logout.php'" type="submit" >Wyloguj sie</button>
            <?php
                if ($_SESSION['type'] == 'teacher')
                { /* this will temporarily "stop" php --> */ ?>
                    <div class="col-lg-6">
                        <form action="scripts/addGroup.php" method="post"><br />
                            Nazwa Grupy: <br/> <input type="text" value=" " name="group_name"/><br/><br />
                            <button type="submit">Dodaj Grupę</button>
                        </form>
                    </div>
        </div>
        <div class="col-lg-6">
        </div>
        <div class="col-lg-6" style="padding-top: 10px">
                    <?php
                    if (isset($_SESSION['e_group'])) {
                        echo '<p class="text-danger">'  . $_SESSION['e_group'] . '</p>';
                        unset($_SESSION['e_group']);
                    }

                    if (isset($_SESSION['utworzenieGrupy'])) {
                        echo '<p class="text-danger">'  . $_SESSION['utworzenieGrupy'] . '</p>';
                        unset($_SESSION['utworzenieGrupy']);
                    }
                    $db = new DataBaseConnect();
                    ?>
                    <div class="col-10">
                        <select class="custom-select col-10 groupList" id="add-rights">
                            <?php
                            foreach (json_decode($db->getGrupeList(), true) as $value) {
                                echo ' <option>'.$value['label'].'</option>';
                            }
                            ?>
                        </select>
                        <button class="btn button" id="buttonGetList" >Pokaż listę studentów</button>
                        <br />
                        <br />
                        <p id="test"></p>
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
<script type="text/javascript" src="libraries/jQuery/jquery-3.2.1.js"></script>
<script type="text/javascript" src="libraries/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="libraries/tether/tether_1.2.4.js"></script>
<script type="text/javascript" src="jsScripts/home.js"></script>
</body>
</html>