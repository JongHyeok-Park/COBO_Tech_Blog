const skillTag = $('.skilltag-container');
let checkedTags = [];
let userId;

$('#submit').click(function () {
    if (userId == null) {
        alert('업로드 유저를 고르세요.');
    }

    let content = editorContent.innerHTML.replace(/(<([^>]+)>)/gi, " ").replace(/&nbsp;/gi, "").substring(0, 400);
    let title = $('.form-control').val();
    let detail = editorContent.innerHTML;
    let fieldList = [];
    let contentImages = editorContent.getElementsByTagName('img');

    for (let i = 0; i < contentImages.length; i++) {
        fieldList.push(parseInt(contentImages[i].dataset.id))
    }

    console.log(`제목 : ${title}`);
    console.log(`content : ${content}`);
    console.log(`detail : ${detail}`);
    console.log(fieldList);
    console.log(checkedTags);
    console.log(JSON.stringify({
        "content": content,
        "detail": detail,
        "fileIdList": fieldList,
        "skillTagIdList": checkedTags,
        "title": title,
        "userId": userId
    }))

    // $.ajax({
    //     type: 'POST',
    //     url: ServerURL + '/api/tech/post',
    //     data: JSON.stringify({
    //         "content": content,
    //         "detail": detail,
    //         "fileIdList": fieldList,
    //         "skillTagIdList": checkedTags,
    //         "title": title,
    //         "userId": userId
    //     }),
    //     contentType: 'application/json; charset=utf-8'
    // }).then((res) => {
    //     alert('작성 완료.');
    //     window.location.assign('/');
    // }).catch((err) => {
    //     alert('작성 실패');
    //     console.log(err);
    // })
})

$.get(ServerURL + '/api/tech/skillTags').then((tags) => {
    tags.forEach(element => {
        let newTag = `
        <div class="form-check">
            <input class="form-check-input skill-tag-input" type="checkbox" value="${element.id}">
            <label class="form-check-label" for="TagCheck">
                ${element.name}
            </label>
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
})

$('.user-input').change(function (e) {
    userId = parseInt(e.target.dataset.id);
    console.log('user : ' + userId);
})