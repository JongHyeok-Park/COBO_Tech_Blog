const accessTime = 2 * 60;
const refreshTime = 24 * 60 * 7;

// id = "custom-navbar" 에 load
$(document).ready(function () {
    $("#custom-navbar").load("../../pages/includes/navbar.html", function () {
        let path = window.location.pathname;
        let page = path.split("/").pop();

        switch (page) {
            case "about.html":
                document.querySelectorAll('.nav-item a')[0].classList.add('active');
                break;
            case "tech.html":
                document.querySelectorAll('.nav-item a')[1].classList.add('active');
                break;
            case "projects.html":
                document.querySelectorAll('.nav-item a')[2].classList.add('active');
                break;
            default:
                break;
        }

        // Toggle button
        $('.navbar-toggler').click(function (e) {
            $('#navbarNav').toggle('show');
        })

        $('.dropdown-toggle').click(function (e) {
            $('.dropdown-menu').toggle('show');
        })

        if (!getCookie('AccessToken')) {
            if (!!getCookie('RefreshToken')) {
                $.ajax({
                    url: ServerURL + "/api/all/login",
                    type: 'PATCH',
                    contentType: "application/json; charset=UTF-8",
                    data: JSON.stringify({
                        "refreshToken": `${getCookie('RefreshToken')}`
                    }),
                    headers: {
                        "Authorization": 'Bearer ' + getCookie('RefreshToken')
                    }
                }).then((res) => {
                    setCookie('AccessToken', res.accessToken, accessTime);
                    setCookie('RefreshToken', res.refreshToken, refreshTime);
                    setCookie('UserID', res.userId, accessTime);
                    window.location.reload();
                })
            }
        }

        $('#login').click(function (e) {
            window.location.href = 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=a5db3264dd140555c88490019e16b3d5&redirect_uri=https://team-cobo.site/login.html';
        })

        $('#logout').click(function (e) {
            $.ajax({
                url: ServerURL + '/api/all/login',
                type: 'DELETE',
                contentType: "application/json; charset=UTF-8",
                data: JSON.stringify({
                    "refreshToken": `${getCookie('RefreshToken')}`
                })
            }).then(() => {
                deleteCookie('AccessToken');
                deleteCookie('RefreshToken');
                deleteCookie('UserID');
                window.location.reload();
            })
        })

        loginCheck.then((res) => {
            $('#login').css('display', 'none');
            $('.current-user').css('display', 'inline-block');
            $('#current-user-img').attr('src', res.imgUrl);
            $('#current-user-name').html(res.name);
        }).catch(() => {
            $('#login').css('display', 'inline-block');
            $('.current-user').css('display', 'none');
        })
    });
})
