

jQuery(function ($) { // poczekanie az strona sie w pełni załaduje


    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').focus()
    });

    $('#getPersonalInfo').on('click', function(){
        $.ajax({
            type: "GET",
            cash: false,
            url: "../project-ai/scripts/getPersonalInfo.php",
            dataType: 'json',
            async: false,
            success: function (result) {
                $('#modal-login').val(result[0].login);
                $('#modal-name').val(result[0].name);
                $('#modal-surname').val(result[0].sur_name);
                $('#modal-email').val(result[0].email);
            },
            complete: function () {
            },
            error: function () {
                console.log("error");
            }
        });
    });

    $('#editPersonalInfo').on('click',function () {
        $.ajax({
            type: "POST",
            cash: false,
            url: "../project-ai/scripts/editPersonalInfo.php",
            dataType: 'text',
            data: {
                'login': $('#modal-login').val(),
                'name': $('#modal-name').val(),
                'sur_name': $('#modal-surname').val(),
                'email': $('#modal-email').val(),
                'newpass': $('#modal-new-pass').val(),
                'pass': $('#modal-pass').val()
            },
            success: function (result) {
                console.log(result);
            },
            complete: function () {

            },
            error: function () {
                console.log("error");
            }
        });
    });
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
    if (id == "buttonAddNewGroup") {
        var divContent = document.getElementById("content");

        var div = createElement(divContent, "DIV", 'divAddNewGroup', 'content', '');

        var p = createElement(div, 'P', '', '', 'Wpisz nazwę grupy');
        var subject = createElement(div, "INPUT", 'getNewGroup', '', '');
        subject.type = "text";

        var button = createElement(div, 'BUTTON', 'createNewGroup', 'approved', 'Zatwierdź');

        button.onclick=addNewGroup;

        //pusty dive zabezpieczenia prz rozwijanu i zwijaniu
        var flag = createElement(div, 'div', 'divActive', '', '');

        $("#divAddNewGroup").slideToggle(0);
        $("#divAddNewGroup").slideToggle(700);
        $('#' + id).attr("active", "true");
    }

    else if (id == "buttonAddNewLesson") {
        var divContent = document.getElementById("content");

        var div = createElement(divContent, "DIV", 'divAddLessonForm', 'content', '');

        var p = createElement(div, 'P', '', '', 'Wybierz date odbycia się zajęć');
        var data = createElement(div, "INPUT", 'getNewLessonDate', '', '');
        data.type = "date";

        var p = createElement(div, 'P', '', '', 'Wpisz nazwę tematu');
        var subject = createElement(div, "INPUT", 'getNewLessonSubject', '', '');

        var p = createElement(div, 'P', '', '', 'Wybierz grupę, dla której stworzyć zajęcia');

        writeGroupList("divAddLessonForm");

        var button = createElement(div, 'BUTTON', '', 'approved', 'Zatwierdź');

        button.onclick=addLesson;

        //pusty dive zabezpieczenia prz rozwijanu i zwijaniu
        var flag = createElement(div, 'div', 'divActive', '', '');

        $("#divAddLessonForm").slideToggle(0);
        $("#divAddLessonForm").slideToggle(700);

        $('#' + id).attr("active", "true");
    }

    else if (id == "buttonSchoolDiary") {
        var divContent = document.getElementById("content");

        var div = createElement(divContent, "DIV", 'divSchoolDiary', 'content', '');
        var p = createElement(div, 'P', '', '', 'Wybierz grupę');

        writeGroupList("divSchoolDiary");

        var button = createElement(div, 'BUTTON', 'buttonGetList', 'approved', 'Wybierz');
        var div2 = createElement(div, "DIV", 'divStudentsList', '', '');
        var flag = createElement(div, 'div', 'divActive', '', '');

        button.onclick = buttonGetStudentsListInit;
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
        var id = div.getAttribute("id");
        $("#" + id).slideToggle(700);
    }
}

