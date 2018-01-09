<?php
/**
 * Created by PhpStorm.
 * User: Robert
 * Date: 2018-01-09
 * Time: 09:49
 */

    require('../db/DataBaseConnect.php');

    $db = new DataBaseConnect();
    $user_id= $_POST['user_id'];
    print_r($db->getAllStudentInfo($user_id));