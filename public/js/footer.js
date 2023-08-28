const hitTime = 15;

// footer 에 load
$(document).ready(function () {
    $("footer").load("../../pages/includes/footer.html", function () {
        let isCount

        if (getCookie('hitCookie') === null) {
            isCount = true;
        } else {
            isCount = false;
        }

        setCookie('hitCookie', 1, hitTime);

        $.get(ServerURL + `/api/all/hit?isCount=${isCount}`).then((res) => {
            $('.hit-today').html("오늘 방문자 수 : " + res.today)
            $('.hit-total').html("누적 방문자 수 : " + res.total)
        }).catch((err) => {
            console.log(err);
        });
    });
});