function buttonGetStudentsListInit() {
    var select = $('#groupList option:selected').text();
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
            createHeadingForStudentsTable();
            $('#divStudentsList').toggle(0);
            for (var i = 0; i < result.length; i++) {
                creatUserRow(result[i]);
            }
            buttonAddNewMarkInit();
            buttonAddMarkInit();
            buttonShowMoreInit();
            $('#divStudentsList').toggle(700);
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
                    buttonGetStudentsListInit();
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

function createHeadingForStudentsTable(){
    var div = document.getElementById('divStudentsList');

    var row = createElement(div,'DIV','','row tableHeading','');

    var divImage = createElement(row, 'DIV', '', 'col-lg-2 marginAuto', '');
    var image = createElement(divImage, 'P', '', '', 'Zdjecie');

    var divName = createElement(row, 'DIV', '', 'col-lg-2 marginAuto', '');
    var name = createElement(divName, 'P', '', '', 'Imie i Nazwisko');

    var divIndexNumber = createElement(row, 'DIV', '', 'col-lg-2 marginAuto', '');
    var indexNumber = createElement(divIndexNumber, 'P', '', '', 'Numer Indeksu');

    var divAddMark = createElement(row, 'DIV', '', 'col-lg-2 marginAuto', '');

    var divShowmore = createElement(row, 'DIV', '', 'col-lg-2 marginAuto', '');
}

function creatUserRow(userData) {

    var div = createElement(document.getElementById('divStudentsList'), 'DIV', userData.user_id + '-student', 'students row', '');

    var divImage = createElement(div, 'DIV', '', 'col-lg-2', '');

    var image = document.createElement('IMG');
    image.setAttribute("src", "./images/Default_profile_picture_(male).jpg");
    image.setAttribute("height", "50");
    image.setAttribute("width", "50");
    image.setAttribute("class", "centerImg");
    divImage.appendChild(image);

    var divName = createElement(div, 'DIV', '', 'col-lg-2 marginAuto', '');
    var name = createElement(divName, 'P', '', '', userData.name + " " + userData.sur_name);

    var divIndexNumber = createElement(div, 'DIV', '', 'col-lg-2 marginAuto', '');
    var indexNumber = createElement(divIndexNumber, 'P', '', '', userData.index_number);

    var divAddMark = createElement(div, 'DIV', '', 'col-lg-4 marginAuto', '');
    var buttonAddMark = createElement(divAddMark, 'BUTTON', userData.user_id + '-addNewMark', 'btnAddNewMark approved btn-small', 'Dodaj Nowa Ocene');

    //var divShowmore = createElement(div, 'DIV', '', 'col-lg-2 marginAuto', '');
    var buttonShowMore = createElement(divAddMark, 'BUTTON', userData.user_id + '-showMore', 'btnShowMore approved btn-small', 'Szczegolowe Informacje');


    createAddMarkView(userData);
    createElement(document.getElementById('divStudentsList'),'DIV',userData.user_id + '-divMarksList', 'marksList', '');
    creatHeadingForMarksTable(userData.user_id);
    getShowMoreData(userData.user_id);
    $('#' +userData.user_id + '-divMarksList').slideToggle(0);
}

function getShowMoreData(id){
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

function creatHeadingForMarksTable(id) {
    var div = document.getElementById(id + '-divMarksList');

    var row = createElement(div,'DIV','','row tableHeading','');

    var divImage = createElement(row, 'DIV', '', 'col-lg-3 marginAuto', '');
    var image = createElement(divImage, 'P', '', '', 'Typ');

    var divName = createElement(row, 'DIV', '', 'col-lg-3 marginAuto', '');
    var name = createElement(divName, 'P', '', '', 'Ocena');

    var divIndexNumber = createElement(row, 'DIV', '', 'col-lg-3 marginAuto', '');
    var indexNumber = createElement(divIndexNumber, 'P', '', '', 'Komentarz');

    var divAddMark = createElement(row, 'DIV', '', 'col-lg-3 marginAuto', '');

}

function creatMarkRow(markData, user_id) {
    //var div = createElement(document.getElementById(user_id + '-student'), 'DIV', markData.mark_id + '-markId', 'marks row', '');
    var parent = document.getElementById(user_id + '-divMarksList');
    var div = createElement(parent,'DIV',markData.mark_id + '-markId', 'row', '');

    var divLabel = createElement(div,'DIV',markData.mark_id + '-divMarkLabel', 'col-lg-3 marginAuto','');
    var label = createElement(divLabel, 'P','','',markData.label);

    var divMark = createElement(div,'DIV',markData.mark_id + '-divMarkMark', 'col-lg-3 marginAuto','');
    var mark = createElement(divMark, 'P','','',markData.mark);

    var divComment = createElement(div,'DIV',markData.mark_id + '-divMarkComment', 'col-lg-3 marginAuto','');
    var comment = createElement(divComment, 'P','','',markData.comment);

    var divButton = createElement(div,'DIV',markData.mark_id + '-divMarkButton', 'col-lg-3 marginAuto','');
    var button = createElement(divButton, 'BUTTON', markData.mark_id +'-removeMark','btnRemoveMark','Usun Ocene');

    button.onclick = removeMark(markData.mark_id);
}

function removeMark(id){
    $('#' + id + '-removeMark').on('click',function () {
        $.ajax({
            type: "POST",
            cash: false,
            url: "../project-ai/scripts/removeMark.php",
            dataType: 'text',
            data: {
                'id': id
            },
            success: function (result) {
                console.log(result);
                buttonGetStudentsListInit();
            },
            complete: function () {

            },
            error: function () {
                console.log("error");
            }
        });
    });
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
    $('#' + userData.user_id + '-divLabel').append("<p>Typ:</p>")
    var inputLabel = createElement(divLabel, 'Input', userData.user_id + "-inputLabel", '', '');

    var divMark = createElement(div, 'DIV', userData.user_id + '-divMark', 'col-lg-2', '');
    $('#' + userData.user_id + '-divMark').append("<p>Ocena:</p>")

    var selectMark = createElement(divMark, 'SELECT', userData.user_id + "-mark", '', '');

    for (var i = 5.0; i > 1.5; i = i - 0.5) {
        var z = document.createElement("option");
        var t = document.createTextNode(i);
        z.appendChild(t);
        selectMark.appendChild(z);
    }

    var divComment = createElement(div, 'DIV', userData.user_id + "-divComment", "col-lg-4", '');
    $('#' + userData.user_id + '-divComment').append("<p>Komentarz:</p>")
    var inputComment = createElement(divComment, 'Input', userData.user_id + "-inputComment", '', '');
    inputComment.setAttribute("placeholder", 'test');

    var divButton = createElement(div, 'DIV', '', 'col-lg-2 marginAuto', '');
    var buttonAddMark = createElement(divButton, 'BUTTON', userData.user_id + "-addMark", 'btnAddMark approved btn-small', "Dodaj ocene");

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

function addNewGroup(){
    console.log($('#getNewGroup').val());
    $.ajax({
        type: "POST",
        cash: false,
        data: {
            'group_name': $('#getNewGroup').val()
        },
        url: "../project-ai/scripts/addGroup.php",
        dataType: 'text',
        success: function (result) {
            console.log(result);
        },
        complete: function () {
        },
        error: function () {
            console.log("error");
        }
    });
}

function addLesson() {
    $.ajax({
        type: "POST",
        cash: false,
        data: {
            'group_name': $('#groupList option:selected').text(),
            'date': $('#getNewLessonDate').val(),
            'label': $('#getNewLessonSubject').val()
        },
        url: "../project-ai/scripts/addLesson.php",
        dataType: 'text',
        success: function (result) {
            console.log(result);
        },
        complete: function () {
        },
        error: function () {
            console.log("error");
        }
    });
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


