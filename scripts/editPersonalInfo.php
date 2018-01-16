<?php
/**
 * Created by PhpStorm.
 * User: Robert
 * Date: 2018-01-15
 * Time: 19:43
 */

require('../db/DataBaseConnect.php');

$db = new DataBaseConnect();
print_r($db->editPersonalInfo($_SESSION['id'], $_POST['pass'], $_POST['login'], $_POST['name'], $_POST['sur_name'],
    $_POST['email'], $_POST['newpass']));
