<?php
/**
 * Created by PhpStorm.
 * User: Robert
 * Date: 2017-12-03
 * Time: 23:04
 */

require_once("../db/DataBaseConnect.php");

if(isset($_POST['group_name']))
{
    $label = $_POST['group_name'];
    $db = new DataBaseConnect();
    print_r($db->addGroup($label));
}