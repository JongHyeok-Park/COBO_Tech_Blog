const listContainer = $('.item-list');
const pageSelector = $('.selector-number');
const tagListContainer = $('.tag-list');
const pageSize = 10;
const postURL = window.location;
const paramId = new URL(postURL).searchParams.get("skillTagId");
let currentPage = 1;
let currentTag = 0;
let postNum;
let totalPages;
let startPage;
let endPage;

if (!!paramId) {
    console.log(paramId);
    currentTag = paramId;
}

// 날짜 포매팅
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

// 블로그 리스트 안에 태그
function toTag(tags) {
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

// 사이드바 태그 리스트
function toTagList(tags) {
    let tagTemplate = "";

    tags.forEach(tag => {
        tagTemplate = tagTemplate + `<li class="list-group-item skill-tag"
        data-tag="${tag.name}" data-tag-id="${tag.id}">#${tag.name}</li>`;
    });

    return tagTemplate;
}

// 블로그 글들 불러오기
function loadPosts(page) {
    currentPage = page;

    $.get(ServerURL + `/api/tech/posts?page=${page}&size=${pageSize}&skillTagId=${currentTag}`).then((posts) => {
        if (currentTag != 0) {
            $('.skill-tag').removeClass('custom-active');
            $('.skill-tag').eq(currentTag - 1).addClass('custom-active');
        }

        listContainer.html("");
        posts.forEach(item => {

            item.createdAt = toDate(item.createdAt);
            item.skillTags = toTag(item.skillTags);

            let template =
                `
                    <li class="list-group-item">
                    <h4 class="item-title"><a href="/post.html?id=${item.id}">${item.title}</a></h4>
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
                        <a href="/post.html?id=${item.id}">
                            ${item.content}
                        </a>
                    </p>
                    <div class="tag-container">
                        ${item.skillTags}
                    </div>
                </li>
                `;

            listContainer.append(template);
        });
    });
}

// 페이지 넘버링
function loadPages() {
    $.get(ServerURL + `/api/tech/count?skillTagId=${currentTag}`).then((result) => {
        postNum = result;
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
            window.scrollTo({ top: 0, behavior: "smooth" });
        })
    });
}

$('.after').click(function () {
    currentPage = currentPage + 1;
    loadPosts(currentPage);
    loadPages();
    window.scrollTo({ top: 0, behavior: "smooth" });
})

$('.before').click(function () {
    currentPage = currentPage - 1;
    loadPosts(currentPage);
    loadPages();
    window.scrollTo({ top: 0, behavior: "smooth" });
})

$.get(ServerURL + '/api/tech/skillTags').then((tag) => {
    tag = toTagList(tag)
    tagListContainer.html('');
    tagListContainer.append(tag);

    $('.tag-list .skill-tag').click(function (e) {
        let tagId = e.target.dataset.tagId;
        currentTag = tagId;
        currentPage = 1;
        loadPosts(currentPage);
        loadPages();
        window.scrollTo({ top: 0, behavior: "smooth" });
    })
})

loadPosts(currentPage);
loadPages();

