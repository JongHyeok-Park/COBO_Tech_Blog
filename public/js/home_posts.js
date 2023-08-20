const list_position = $('.list-group');

// Date(YYYY-MM-DD) + n일
function StringToDate(date, n) {
    let yyyy = date.substring(0, 4);
    let mm = date.substring(5, 7);
    let dd = date.substring(8, 10);
    mm = Number(mm) - 1;

    let stringNewDate = new Date(yyyy, mm, dd);
    stringNewDate.setDate(stringNewDate.getDate() + n);

    return stringNewDate.getFullYear() +
        "-" + ((stringNewDate.getMonth() + 1) > 9 ? (stringNewDate.getMonth() + 1).toString() : "0" + (stringNewDate.getMonth() + 1)) +
        "-" + (stringNewDate.getDate() > 9 ? stringNewDate.getDate().toString() : "0" + stringNewDate.getDate().toString());
}

$.get(ServerURL + '/api/home/tech-post').then((result) => {
    result.forEach(post => {
        post.date = StringToDate(post.date, 0);

        let post_template = `
                <li class="list-group-item">
                <div class="row">
                    <div class="col-lg-8 post-title">${post.title}</div>
                    <div class="row col-lg-4 post-user">
                        <div class="user-name">
                            <span>${post.user}</span>
                        </div>
                        <div class="created-date">
                            <span>${post.date}</span>
                        </div>
                    </div>
                </div>
                </li>`;

        list_position.append(post_template);
    });
})

// template //
{/* <li class="list-group-item">
<div class="row">
    <div class="col-8 post-title">TITLE</div>
    <div class="row col-4">
        <div class="text-center" style="width: 60%;">
            <span class="user-name">USER</span>
        </div>
        <div class="text-center" style="width: 40%;">
            <span class="created-date">DATE</span>
        </div>
    </div>
</div>
</li> */}