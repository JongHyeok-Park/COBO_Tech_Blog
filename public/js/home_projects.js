const modalTitle = $('.modal-title');
const modalDate = $('.modal-date');
const modalContent = $('.project-modal-content');
const left_button = $('.control-prev');
const right_button = $('.control-next');
const slide = $('.silde-items-list');
let autoSlide;
let projectNum;
let now_position;

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

$.get(ServerURL + '/api/home/project').then((result) => {
    let count = 0;

    projectNum = result.length;
    now_position = projectNum;

    if (projectNum >= 4) {
        slide.css('width', (projectNum * 3 * 33.33333) + '%');
        slideItem.css('width', (100 / projectNum) + '%');

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
        slide.css('transform', 'translateX(' + (now_position * (-(100 / (projectNum * 3)))) + '%)');

        // 페이지 넘기기
        right_button.click(function () {
            now_position += 1;
            setPosition(now_position);
        })

        left_button.click(function () {
            now_position -= 1;
            setPosition(now_position);
        })

        // 슬라이드 자동 전환 시작
        autoSlide = setTimeout(intervalSetting, 5000);
    } else {
        slide.css('width', '100%');
        slide.css('display', 'flex');
        slide.css('justify-content', 'center');

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

        $('.slide-item').css('width', '33.333334%');
    }

    $('.card').click(function (e) {
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
})


