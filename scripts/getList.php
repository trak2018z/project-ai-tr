<?php
/**
 * Created by PhpStorm.
 * User: Robert
 * Date: 2017-12-04
 * Time: 23:57
 */
require('../db/DataBaseConnect.php');

    $db = new DataBaseConnect();
    $label= $_POST['select'];
    print_r($db->getGrupe($label));