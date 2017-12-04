<?php
/**
 * Created by PhpStorm.
 * User: Robert
 * Date: 2017-11-20
 * Time: 20:18
 */



if (isset($_POST['email'])) {
    //Udana walidacja? Załóżmy, że tak!
    $wszystko_OK = true;

    //Sprawdź poprawność loginu
    $login = $_POST['login'];

    //Sprawdzenie długości loginu
    if ((strlen($login) < 3) || (strlen($login) > 20)) {
        $wszystko_OK = false;
        $_SESSION['e_login'] = "Login musi posiadać od 3 do 20 znaków!";
    }

    if (ctype_alnum($login) == false) {
        $wszystko_OK = false;
        $_SESSION['e_login'] = "Login może składać się tylko z liter i cyfr (bez polskich znaków)";
    }

    // Sprawdź poprawność adresu email
    $email = $_POST['email'];
    $emailB = filter_var($email, FILTER_SANITIZE_EMAIL);

    if ((filter_var($emailB, FILTER_VALIDATE_EMAIL) == false) || ($emailB != $email)) {
        $wszystko_OK = false;
        $_SESSION['e_email'] = "Podaj poprawny adres e-mail!";
    }

    //Sprawdź poprawność hasła
    $haslo1 = $_POST['haslo1'];
    $haslo2 = $_POST['haslo2'];

    if ((strlen($haslo1) < 8) || (strlen($haslo1) > 20)) {
        $wszystko_OK = false;
        $_SESSION['e_haslo'] = "Hasło musi posiadać od 8 do 20 znaków!";
    }

    if ($haslo1 != $haslo2) {
        $wszystko_OK = false;
        $_SESSION['e_haslo'] = "Podane hasła nie są identyczne!";
    }


    //Czy zaakceptowano regulamin?
    if (!isset($_POST['regulamin'])) {
        $wszystko_OK = false;
        $_SESSION['e_regulamin'] = "Potwierdź akceptację regulaminu!";
    }

    if (!isset($_POST['name'])) {
        $wszystko_OK = false;
    }

    if (!isset($_POST['sur_name'])) {
        $wszystko_OK = false;
    }

    //Bot or not? Oto jest pytanie!
    $secret = "6LczoDkUAAAAACaVIflkGJqhyW8HsBDKhBtFhmQP";

    $sprawdz = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $secret . '&response=' . $_POST['g-recaptcha-response']);

    $odpowiedz = json_decode($sprawdz);

    if ($odpowiedz->success == false) {
        $wszystko_OK = false;
        $_SESSION['e_bot'] = "Potwierdź, że nie jesteś botem!";
    }

    //Zapamiętaj wprowadzone dane
    $_SESSION['fr_name'] = $_POST['name'];
    $_SESSION['fr_sur_name'] = $_POST['sur_name'];
    $_SESSION['fr_login'] = $login;
    $_SESSION['fr_email'] = $email;
    $_SESSION['fr_haslo1'] = $haslo1;
    $_SESSION['fr_haslo2'] = $haslo2;
    if (isset($_POST['regulamin'])) $_SESSION['fr_regulamin'] = true;

    if ($wszystko_OK)
    {
        $db = new DataBaseConnect();
        $db->registUser($login,$_POST['name'], $_POST['sur_name'], $haslo1, $email);
    }
    else
    {
        $_SESSION['udanarejestracja']=false;
        header('Location: ../registration.php');
    }


}

