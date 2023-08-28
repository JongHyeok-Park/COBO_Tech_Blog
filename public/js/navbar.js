// id = "custom-navbar" 에 load
const accessTime = 2 * 60;
const refreshTime = 24 * 60 * 7;

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

        $('#login').click(function (e) {
            if (getCookie('AccessToken') === null) {
                if (getCookie('RefreshToken') === null) {
                    window.location.href = 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=a5db3264dd140555c88490019e16b3d5&redirect_uri=https://team-cobo.site/login.html';
                } else {
                    $.ajax({
                        url: ServerURL + "api/all/login",
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
                        window.location.href = '/';
                    }).catch(() => {
                        window.location.href = '/login_fail.html';
                    })
                }
            } else {
                window.location.assign = '/';
            }
        })

        $('#logout').click(function (e) {
            deleteCookie('AccessToken');
            window.location.assign = '/';
        })

        if (!!getCookie('AccessToken')) {
            $('#login').css('display', 'none');
            $('#logout').css('display', 'inline-block');
        }
    });
})



