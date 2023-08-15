const skillTag = $('.skilltag-container');
let checkedTags = [];

$('#submit').click(function () {
    let content = editorContent.innerHTML.replace(/(<([^>]+)>)/gi, "");
    let title = $('.form-control').val();

    console.log(`제목 : ${title}, content : ${content}`);
})

$.get(ServerURL + '/api/tech/skillTags').then((tags) => {
    tags.forEach(element => {
        let newTag = `
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="TagCheck" data-id="${element.id}">
            <label class="form-check-label" for="TagCheck">
                ${element.name}
            </label>
        </div>
        `;

        skillTag.append(newTag);
    });

    $('.form-check-input').change(function (e) {
        if (e.target.checked) {
            checkedTags.push(e.target.dataset.id);
        } else {
            checkedTags.forEach((a) => {
                if (a == e.target.dataset.id) {
                    checkedTags = checkedTags.filter((tag) => tag !== e.target.dataset.id);
                }
            })
        }

        checkedTags.sort();
        console.log(checkedTags);
    })
})