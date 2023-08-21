const member_list = $('.list-group');

$.get(ServerURL + '/api/about/members').then((result) => {
    let template;

    result.forEach(member => {

        template = `
        <li class="list-group-item">
            <img src="${member.imgUrl}" alt="" width="100px">
                <div class="member-info">
                    <span class="member-name">${member.name}</span>
                    <span class="member-description">${member.description}</span>
                    <span class="member-email">email: ${member.email}</span>
                    <span class="member-github">github: <a href="${member.github}">${member.github}</a></span>
                </div>
        </li>
        `;

        member_list.append(template);
    })
})
