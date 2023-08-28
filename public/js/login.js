const loginCode = new URL(window.location).searchParams.get("code");
const accessTime = 2 * 60;
const refreshTime = 24 * 60 * 7;

if (!!loginCode) {
    $.get(ServerURL + `/api/all/login?code=${loginCode}`).then((res) => {
        setCookie('AccessToken', res.accessToken, accessTime);
        setCookie('RefreshToken', res.refreshToken, refreshTime);
        window.location.href = '/';
    }).catch(() => {
        window.location.href = '/login_fail.html';
    })
} else {
    window.location.href = '/login_fail.html';
}