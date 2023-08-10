const listContainer = $('.list-group');
const pageSelector = $('.selector-number');
const tagListContainer = $('.tag-list');
const pageSize = 10;
let currentPage = 1;
let postNum;
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

function toTagList(tags) {
    let tagTemplate = "";

    tags.forEach(tag => {
        tagTemplate = tagTemplate + `<span class="badge text-bg-secondary rounded-pill me-1"
        data-tag="${tag}">${tag}</span>`;
    });

    return tagTemplate;
}

function loadPosts(page) {
    currentPage = page;

    $.get(ServerURL + `/api/tech/posts?page=${page}&size=${pageSize}`).then((posts) => {
        listContainer.html("");
        posts.forEach(item => {

            item.createdAt = toDate(item.createdAt);
            item.skillTag = toTagList(item.skillTag);

            let template =
                `
                <li class="list-group-item">
                <h4 class="item-title"><a href="${item.url}">${item.title}</a></h4>
                <div class="item-user">
                    <div class="user-image"><img src="${item.user.imgUrl}"
                            alt=""></div>
                    <div class="user-info">
                        <span class="user-name">${item.user.name}</span>
                        <span class="created-date">${item.createdAt}</span>
                        <span class="user-description">${item.user.description}</span>
                    </div>
                </div>
                <p class="item-content">
                    <a href="${item.url}">
                        ${item.content}
                    </a>
                </p>
                <div class="tag-container">
                    ${item.skillTag}
                </div>
            </li>
            `;

            listContainer.append(template);
        });
    });
}

function loadPages() {
    $.get(ServerURL + "/api/tech/count").then((result) => {
        posttNum = result;
        totalPages = parseInt((postNum - 1) / pageSize) + 1;
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
            loadPosts(currentPage);
            loadPages();
        })
    });
}

$('.after').click(function () {
    currentPage = currentPage + 1;
    loadPosts(currentPage);
    loadPages();
})

$('.before').click(function () {
    currentPage = currentPage - 1;
    loadPosts(currentPage);
    loadPages();
})

$.get(ServerURL + '/api/tech/skillTags').then((tag) => {
    tag = toTagList(tag)
    tagListContainer.html('');
    tagListContainer.append(tag);
})

loadPosts(currentPage);
loadPages();