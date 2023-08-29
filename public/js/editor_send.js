const skillTag = $('.skilltag-container');
const postId = new URL(window.location).searchParams.get("id");
let method = 'POST';
let initialFileList = [];
let checkedTags = [];

if (!getCookie('AccessToken')) {
    alert('로그인 후 이용해주세요.');
    window.location.href = '/';
}

$.get(ServerURL + '/api/tech/skillTags').then((tags) => {
    tags.forEach(element => {
        let newTag = `
        <div class="form-check">
            <input class="form-check-input skill-tag-input" type="checkbox" value="${element.id}">
            <label class="form-check-label" for="TagCheck">${element.name}</label>
        </div>
        `;

        skillTag.append(newTag);
    });

    $('.skill-tag-input').change(function (e) {
        if (e.target.checked) {
            checkedTags.push(parseInt(e.target.value));
        } else {
            checkedTags.forEach((a) => {
                if (a == parseInt(e.target.value)) {
                    checkedTags = checkedTags.filter((tag) => tag != parseInt(e.target.value));
                }
            })
        }

        checkedTags.sort();
        console.log('skillTag : ' + checkedTags);
    })

    if (!!postId) {
        $.get(ServerURL + `/api/tech/post?techPostId=${postId}`).then((res) => {
            if (res.user.userId != getCookie('UserID')) {
                alert('수정 권한이 없습니다.');
                window.location.href = '/';
            }

            $('.content').html(res.detail);
            $('#floatingTextarea').val(res.title);
            $('#submit').html('수정하기');
            res.skillTags.forEach(tag => {
                for (let i = 0; i < $('.skill-tag-input').length; i++) {
                    if (tag.name == $('.form-check-label').eq(i).html()) {
                        $('.skill-tag-input').eq(i).prop('checked', true);
                        checkedTags.push($('.skill-tag-input').eq(i).val())
                    }
                }
            });
            method = 'PATCH'
            let contentImages = editorContent.getElementsByTagName('img');
            for (let i = 0; i < contentImages.length; i++) {
                initialFileList.push(parseInt(contentImages[i].dataset.id))
            }
        })
    }
})

$('#submit').click(function () {
    let content = editorContent.innerHTML.replace(/(<([^>]+)>)/gi, " ").replace(/&nbsp;/gi, "").substring(0, 400);
    let title = $('.form-control').val();
    let detail = editorContent.innerHTML;
    let fileList = [];
    let contentImages = editorContent.getElementsByTagName('img');
    let userId = getCookie('UserID');

    for (let i = 0; i < contentImages.length; i++) {
        fileList.push(contentImages[i].dataset.id)
    }


    // console.log(`제목 : ${title}`);
    // console.log(`content : ${content}`);
    // console.log(`detail : ${detail}`);
    // console.log(fieldList);
    // console.log(checkedTags);
    // console.log(JSON.stringify({
    //     "content": content,
    //     "detail": detail,
    //     "fileIdList": fieldList,
    //     "skillTagIdList": checkedTags,
    //     "title": title,
    //     "userId": userId
    // }))

    loginCheck.then(() => {
        if (method == 'POST') {
            $.ajax({
                type: 'POST',
                url: ServerURL + '/api/tech/post',
                data: JSON.stringify({
                    "content": content,
                    "detail": detail,
                    "fileIdList": fileList,
                    "skillTagIdList": checkedTags,
                    "title": title,
                    "userId": userId
                }),
                contentType: 'application/json; charset=utf-8',
                headers: {
                    "Authorization": 'Bearer ' + getCookie('AccessToken')
                }
            }).then((res) => {
                alert('작성 완료.');
                window.location.href = '/tech.html';
            }).catch((err) => {
                alert('작성 실패.');
                console.log(err);
            })
        } else if (method == 'PATCH') {
            console.log('수정');
            let deleteFileList = [];
            deleteFileList = initialFileList.filter(item => !initialFileList.includes(item) || !fileList.includes(item));

            $.ajax({
                type: 'PATCH',
                url: ServerURL + '/api/tech/post',
                data: JSON.stringify({
                    "content": content,
                    "deleteFileIdList": deleteFileList,
                    "detail": detail,
                    "fileIdList": fileList,
                    "skillTagIdList": checkedTags,
                    "title": title,
                    "techPostId": postId
                }),
                contentType: 'application/json; charset=utf-8',
                headers: {
                    "Authorization": 'Bearer ' + getCookie('AccessToken')
                }
            }).then((res) => {
                alert('작성 완료.');
                window.location.href = '/tech.html';
            }).catch((err) => {
                alert('작성 실패.');
                console.log(err);
            })
        }
    }).catch(() => {
        alert('로그인 후 이용해주세요.');
        window.location.href = '/';
    })
})

