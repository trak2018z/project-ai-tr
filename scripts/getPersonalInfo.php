<?php
/**
 * Created by PhpStorm.
 * User: Robert
 * Date: 2018-01-15
 * Time: 18:45
 */

    require('../db/DataBaseConnect.php');

    $db = new DataBaseConnect();
    print_r($db->getPersonalInfo($_SESSION['id']));