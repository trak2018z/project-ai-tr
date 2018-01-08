jQuery(function ($) { // poczekanie az strona sie w pełni załaduje

    $('.btnNav').on('click', function () {
        var activId = $(this).attr('id');
        if (document.getElementById("divActive") == null &&
            $('#' + activId).attr("active") == null) {
            creatNewView(activId);
        }
        else if (document.getElementById("divActive") != null &&
            $('#' + activId).attr("active") == null) { //usuwanie zawartośći i nadpisywanie jej
            hideOutContent();
            setTimeout(function () {
                if (document.getElementById("content").lastChild != null) {
                    document.getElementById("content").removeChild(document.getElementById("content").lastChild);
                    unactiveAllButtons();
                }
                creatNewView(activId);
            }, 700);
        }
        else if ($(this).attr("active") != null && $('#' + activId).attr("active") != null) { //podwójne kliknięcie w ten sam przycisk
            hideOutContent();
            setTimeout(function () {
                if (document.getElementById("content").lastChild != null) {
                    document.getElementById("content").removeChild(document.getElementById("content").lastChild);
                    unactiveAllButtons();
                }
            }, 700);
        }
    })
});

function unactiveAllButtons() {
    $('#nav').children().each(function () {
        $(this).children().removeAttr('active');
    });
}

function creatNewView(id) {
    console.log(id);
    if (id == "buttonAddNewGroup") {
        var divContent = document.getElementById("content");

        var div = createElement(divContent, "DIV", 'divAddNewGroup', 'd-none', '');

        var p = createElement(div, 'P', '', '', 'Wpisz nazwę grupy');
        var subject = createElement(div, "INPUT", 'input2', '', '');
        subject.type = "text";

        div.appendChild(document.createElement('BR'));
        div.appendChild(document.createElement('BR'));

        var button = createElement(div, 'BUTTON', '', '', 'Zatwierdź');

        //pusty dive zabezpieczenia prz rozwijanu i zwijaniu
        var flag = createElement(div, 'div', 'divActive', '', '');

        div.removeAttribute("class");
        $("#divAddNewGroup").slideToggle(0);
        $("#divAddNewGroup").slideToggle(700);
        $('#' + id).attr("active", "true");
    }

    else if (id == "buttonAddNewLesson") {
        var divContent = document.getElementById("content");

        var div = createElement(divContent, "DIV", 'divAddLessonForm', 'd-none', '');

        var p = createElement(div, 'P', '', '', 'Wybierz date odbycia się zajęć');
        var data = createElement(div, "INPUT", 'input1', '', '');
        data.type = "date";

        var p = createElement(div, 'P', '', '', 'Wpisz nazwę tematu');
        var subject = createElement(div, "INPUT", 'input2', '', '');

        var p = createElement(div, 'P', '', '', 'Wybierz grupę, dla której stworzyć zajęcia');

        writeGroupList("divAddLessonForm");

        div.appendChild(document.createElement('BR'));
        div.appendChild(document.createElement('BR'));
        var button = createElement(div, 'BUTTON', '', '', 'Zatwierdź');

        //pusty dive zabezpieczenia prz rozwijanu i zwijaniu
        var flag = createElement(div, 'div', 'divActive', '', '');

        div.removeAttribute("class");
        $("#divAddLessonForm").slideToggle(0);
        $("#divAddLessonForm").slideToggle(700);

        $('#' + id).attr("active", "true");
    }

    else if (id == "buttonSchoolDiary") {
        var divContent = document.getElementById("content");

        var div = createElement(divContent, "DIV", 'divSchoolDiary', 'd-none', '');
        var p = createElement(div, 'P', '', '', 'Wybierz grupę');

        writeGroupList("divSchoolDiary");

        div.appendChild(document.createElement('BR'));
        div.appendChild(document.createElement('BR'));

        var button = createElement(div, 'BUTTON', 'buttonGetList', '', 'Wybierz');
        var div2 = createElement(div, "DIV", 'divStudentsList', '', '');
        var flag = createElement(div, 'div', 'divActive', '', '');

        button.onclick = buttonGetListInit;
        div.removeAttribute("class");
        $("#divSchoolDiary").slideToggle(0);
        $("#divSchoolDiary").slideToggle(700);

        $('#' + id).attr("active", "true");
    }
}

function writeGroupList(id) {
    $.ajax({
        type: "GET",
        cash: false,
        url: "../project-ai/scripts/getGroupList.php",
        dataType: 'json',
        async: false,
        success: function (result) {
            var div = document.getElementById(id);
            var select = document.createElement('SELECT');
            select.id = "groupList";

            div.appendChild(select);

            for (var i = 0; i < result.length; i++) {
                var z = document.createElement("option");
                var t = document.createTextNode(result[i].label);
                z.appendChild(t);
                select.appendChild(z);
            }
        },
        complete: function () {
        },
        error: function () {
            console.log("error");
        }
    });
}

