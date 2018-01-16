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
                $_SESSION['id'] = $row['user_id'];
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
            $_SESSION['e_login'] = "Istnieje już konto o takim loginie! Wybierz inny.";
        }

        if ($check) {
            if ($this->dataBase->query("INSERT INTO user VALUES (NULL, '$login', '$name', '$sur_name', '$pass', '$email', 'student', 1, NULL, NULL)")) {
                $_SESSION['udanarejestracja'] = true;
                header('Location: ../index.php');
            } else {
                $_SESSION['udanarejestracja'] = false;
                header('Location: ../registration.php');
            }

        } else {
            $_SESSION['udanarejestracja'] = false;
            header('Location: ../registration.php');
        }

    }

    public function addGroup($label)
    {
        $check = true;
        $result = $this->dataBase->query("SELECT group_id FROM grupa WHERE label='$label'");

        if ($result->rowCount() > 0) {
            $check = false;
            $_SESSION['e_group'] = "Istnieje już grupa o takiej nazwie!";
        }

        if ($check) {
            if ($this->dataBase->query("INSERT INTO grupa VALUES (NULL, '$label')"))
                $_SESSION['utworzenieGrupy'] = "Pomyślnie dodano grupę";
            else {
                $_SESSION['e_group'] = "Wystąpił błąd. Nie udało się dodać grupy";
            }
        }
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

    public function getLessonsList($group_id)
    {
        $result = $this->dataBase->query("SELECT l.subject, l.lesson_id FROM lesson l, grupa gr 
                                                    WHERE l.group_id = gr.group_id AND gr.group_id ='$group_id'");
        $rows = array();

        if ($result != null) {
            while ($row = $result->fetch(PDO::FETCH_ASSOC))
                $rows[] = $row;
        }

        return json_encode($rows);
    }

    public function getStudentsList($label)
    {
        $result = $this->dataBase->query("SELECT u.user_id, u.name, u.sur_name, u.email, u.index_number, gr.group_id 
                        FROM user u, user_group u_g, grupa gr 
                        WHERE u.user_id = u_g.user_id AND u_g.group_id = gr.group_id AND gr.label = '$label'");
        $rows = array();

        if ($result != null) {
            while ($row = $result->fetch(PDO::FETCH_ASSOC))
                $rows[] = $row;
        }

        return json_encode($rows);
    }

    public function addMark($user_id, $lesson_id, $mark_label, $mark, $mark_comment)
    {
        if ($this->dataBase->query("INSERT INTO mark VALUES (NULL, '$lesson_id', '$mark_label', '$mark','$mark_comment')")) {
            $tmp = 'MAX';
            $result = $this->dataBase->query("SELECT $tmp(mark_id) as liczba FROM mark");
            $rows = array();
            if ($result != null) {
                while ($row = $result->fetch(PDO::FETCH_ASSOC))
                    $rows[] = $row;
            }
            $tmp = $rows[0]["liczba"];
            if ($this->dataBase->query("INSERT INTO user_mark VALUES (NULL, $user_id,$tmp)")) {
                return "udalo sie";
            } else {
                return "error";
            }
        } else {
            return "error";
        }
    }

    public function getAllStudentInfo($user_id)
    {
        $tmp = $this->dataBase->query("SELECT group_id FROM user_group WHERE user_id=$user_id");
        $tmpRows = array();

        if ($tmp != null) {
            while ($tmpRow = $tmp->fetch(PDO::FETCH_ASSOC))
                $tmpRows[] = $tmpRow;
        }
        $tmp = $tmpRows[0]["group_id"];
        $result = $this->dataBase->query("SELECT m.* FROM user_mark u_m, mark m WHERE u_m.user_id=$user_id
                                                    AND m.mark_id = u_m.mark_id");
        $rows = array();

        if ($result != null) {
            while ($row = $result->fetch(PDO::FETCH_ASSOC))
                $rows[] = $row;
        }
        $result = $this->dataBase->query("SELECT p.*, l.* From presence p, lesson l, 
                                                    WHERE p.user_id = $user_id AND l.lesson_id=p.lesson_id AND group_id =$tmp");
        if ($result != null) {
            while ($row = $result->fetch(PDO::FETCH_ASSOC))
                $rows[] = $row;
        }
        return json_encode($rows);
    }

    public function getPersonalInfo($user_id)
    {
        $result = $this->dataBase->query("SELECT * FROM user WHERE user_id=$user_id");
        $rows = array();

        if ($result != null) {
            while ($row = $result->fetch(PDO::FETCH_ASSOC))
                $rows[] = $row;
        }
        return json_encode($rows);
    }

    public function editPersonalInfo($user_id, $pass, $login, $name, $surName, $email, $newPass)
    {
        $sql = "SELECT * FROM USER WHERE user_id='$user_id' AND password='$pass'";;

        if ($result = $this->dataBase->query($sql)) {
            if ($result->rowCount() == 1) {
                if ($newPass == null)
                    $sql = "UPDATE user SET name = '$name', login = '$login', sur_name = '$surName', email = '$email' 
                          WHERE user_id = '$user_id'";
                else
                    $sql = "UPDATE user SET name = '$name', login = '$login', sur_name = '$surName', email = '$email', password = '$newPass'
                          WHERE user_id = '$user_id'";
                $this->dataBase->query($sql);
                return 1;
            }
            return 0;
        }
        return 0;
    }

    public function addLesson($group_name, $date, $label)
    {
        if ($group_name != null && $date != null && $label != null) {
            $result = $this->dataBase->query("SELECT group_id FROM grupa WHERE label='$group_name'");
            $rows = array();
            if ($result != null) {
                while ($row = $result->fetch(PDO::FETCH_ASSOC))
                    $rows[] = $row;
                $tmp = $rows[0]["group_id"];
                if ($this->dataBase->query("INSERT INTO lesson VALUES (NULL,$tmp, '$date', '$label')")) {
                    return 1;
                } else {
                    return 0;
                }
            }
            return 0;
        }
        return 0;
    }

    public function removeMark($id)
    {
        $result = $this->dataBase->query("SELECT user_marks_id FROM user_mark WHERE mark_id=$id");
        $rows = array();
        if ($result != null) {
            while ($row = $result->fetch(PDO::FETCH_ASSOC))
                $rows[] = $row;
            $tmp = $rows[0]["user_marks_id"];
            if ($this->dataBase->query("DELETE FROM user_mark WHERE user_marks_id = $tmp")){
                if($this->dataBase->query("DELETE FROM mark WHERE mark_id = $id")){
                    return 1;
                }
                return 0;
            }
            else {
                return 0;
            }
        }
        return 0;
    }
}

