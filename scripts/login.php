<?php

    $login = $_POST['login'];
    $haslo = $_POST['haslo'];

    require_once("../db/DataBaseConnect.php");

    $db = new DataBaseConnect();

    $db->loginUser($login, $haslo);



