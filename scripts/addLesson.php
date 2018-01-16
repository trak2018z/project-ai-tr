<?php
/**
 * Created by PhpStorm.
 * User: Robert
 * Date: 2018-01-15
 * Time: 21:08
 */

require_once("../db/DataBaseConnect.php");

    $db = new DataBaseConnect();
    print_r($db->addLesson($_POST['group_name'], $_POST['date'], $_POST['label']));