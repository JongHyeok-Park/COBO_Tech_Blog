const modalTitle = $('.modal-title');
const modalDate = $('.modal-date');
const modalContent = $('md-block');
let projectNum;

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

$.get(ServerURL + '/api/home/project').then((result) => {
    let count = 0;

    projectNum = result.length

    if (projectNum >= 3) {
        for (let i = 0; i < 3; i++) {
            count = (i * projectNum);
            result.forEach(item => {
                let template = `
                <div class="slide-item">
                    <div class="card m-auto" data-id="${item.projectId}">
                        <div class="card-img-container">
                            <img src="${item.imgUrl}" class="card-img-top" alt="Loading...">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                            <p class="card-text">${item.description}</p>
                            <div class="card-tag"></div>
                        </div>
                    </div>
                </div>
                `;

                $('.silde-items-list').append(template);
                item.skillTag.forEach((tag) => {
                    let fontColor;
                    if (tag.isBlack) {
                        fontColor = 'black';
                    } else {
                        fontColor = 'white';
                    }
                    $('.card-tag').eq(count).append(`<span class="badge rounded-pill me-1" style="color: ${fontColor}; background: ${tag.color};">${tag.name}</span>`)
                });
                count += 1;
            });
        }
    }

    $('.card').click(function (e) {
        modalTitle.html('');
        modalDate.html('');
        modalContent.html(`<div class="h-100 d-flex justify-content-center align-items-center"><div class="spinner-border text-center" role="status">
        <span class="visually-hidden">Loading...</span>
      </div></div>`);
        $.get(ServerURL + `/api/project/project?projectId=${this.dataset.id}`).then((item) => {
            modalTitle.html(item.title);
            modalDate.html(toDate(item.created_at));
            modalContent.html('');
            modalContent.attr('src', item.url);
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
})


