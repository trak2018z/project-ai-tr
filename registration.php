<?php
session_start();

if ((isset($_SESSION['logged'])) && ($_SESSION['logged'] == true)) {
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
    <script type="text/javascript" src="libraries/jQuery/jquery-3.2.1.js"></script>
    <script src='https://www.google.com/recaptcha/api.js'></script>


</head>

<body>
<div class="container">
    <div class="row">
        <div class="col-lg-12">
            <form action="scripts/regist.php" method="post">
                Ostatnia Rejestracja: <?php
                if (isset($_SESSION['udanarejestracja'])) {
                    if ($_SESSION['udanarejestracja']) {
                        echo 'powiodla sie';
                    } else {
                        echo 'nie powiodla sie';
                    }
                    unset($_SESSION['udanarejestracja']);
                }
                ?>

                <br/>

                Login: <br/> <input type="text" value="<?php
                if (isset($_SESSION['fr_login'])) {
                    echo $_SESSION['fr_login'];
                    unset($_SESSION['fr_login']);
                }
                ?>" name="login"/><br/>

                <?php
                if (isset($_SESSION['e_login'])) {
                    echo '<p class="text-danger">' . $_SESSION['e_login'] . '</p>';
                    unset($_SESSION['e_login']);
                }
                ?>

                Imie: <br/> <input type="text" value="<?php
                if (isset($_SESSION['fr_name'])) {
                    echo $_SESSION['fr_name'];
                    unset($_SESSION['fr_name']);
                }
                ?>" name="name"/><br/>


                Nazwisko: <br/> <input type="text" value="<?php
                if (isset($_SESSION['fr_sur_name'])) {
                    echo $_SESSION['fr_sur_name'];
                    unset($_SESSION['fr_sur_name']);
                }
                ?>" name="sur_name"/><br/>



                E-mail: <br/> <input type="text" value="<?php
                if (isset($_SESSION['fr_email'])) {
                    echo $_SESSION['fr_email'];
                    unset($_SESSION['fr_email']);
                }
                ?>" name="email"/><br/>

                <?php
                if (isset($_SESSION['e_email'])) {
                    echo '<p class="text-danger">' . $_SESSION['e_email'] . '</p>';
                    unset($_SESSION['e_email']);
                }
                ?>

                Twoje hasło: <br/> <input type="password" value="<?php
                if (isset($_SESSION['fr_haslo1'])) {
                    echo $_SESSION['fr_haslo1'];
                    unset($_SESSION['fr_haslo1']);
                }
                ?>" name="haslo1"/><br/>

                <?php
                if (isset($_SESSION['e_haslo'])) {
                    echo '<p class="text-danger">' . $_SESSION['e_haslo'] . '</p>';
                    unset($_SESSION['e_haslo']);
                }
                ?>

                Powtórz hasło: <br/> <input type="password" value="<?php
                if (isset($_SESSION['fr_haslo2'])) {
                    echo $_SESSION['fr_haslo2'];
                    unset($_SESSION['fr_haslo2']);
                }
                ?>" name="haslo2"/><br/>

                <label>
                    <input type="checkbox" name="regulamin" <?php
                    if (isset($_SESSION['fr_regulamin'])) {
                        echo "checked";
                        unset($_SESSION['fr_regulamin']);
                    }
                    ?>/> Akceptuję regulamin
                </label>

                <?php
                if (isset($_SESSION['e_regulamin'])) {
                    echo '<p class="text-danger">' . $_SESSION['e_regulamin'] . '</p>';
                    unset($_SESSION['e_regulamin']);
                }
                ?>

                <div class="g-recaptcha" data-sitekey="6LczoDkUAAAAAO16hiP1X2UvrAVoqiSo6_B172I7"></div>

                <?php
                if (isset($_SESSION['e_bot'])) {
                    echo '<p class="text-danger">' . $_SESSION['e_bot'] . '</p>';
                    unset($_SESSION['e_bot']);
                }
                ?>

                <br/>

                <input type="submit" value="Zarejestruj się"/>

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