function writeLessonsList(userData) {
    $.ajax({
        type: "POST",
        cash: false,
        url: "../project-ai/scripts/getLessonsList.php",
        dataType: 'json',
        data: {
            'group_id': userData.group_id
        },
        async: false,
        success: function (result) {
            console.log(result);
            var div = document.getElementById(userData.user_id + '-divLesson');
            var select = document.createElement('SELECT');
            select.id = userData.user_id + '-selectLesson';

            div.appendChild(select);

            for (var i = 0; i < result.length; i++) {
                var z = document.createElement("option");
                var t = document.createTextNode(result[i].subject);
                z.appendChild(t);
                select.appendChild(z);
            }
        },
        complete: function () {
        },
        error: function () {
            console.log("error");
        }
    });
}

function hideOutContent() {
    if (document.getElementById("divActive") != null) {
        var div = document.getElementById("content").lastChild;
        console.log(div);
        var id = div.getAttribute("id");
        $("#" + id).slideToggle(700);
    }
}

function buttonGetListInit() {
    console.log("2");
    var select = $('#groupList option:selected').text();
    console.log(select);
    $.ajax({
        type: "POST",
        cash: false,
        data: {
            'select': select
        },
        url: "../project-ai/scripts/getStudentsList.php",
        dataType: 'json',
        success: function (result) {
            $('#divStudentsList').empty();
            for (var i = 0; i < result.length; i++) {
                creatUserRow(result[i]);
            }
        },
        complete: function () {
        },
        error: function () {
            console.log("error");
        }
    });
}

function creatUserRow(userData) {
    console.log(userData);

    var div = createElement(document.getElementById('divStudentsList'), 'DIV', '', 'students row', '');

    var divImage = createElement(div, 'DIV', '', 'col-lg-2', '');

    var image = document.createElement('IMG');
    image.setAttribute("src", "./images/Default_profile_picture_(male).jpg");
    image.setAttribute("height", "50");
    image.setAttribute("width", "50");
    divImage.appendChild(image);

    var divName = createElement(div, 'DIV', '', 'col-lg-1', '');
    var name = createElement(divName, 'P', '', '', userData.name);

    var divSurName = createElement(div, 'DIV', '', 'col-lg-1', '');
    var surName = createElement(divSurName, 'P', '', '', userData.sur_name);

    var divIndexNumber = createElement(div, 'DIV', '', 'col-lg-2', '');
    var indexNumber = createElement(divIndexNumber, 'P', '', '', userData.index_number);

    var divEmail = createElement(div, 'DIV', '', 'col-lg-2', '');
    var email = createElement(divEmail, 'P', '', '', userData.email);

    var divAddMark = createElement(div, 'DIV', '', 'col-lg-2', '');
    var buttonAddMark = createElement(divAddMark, 'BUTTON', '', 'addNewMark', 'Dodaj Nowa Ocene');

    var divShowmore = createElement(div, 'DIV', '', 'col-lg-2', '');
    var buttonShowMore = createElement(divShowmore, 'BUTTON', '', 'showMore', 'Szczegolowe Informacje');

    $('#divStudentsList').append(document.createElement('BR'));

    createAddMarkView(userData);
}

function createAddMarkView(userData) {

    var div = createElement(document.getElementById('divStudentsList'), 'DIV', userData.user_id + "-addMark", 'addMark row', '');
    var divLesson = createElement(div, 'DIV', userData.user_id + '-divLesson', 'col-lg-2', '');
    $('#' + userData.user_id + '-divLesson').append("<p>Zajęcia:</p>")

    writeLessonsList(userData);

    var divLabel = createElement(div, 'DIV', userData.user_id + '-divLabel', 'col-lg-2', '');
    $('#' + userData.user_id + '-divLabel').append("<p>Nazwa Oceny:</p>")
    var inputLabel = createElement(divLabel, 'Input', userData.user_id + "-inputLabel", '', '');

    var divMark = createElement(div, 'DIV', userData.user_id + '-divMark', 'col-lg-2', '');
    $('#' + userData.user_id + '-divMark').append("<p>Ocena:</p>")

    var selectMark = createElement(divMark, 'SELECT', userData.user_id + "-mark", '', '');

    for (var i = 5.0; i > 2.0; i = i - 0.5) {
        var z = document.createElement("option");
        var t = document.createTextNode(i);
        z.appendChild(t);
        selectMark.appendChild(z);
    }

    var divComment = createElement(div, 'DIV', userData.user_id + "-divComment", "col-lg-4", '');
    $('#' + userData.user_id + '-divComment').append("<p>Komentarz:</p>")
    var inputComment = createElement(divComment, 'Input', userData.user_id + "-inputComment", '', '');
    inputComment.setAttribute("placeholder", 'test');

    var divButton = createElement(div, 'DIV', '', 'col-lg-2', '');
    var buttonAddMark = createElement(divButton, 'BUTTON', userData.user_id + "-addMark", '', "Dodaj ocene");

    $('#divStudentsList').append(document.createElement('BR'));
}

function createElement(parent, type, id, clas, conetnt) {
    var element = document.createElement(type);
    if (id != "")
        element.id = id;
    if (conetnt != "") {
        var text = document.createTextNode(conetnt);
        element.appendChild(text);
    }
    if (clas != "")
        element.setAttribute("class", clas);
    parent.appendChild(element);
    return element;
}

