const member_list = $('.member-group');

$.get(ServerURL + '/api/about/members').then((result) => {
    let template;

    result.forEach(member => {

        template = `
        <div class="member-card">
                    <div class="member-img-container">
                        <div class="member-img-inner">
                            <img class="member-img" src="${member.imgUrl}" alt="">
                        </div>
                    </div>
                    <div class="member-info">
                        <h4 class="member-name">${member.name}</h4>
                        <p class="member-description">${member.description}</p>
                        <div class="member-link">
                            <span class="member-email">
                                <a href="mailto: ${member.email}">
                                    <i class="fa-regular fa-envelope fa-2x"></i>
                                </a>
                            </span>
                            <span class="member-github">
                                <a href="${member.github}" target="_blank">
                                    <i class="fa-brands fa-github fa-2x"></i>
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
        `;

        member_list.append(template);
    })
})