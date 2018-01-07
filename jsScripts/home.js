var wiatForFreeButton = false;
jQuery(function ($) { // poczekanie az strona sie w pełni załaduje

    $('.btnNav').on('click', function () {
        if(!wiatForFreeButton ) {
            var activId = $(this).attr('id');
            if (document.getElementById("divActive") == null &&
                $('#' + activId).attr("active") == null) {
                creatNewView(activId);
                $('#' + activId).attr("active", "true");
            }
            else if (document.getElementById("divActive") != null &&
                $('#' + activId).attr("active") == null) { //usuwanie zawartośći i nadpisywanie jej
                hideOutContent();
                setTimeout(function () {
                    document.getElementById("content").removeChild(document.getElementById("content").lastChild);
                    creatNewView(activId);
                    unactiveAllButtons();
                    $('#' + activId).attr("active", "true");
                }, 700);
            }
            else if ($(this).attr("active") != null) { //podwójne kliknięcie w ten sam przycisk
                hideOutContent();
                setTimeout(function () {
                        document.getElementById("content").removeChild(document.getElementById("content").lastChild);
                    unactiveAllButtons();
                }, 700);
            }
        }
    })
});

function unactiveAllButtons() {
    $('#nav').children().each( function( ) {
        $(this).children().removeAttr('active');
    });
}

function creatNewView( id) {
    console.log(id);
    if(id == "buttonAddNewGroup") {
        var div = document.createElement("DIV");
        div.id = "divAddNewGroup";
        div.setAttribute("class", "d-none");
        var divContent = document.getElementById("content");
        divContent.appendChild(div);

        var p = document.createElement('P');
        var text = document.createTextNode("Wpisz nazwę grupy");
        p.appendChild(text);
        div.appendChild(p);

        var subject = document.createElement("INPUT");
        subject.type = "text";
        subject.id = "input2";
        div.appendChild(subject);

        div.appendChild(document.createElement('BR'));
        div.appendChild(document.createElement('BR'));
        var button = document.createElement('BUTTON');
        var text = document.createTextNode("Zatwierdź");
        button.appendChild(text);
        div.appendChild(button);


        //pusty dive zabezpieczenia prz rozwijanu i zwijaniu
        var flag = document.createElement('div');
        flag.id = "divActive";
        div.appendChild(flag);


        div.removeAttribute("class");
        $("#divAddNewGroup").slideToggle(0);
        $("#divAddNewGroup").slideToggle(700);
    }

    else if(id == "buttonAddNewLesson"){
        var div = document.createElement("DIV");
        div.id = "divAddLessonForm";
        div.setAttribute("class", "d-none");
        var divContent = document.getElementById("content");
        divContent.appendChild(div);

        var p = document.createElement('P');
        var text = document.createTextNode("Wybierz date odbycia się zajęć");
        p.appendChild(text);
        div.appendChild(p);

        var data = document.createElement("INPUT");
        data.type = "date";
        data.id = "input1";
        div.appendChild(data);

        var p = document.createElement('P');
        var text = document.createTextNode("Wpisz nazwę tematu");
        p.appendChild(text);
        div.appendChild(p);


        var subject = document.createElement("INPUT");
        subject.type = "text";
        subject.id = "input2";
        div.appendChild(subject);

        var p = document.createElement('P');
        var text = document.createTextNode("Wybierz grupę, dla której stworzyć zajęcia");
        p.appendChild(text);
        div.appendChild(p);



        writeGroupList("divAddLessonForm");

        //$(document).ajaxStop(function () {
            // 0 === $.active
            div.appendChild(document.createElement('BR'));
            div.appendChild(document.createElement('BR'));
            var button = document.createElement('BUTTON');
            var text = document.createTextNode("Zatwierdź");
            button.appendChild(text);
            div.appendChild(button);


            //pusty dive zabezpieczenia prz rozwijanu i zwijaniu
            var flag = document.createElement('div');
            flag.id ="divActive";
            div.appendChild(flag);
        //});


        div.removeAttribute("class");
        $( "#divAddLessonForm" ).slideToggle( 0 );
        $( "#divAddLessonForm" ).slideToggle( 700 );
    }

    else if(id =="buttonSchoolDiary"){
        var div = document.createElement("DIV");
        div.id = "divSchoolDiary";
        div.setAttribute("class", "d-none");
        var divContent = document.getElementById("content");
        divContent.appendChild(div);

        var p = document.createElement('P');
        var text = document.createTextNode("Wybierz grupę");
        p.appendChild(text);
        div.appendChild(p);

        writeGroupList("divSchoolDiary");

       // $(document).ajaxStop(function () {
            // 0 === $.active
            div.appendChild(document.createElement('BR'));
            div.appendChild(document.createElement('BR'));
            var button = document.createElement('BUTTON');
            var text = document.createTextNode("Wybierz");
            button.appendChild(text);
            button.id = "buttonGetList";
            console.log("1");
            div.appendChild(button);

            var div2 = document.createElement("DIV");
            div2.id = "divStudentsList";
            div.appendChild(div2);

            var flag = document.createElement('div');
            flag.id ="divActive";
            div.appendChild(flag);
       // });

        button.onclick = buttonGetListInit;
        div.removeAttribute("class");
        $( "#divSchoolDiary" ).slideToggle( 0 );
        $( "#divSchoolDiary" ).slideToggle( 700 );
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

function hideOutContent() {
    wiatForFreeButton = true;
    if(document.getElementById("divActive")!= null){
        var div = document.getElementById("content").lastChild;
        console.log(div);
        var id = div.getAttribute("id");
        $ ("#"+id).slideToggle(700);
        wiatForFreeButton = false;
    }
}

function buttonGetListInit(){
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

function creatUserRow(userData){
    var p = document.createElement('P');
    var text = document.createTextNode(userData.name);
    p.appendChild(text);
    $('#divStudentsList').append(p);

}