<?php
/**
 * Created by PhpStorm.
 * User: Robert
 * Date: 2017-11-20
 * Time: 23:32
 */

    session_start();
    session_unset();
    header('Location: ../index.php');