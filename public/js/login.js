const loginCode = new URL(window.location).searchParams.get("code");
const accessTime = 2 * 60;
const refreshTime = 24 * 60 * 7;

if (!!loginCode) {
    $.get(ServerURL + `/api/all/login?code=${loginCode}`).then((res) => {
        setCookie('AccessToken', res.accessToken, accessTime);
        setCookie('RefreshToken', res.refreshToken, refreshTime);
        setCookie('UserID', res.userId, accessTime);
        window.location.href = '/';
    }).catch(() => {
        window.location.href = '/login_fail.html';
    })
} else {
    alert('잘못된 접근입니다.');
    window.location.href = '/';
}