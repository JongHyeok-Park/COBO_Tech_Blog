const container = $('.projects-container');
const pageSelector = $('.selector-number');
const pageSize = 8;
let currentPage = 1;
let projectNum;
let totalPages;
let startPage;
let endPage;

function toDate(date) {
    let yyyy = date.substring(0, 4);
    let mm = date.substring(4, 6);
    let dd = date.substring(6, 8);

    let stringNewDate = new Date(yyyy, mm, dd);
    stringNewDate.setDate(stringNewDate.getDate());

    return stringNewDate.getFullYear() +
        "-" + ((stringNewDate.getMonth() + 1) > 9 ? (stringNewDate.getMonth() + 1).toString() : "0" + (stringNewDate.getMonth() + 1)) +
        "-" + (stringNewDate.getDate() > 9 ? stringNewDate.getDate().toString() : "0" + stringNewDate.getDate().toString());
}

function toMemberList(members) {
    let list = "";
    list = list + '<div class="user-img-container">'
    for (let i = 0; i < members.length; i++) {
        list = list + `<img class="user-img" src="${members[i].imgUrl}" alt="">`;
    }
    list = list + '</div>'

    for (let i = 0; i < members.length; i++) {
        list = list + members[i].name;
        if (i < members.length - 1) {
            list = list + ", ";
        }
    }

    return list;
}

function toTagList(tags) {
    let tagTemplate = "";

    tags.forEach(tag => {
        tagTemplate = tagTemplate + `<span class="badge text-bg-secondary rounded-pill me-1"
        data-tag="${tag}">${tag}</span>`;
    });

    return tagTemplate;
}

function loadProjects(page) {
    currentPage = page;

    $.get(ServerURL + `/api/project/project-cards?page=${page}&size=${pageSize}`).then((projects) => {
        container.html("");
        projects.forEach(item => {

            item.createdAt = toDate(item.createdAt);
            item.users = toMemberList(item.users);
            item.skillTags = toTagList(item.skillTags);

            let template =
                `
            <div class="project-item col-6 my-3">
                <div class="card m-auto">
                    <img src="${item.imgUrl}"
                        class="card-img-top"
                        alt="로딩중">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary row">
                            <span class="col-8 user-list">${item.users}</span>
                            <span class="col-4 float-end text-end">${item.createdAt}</span>
                        </h6>
                        <p class="card-text">${item.description}</p>
                        <div class="card-tag">
                            ${item.skillTags}
                        </div>
                    </div>
                </div>
            </div>
            `;

            container.append(template);
        });
    });
}

function loadPages() {
    $.get(ServerURL + "/api/project/count").then((result) => {
        projectNum = result;
        totalPages = parseInt((projectNum - 1) / pageSize) + 1;
        pageSelector.html("");

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                if (currentPage == i) {
                    let listTempalte = `<li class="selector-item active" data-page="${i}">${i}</li>`
                    pageSelector.append(listTempalte);
                } else {
                    let listTempalte = `<li class="selector-item" data-page="${i}">${i}</li>`
                    pageSelector.append(listTempalte);
                }
            }
        } else if (totalPages > 5) {
            if (currentPage <= 5) {
                for (let i = 1; i <= 5; i++) {
                    if (currentPage == i) {
                        let listTempalte = `<li class="selector-item active" data-page="${i}">${i}</li>`
                        pageSelector.append(listTempalte);
                    } else {
                        let listTempalte = `<li class="selector-item" data-page="${i}">${i}</li>`
                        pageSelector.append(listTempalte);
                    }
                }
                $('.after').css('display', 'inline-block');
                $('.before').css('display', 'none');
            } else {
                let pageList = parseInt(currentPage / 5) * 5 + 1;
                if (totalPages > pageList + 5) {
                    for (let i = pageList; i <= pageList + 4; i++) {
                        if (currentPage == i) {
                            let listTempalte = `<li class="selector-item active" data-page="${i}">${i}</li>`
                            pageSelector.append(listTempalte);
                        } else {
                            let listTempalte = `<li class="selector-item" data-page="${i}">${i}</li>`
                            pageSelector.append(listTempalte);
                        }
                    }
                    $('.after').css('display', 'inline-block');
                    $('.before').css('display', 'inline-block');
                } else {
                    for (let i = pageList; i <= totalPages; i++) {
                        if (currentPage == i) {
                            let listTempalte = `<li class="selector-item active" data-page="${i}">${i}</li>`
                            pageSelector.append(listTempalte);
                        } else {
                            let listTempalte = `<li class="selector-item" data-page="${i}">${i}</li>`
                            pageSelector.append(listTempalte);
                        }
                    }
                    $('.after').css('display', 'none');
                    $('.before').css('display', 'inline-block');
                }
            }
        }

        $('.selector-item').click(function (e) {
            let pageNum = e.target.dataset.page;
            currentPage = pageNum;
            loadProjects(currentPage);
            loadPages();
        })
    });
}

$('.after').click(function () {
    currentPage = currentPage + 1;
    loadProjects(currentPage);
    loadPages();
})

$('.before').click(function () {
    currentPage = currentPage - 1;
    loadProjects(currentPage);
    loadPages();
})

loadProjects(currentPage);
loadPages();


// template //
// <div class="project-item col-6 my-3">
//     <div class="card m-auto">
//         <img src="https://t3.ftcdn.net/jpg/02/15/15/46/360_F_215154625_hJg9QkfWH9Cu6LCTUc8TiuV6jQSI0C5X.jpg"
//             class="card-img-top"
//             alt="로딩중">
//         <div class="card-body">
//             <h5 class="card-title">기가 막힌 프로젝트</h5>
//             <h6 class="card-subtitle mb-2 text-body-secondary row">
//                 <span class="col-8">한승규, 박종혁, 홍세현, 김병찬, 김재민</span>
//                 <span class="col-4 float-end text-end">2023-11-11</span>
//             </h6>
//             <p class="card-text">내용 들어가는 부분입니다.</p>
//             <div class="card-tag">
//                 <span class="badge text-bg-secondary rounded-pill me-1"
//                     data-tag="SpringBoot">SpringBoot</span>
//                 <span class="badge text-bg-secondary rounded-pill me-1" data-tag="HTML5">HTML5</span>
//                 <span class="badge text-bg-secondary rounded-pill me-1" data-tag="CSS3">CSS3</span>
//             </div>
//         </div>
//     </div>
// </div>