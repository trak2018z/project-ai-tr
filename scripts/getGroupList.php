<?php
/**
 * Created by PhpStorm.
 * User: Robert
 * Date: 2018-01-03
 * Time: 16:42
 */
require('../db/DataBaseConnect.php');

    $db = new DataBaseConnect();
    print_r($db->getGroupList());