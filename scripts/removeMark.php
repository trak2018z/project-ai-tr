<?php
/**
 * Created by PhpStorm.
 * User: Robert
 * Date: 2018-01-15
 * Time: 23:48
 */

require('../db/DataBaseConnect.php');

$db = new DataBaseConnect();
print_r($db->removeMark($_POST['id']));