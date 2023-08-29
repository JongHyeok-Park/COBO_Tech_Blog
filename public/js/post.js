const tagListContainer = $('.tag-list');
const postContainer = $('.post-container');
const postContent = $('.post-content');
const postTitle = $('.post-title');
const userName = $('.user-name');
const userDescription = $('.user-description');
const createdAt = $('.created-date');
const userImg = $('.user-image img');
const tagContainer = $('.tag-container');
const postURL = window.location;
const postId = new URL(postURL).searchParams.get("id");
let userId;

console.log(postId);

// 날짜 포매팅
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

// 사이드바 태그 리스트
function toTagList(tags) {
    let tagTemplate = "";

    tags.forEach(tag => {
        tagTemplate = tagTemplate + `<li class="list-group-item skill-tag"
        data-tag="${tag.name}" data-tag-id="${tag.id}">#${tag.name}</li>`;
    });

    return tagTemplate;
}

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

$.get(ServerURL + `/api/tech/post?techPostId=${postId}`).then((post) => {
    document.title = 'CoBo Developers - ' + post.title;
    postTitle.html(post.title);
    userName.html(post.user.name);
    userDescription.html(post.user.description);
    createdAt.html(toDate(post.createdAt));
    userImg.attr('src', `${post.user.imgUrl}`);
    postContent.append(post.detail);
    tagContainer.append(toTag(post.skillTags))
    userId = post.user.userId;

    loginCheck.then(() => {
        if (getCookie('UserID') == userId) {
            $('#delete').css('display', 'inline-block');
            $('#update').css('display', 'inline-block');

            $('#delete').click(function () {
                $.ajax({
                    type: 'DELETE',
                    url: ServerURL + `/api/tech/post?techPostId=${postId}`,
                    headers: {
                        "Authorization": 'Bearer ' + getCookie('AccessToken')
                    }
                }).then(() => {
                    alert('삭제 완료.');
                    window.location.href = '/tech.html';
                })
            })

            $('#update').click(function () {
                window.location.href = '/edit.html?id=' + postId;
            })
        }
    })
})

$.get(ServerURL + '/api/tech/skillTags').then((tag) => {
    tag = toTagList(tag)
    tagListContainer.html('');
    tagListContainer.append(tag);

    $('.tag-list .skill-tag').click(function (e) {
        let tagId = e.target.dataset.tagId;
        window.location.assign('/tech.html?skillTagId=' + tagId);
    })
})