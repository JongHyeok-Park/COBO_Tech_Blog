const member_list = $('.list-group');

{/* <li class="list-group-item">
    <img src="${member.imgUrl}" alt="" width="100px">
        <div class="member-info">
            <span class="member-name">${member.name}</span>
            <span class="member-position">${member.position}</span>
            <span class="member-description">${member.description}</span>
            <span class="member-email">email: ${member.email}</span>
            <span class="member-github">github: <a
                href="${member.github}">${member.github}</a></span>
        </div>
</li> */}

let member_data = [
    {
        "imgUrl": "https://avatars.githubusercontent.com/u/114932050?v=4",
        "name": "박종혁",
        "email": "jhpmuscle@gmail.com",
        "github": "https://github.com/JongHyeok-Park",
        "description": null,
        "position": "FRONT"
    },
    {
        "imgUrl": "https://avatars.githubusercontent.com/u/140155231?v=4",
        "name": "김병찬",
        "email": "kbckim9930@naver.com",
        "github": "https://github.com/byungchankim99",
        "description": null,
        "position": "FRONT"
    },
    {
        "imgUrl": "https://avatars.githubusercontent.com/u/119861971?v=4",
        "name": "홍세현",
        "email": "1imepie.c1oud9@gmail.com",
        "github": "https://github.com/c1oud99",
        "description": null,
        "position": "FRONT"
    },
    {
        "imgUrl": "https://avatars.githubusercontent.com/u/98071131?v=4",
        "name": "한승규",
        "email": "trust1204@gmail.com",
        "github": "https://github.com/Seungkyu-Han",
        "description": "100년 뒤 개발자 한승규입니다.",
        "position": "BACK"
    },
    {
        "imgUrl": "https://i.namu.wiki/i/YuOBmAJlCd_LA3ZunhrIEXbw4CwzxneyYOOe4WQcBOHXuIBqIWT0RvDL3rRx1OTx5sQ0R4GIeebLJLz_ZSNHbQ.webp",
        "name": "장첸",
        "email": "하얼빈@gmail.com",
        "github": "https://github.com/DogNeet",
        "description": "내 돈 아이갚니?",
        "position": "사채업자"
    }
];

// $.get('http://13.125.236.152:8080/api/about/members').then((result) => {
//     member_data = JSON.parse(result);
// })

member_data.forEach(member => {
    template = `
    <li class="list-group-item">
        <img src="${member.imgUrl}" alt="" width="100px">
            <div class="member-info">
                <span class="member-name">${member.name}</span>
                <span class="member-position">${member.position}</span>
                <span class="member-description">${member.description}</span>
                <span class="member-email">email: ${member.email}</span>
                <span class="member-github">github: <a
                    href="${member.github}">${member.github}</a></span>
            </div>
    </li>
    `;

    member_list.append(template);
})