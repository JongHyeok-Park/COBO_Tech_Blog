const container = $('.projects-container');
const pageSelector = $('.selector-number');
const modalTitle = $('.modal-title');
const modalDate = $('.modal-date');
const modalContent = $('.project-modal-content');
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
    mm = Number(mm) - 1;

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
    let fontColor;

    tags.forEach(tag => {
        if (tag.isBlack) {
            fontColor = 'black';
        } else {
            fontColor = 'white';
        }
        tagTemplate = tagTemplate + `<span class="badge rounded-pill me-1" style="color: ${fontColor}; background: ${tag.color};">${tag.name}</span>`;
    });

    return tagTemplate;
}

function loadProjects(page) {
    currentPage = page;

    $.get(ServerURL + `/api/project/projects?page=${page}&size=${pageSize}`).then((projects) => {
        container.html("");
        projects.forEach(item => {

            item.createdAt = toDate(item.createdAt);
            item.users = toMemberList(item.users);
            item.skillTags = toTagList(item.skillTags);

            let template =
                `
            <div class="project-item" data-id="${item.id}">
                <div class="card m-auto">
                    <div class="card-img-container">
                        <img src="${item.imgUrl}" class="card-img-top" alt="로딩중">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary row">
                            <span class="col-lg-8 user-list">${item.users}</span>
                            <span class="col-lg-4 created-at">${item.createdAt}</span>
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

        $('.project-item').click(function (e) {
            modalTitle.html('');
            modalDate.html('');
            modalContent.html(`<div class="h-100 d-flex justify-content-center align-items-center"><div class="spinner-border text-center" role="status">
            <span class="visually-hidden">Loading...</span>
            </div></div>`);
            $.get(ServerURL + `/api/project/project?projectId=${this.dataset.id}`).then((item) => {
                $('#md-container').load(location.href + ' #md-container', function () {
                    modalTitle.html(item.title);
                    modalDate.html(toDate(item.created_at));
                    modalContent.html(`<md-block src="${item.url}"></md-block>`);
                });
            })
            modal.css('transition', 'all 0.5s');
            modal.css('visibility', 'visible');
            setTimeout(function () {
                modal.css('opacity', '1');
            }, 100)
            setTimeout(function () {
                modal.css('transition', 'none');
            }, 600);
        })
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
            window.scrollTo({ top: 0, behavior: "smooth" });
        })
    });
}

$('.after').click(function () {
    currentPage = currentPage + 1;
    loadProjects(currentPage);
    loadPages();
    window.scrollTo({ top: 0, behavior: "smooth" });
})

$('.before').click(function () {
    currentPage = currentPage - 1;
    loadProjects(currentPage);
    loadPages();
    window.scrollTo({ top: 0, behavior: "smooth" });
})

loadProjects(currentPage);
loadPages();
