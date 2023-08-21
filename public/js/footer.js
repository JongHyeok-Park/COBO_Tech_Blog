// footer 에 load
$(document).ready(function () {
    $("footer").load("../../pages/includes/footer.html");

    $.get(ServerURL + "/api/all/hit").then((res) => {
        $('.hit-today').html("오늘 방문자 수 : " + res.today)
        $('.hit-total').html("누적 방문자 수 : " + res.total)
    });
})