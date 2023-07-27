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

let post_template = `
<li class="list-group-item">
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
</li>`;

let post_data = [
    {
        "title": "김재민의 편지15",
        "user": "한승규",
        "date": "2023-07-23 00:52:57.0"
    },
    {
        "title": "김재민의 편지15",
        "user": "한승규",
        "date": "2023-07-23 00:52:57.0"
    },
    {
        "title": "김재민의 편지15",
        "user": "한승규",
        "date": "2023-07-23 00:52:57.0"
    },
    {
        "title": "김재민의 편지15",
        "user": "한승규",
        "date": "2023-07-23 00:52:57.0"
    },
    {
        "title": "김재민의 편지15",
        "user": "한승규",
        "date": "2023-07-23 00:52:57.0"
    },
    {
        "title": "김재민의 편지15",
        "user": "한승규",
        "date": "2023-07-23 00:52:57.0"
    },
    {
        "title": "김재민의 편지15",
        "user": "한승규",
        "date": "2023-07-23 00:52:57.0"
    },
    {
        "title": "김재민의 편지15",
        "user": "한승규",
        "date": "2023-07-23 00:52:57.0"
    }
]

// $.get('http://13.125.236.152:8080/api/home/tech-post').then((result) => {
//     post_data = JSON.parse(result);
// })

post_data.forEach(post => {
    post.date = StringToDate(post.date, 0);

    post_template = `
            <li class="list-group-item">
            <div class="row">
                <div class="col-8 post-title">${post.title}</div>
                <div class="row col-4">
                    <div class="text-center" style="width: 60%;">
                        <span class="user-name">${post.user}</span>
                    </div>
                    <div class="text-center" style="width: 40%;">
                        <span class="created-date">${post.date}</span>
                    </div>
                </div>
            </div>
            </li>`;

    list_position.append(post_template);
});
