jQuery(function ($) { // poczekanie az strona sie w pełni załaduje
    $('#buttonGetList').on('click', function () {
        var select = $('.groupList option:selected').text();
        $.ajax({
            type: "POST",
            cash: false,
            data: {
                'select': select
            },
            url: "../project-ai/scripts/getList.php",
            dataType: 'text',
            success: function (result) {
                console.log(result);
                $('#test').empty();
                $('#test').append(result);
            },
            complete: function () {
            },
            error: function () {
                console.log("error");
            }
        });
    })
});