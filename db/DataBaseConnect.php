<?php
/**
 * Created by PhpStorm.
 * User: Robert
 * Date: 2017-10-30
 * Time: 22:48
 */

session_start();

class DataBaseConnect
{

    /**
     * DataBaseConnect constructor.
     */
    public $dataBase;

    public function __construct()
    {

        try {
            $this->dataBase = new PDO('mysql:host=localhost;dbname=AI_Projekt', 'root', '');

        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    public function getAllUsers()
    {
        $sql = 'SELECT * FROM user';
        $query = $this->dataBase->query($sql);
        $rows = array();
        if ($query != null) {
            while ($result = $query->fetch(PDO::FETCH_ASSOC)) {
                $rows[] = $result;
                print_r(json_encode($rows));
            }
        }
    }

    public function loginUser($login, $pass)
    {
        $sql = "SELECT * FROM USER WHERE login='$login' AND password='$pass'";
        //$query = $this->dataBase->query($sql);

        if ($result = $this->dataBase->query($sql)) {
            if ($result->rowCount() == 1) {
                $row = $result->fetch(PDO::FETCH_ASSOC);
                $_SESSION['user'] = $row['login'];
                $_SESSION['logged'] = true;
                $_SESSION['name'] = $row['name'];
                $_SESSION['sur_name'] = $row['sur_name'];
                $_SESSION['type'] = $row['type'];
                header('Location: ../home.php');

            } else {
                echo 'wrong login or password';
            }
        }


    }

    public function registUser($login, $name, $sur_name, $pass, $email)
    {
        $check = true;
        //Czy email już istnieje?
        $result = $this->dataBase->query("SELECT user_id FROM user WHERE email='$email'");


        if ($result->rowCount() > 0) {
            $check = false;
            $_SESSION['e_email'] = "Istnieje już konto przypisane do tego adresu e-mail!";
        }

        //Czy nick jest już zarezerwowany?
        $result = $this->dataBase->query("SELECT user_id FROM user WHERE login='$login'");


        if ($result->rowCount() > 0) {
            $check = false;
            $_SESSION['e_login']="Istnieje już konto o takim loginie! Wybierz inny.";
        }

        if ($check)
        {
            if ($this->dataBase->query("INSERT INTO user VALUES (NULL, '$login', '$name', '$sur_name', '$pass', '$email', 'student', 1, NULL, NULL)"))
            {
                $_SESSION['udanarejestracja']=true;
                header('Location: ../index.php');
            }
            else
            {
                $_SESSION['udanarejestracja']=false;
                header('Location: ../registration.php');
            }

        }
        else
        {
            $_SESSION['udanarejestracja']=false;
            header('Location: ../registration.php');
        }

    }

    public function addGroup($label) //todo dodawć usuwanie biełych znaków pred i na końcu stringa z nazwą grupy
    {
        $check = true;
        $result = $this->dataBase->query("SELECT group_id FROM grupa WHERE label='$label'");

        if ($result->rowCount() > 0) {
            $check = false;
            $_SESSION['e_group'] = "Istnieje już grupa o takiej nazwie!";
        }

        if ($check)
        {
            if($this->dataBase->query("INSERT INTO grupa VALUES (NULL, NULL, '$label', NULL)"))
                $_SESSION['utworzenieGrupy']="Pomyślnie dodano grupę";
            else
                $_SESSION['e_group']="Wystąpił błąd. Nie udało się dodać grupy";
            header('Location: ../home.php');
        }
        header('Location: ../home.php');
    }

    public function getGroupList()
    {
        $result = $this->dataBase->query("SELECT label FROM grupa");
        $rows = array();


        if ($result != null) {
            while ($row = $result->fetch(PDO::FETCH_ASSOC))
                $rows[] = $row;
        }

        return json_encode($rows);
    }

    public function getStudentsList($label)
    {
        $result = $this->dataBase->query("SELECT u.name, u.sur_name FROM user u, user_group u_g, grupa gr 
                        WHERE u.user_id = u_g.user_id AND u_g.group_id = gr.group_id AND gr.label = '$label'");
        $rows = array();

        if ($result != null) {
            while ($row = $result->fetch(PDO::FETCH_ASSOC))
                $rows[] = $row;
        }

        return json_encode($rows);
    }


}

