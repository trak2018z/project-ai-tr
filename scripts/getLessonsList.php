<?php
/**
 * Created by PhpStorm.
 * User: Robert
 * Date: 2018-01-08
 * Time: 11:18
 */
    require('../db/DataBaseConnect.php');

    $db = new DataBaseConnect();
    $group_id= $_POST['group_id'];
    print_r($db->getLessonsList($group_id));
