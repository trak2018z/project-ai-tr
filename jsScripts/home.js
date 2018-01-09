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

        button.onclick = buttonGetStudentsListInit;
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
                z.setAttribute("lesson_id", result[i].lesson_id);
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

function buttonGetStudentsListInit() {
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
        async: false,
        dataType: 'json',
        success: function (result) {
            $('#divStudentsList').empty();
            for (var i = 0; i < result.length; i++) {
                creatUserRow(result[i]);
            }
            buttonAddNewMarkInit();
            buttonAddMarkInit();
            buttonShowMoreInit();
        },
        complete: function () {
        },
        error: function () {
            console.log("error");
        }
    });
}

function buttonAddMarkInit() {
    $('.btnAddMark').on('click', function () {
        var id = $(this).attr('id');
        id = id.substring(0, id.indexOf('-'));
        //console.log($('#' + id + '-selectLesson' + ' option:selected').attr("lesson_id"));
        $.ajax({
            type: "POST",
            cash: false,
            data: {
                'user_id': id,
                'lesson_id': $('#' + id + '-selectLesson' + ' option:selected').attr("lesson_id"),
                'mark_label': $('#' + id + '-inputLabel').val(),
                'mark': $('#' + id + '-mark' + ' option:selected').text(),
                'mark_comment': $('#' + id + '-inputComment').val()
            },
            url: "../project-ai/scripts/addMark.php",
            dataType: 'text',
            success: function (result) {
                if(document.getElementById(id+'-divMarksList')!=null){
                    document.getElementById('divStudentsList').removeChild(document.getElementById(id+'-divMarksList'));
                    createElement(document.getElementById('divStudentsList'),'DIV',id + '-divMarksList', '', '');
                    getShowMoreData(id);
                    //$('#' +id + '-divMarksList').slideToggle(0);
                }
            },
            complete: function () {
            },
            error: function () {
                console.log("error");
            }
        });
    })
}

function buttonShowMoreInit() {
    $('.btnShowMore').on('click', function () {
        var id = $(this).attr('id');
        id = id.substring(0, id.indexOf('-'));
        $('#' +id + '-divMarksList').slideToggle(700);
    })
}

function buttonAddNewMarkInit() {
    $('.btnAddNewMark').on('click', function () {
        var id = $(this).attr('id');
        id = id.substring(0, id.indexOf('-'));
        $('#' + id + '-addMark').slideToggle(700);

    })
}

function creatUserRow(userData) {
    console.log(userData);

    var div = createElement(document.getElementById('divStudentsList'), 'DIV', userData.user_id + '-student', 'students row', '');

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
    var buttonAddMark = createElement(divAddMark, 'BUTTON', userData.user_id + '-addNewMark', 'btnAddNewMark', 'Dodaj Nowa Ocene');

    var divShowmore = createElement(div, 'DIV', '', 'col-lg-2', '');
    var buttonShowMore = createElement(divShowmore, 'BUTTON', userData.user_id + '-showMore', 'btnShowMore', 'Szczegolowe Informacje');

    $('#divStudentsList').append(document.createElement('BR'));

    createAddMarkView(userData);
    createElement(document.getElementById('divStudentsList'),'DIV',userData.user_id + '-divMarksList', '', '');
    getShowMoreData(userData.user_id);
    $('#' +userData.user_id + '-divMarksList').slideToggle(0);
}

function getShowMoreData(id){
    console.log(id);
    $.ajax({
        type: "POST",
        cash: false,
        data: {
            'user_id': id
        },
        url: "../project-ai/scripts/getAllStudentInfo.php",
        dataType: 'json',
        async: false,
        success: function (result) {
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                if (result[i].mark != null)
                    creatMarkRow(result[i], id);
                else if (result[i].date != null)
                    creatPresenceRow(result[i], id);
            }
        },
        complete: function () {
        },
        error: function () {
            console.log("error");
        }
    });
}

function creatMarkRow(markData, user_id) {
    //var div = createElement(document.getElementById(user_id + '-student'), 'DIV', markData.mark_id + '-markId', 'marks row', '');
    var parent = document.getElementById(user_id + '-divMarksList');
    var div = createElement(parent,'DIV',markData.mark_id + '-markId', 'row', '');

    var divLabel = createElement(div,'DIV',markData.mark_id + '-divMarkLabel', 'col-lg-3','');
    var label = createElement(divLabel, 'P','','',markData.label);

    var divMark = createElement(div,'DIV',markData.mark_id + '-divMarkMark', 'col-lg-3','');
    var mark = createElement(divMark, 'P','','',markData.mark);

    var divComment = createElement(div,'DIV',markData.mark_id + '-divMarkComment', 'col-lg-3','');
    var comment = createElement(divComment, 'P','','',markData.comment);

    $('#' +markData.mark_id + '-markId').append(document.createElement('BR'));

}

function creatPresenceRow(presenceData, user_id){
    var parent = document.getElementById(user_id + '-divMarksList');

    var div = createElement(parent,'DIV',presenceData.presence_id + '-presenceId', 'row', '');

    var divDate = createElement(div,'DIV',presenceData.presence_id + '', 'col-lg-3','');
    var label = createElement(divDate, 'P','','',presenceData.date);

    var divSubject = createElement(div,'DIV',presenceData.presence_id + '', 'col-lg-3','');
    var subject = createElement(divSubject, 'P','','',presenceData.subject);

    var divDate = createElement(div,'DIV',presenceData.presence_id + '', 'col-lg-3','');
    if(presenceData.presence)
        var label = createElement(divDate, 'P','','tick','');
    else
        var label = createElement(divDate, 'P','','cross','');
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
    var buttonAddMark = createElement(divButton, 'BUTTON', userData.user_id + "-addMark", 'btnAddMark', "Dodaj ocene");

    $('#divStudentsList').append(document.createElement('BR'));
    $('#' + userData.user_id + '-addMark').slideToggle(0);
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

function createElementBefore(parent,elementBefore, type, id, clas, conetnt){
    var element = document.createElement(type);
    if (id != "")
        element.id = id;
    if (conetnt != "") {
        var text = document.createTextNode(conetnt);
        element.appendChild(text);
    }
    if (clas != "")
        element.setAttribute("class", clas);
    parent.insertBefore(element,elementBefore);
    return element;
}


