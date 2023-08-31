const modalTitle = $('.modal-title');
const modalDate = $('.modal-date');
const modalContent = $('.project-modal-content');
const left_button = $('.control-prev');
const right_button = $('.control-next');
const slide = $('.silde-items-list');
let autoSlide;
let projectNum;
let now_position;
let count = 0;
let positionVar;
let mediaQ = matchMedia("screen and (max-width: 991px)");

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

function setProject(projects) {
    projects.forEach(item => {
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

function setModal() {
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
}

async function initialSetting(result) {
    if (projectNum <= 1) {
        for (let i = 0; i < 5; i++) {
            setProject(result);
        }

        if (mediaQ.matches) {
            slide.css('width', '500%');
        } else {
            slide.css('width', '166.67%');
        }
        $('.slide-item').css('width', '20%');
        positionVar = 5

        window.onresize = function () {
            if (mediaQ.matches) {
                slide.css('width', '500%');
            } else {
                slide.css('width', '166.67%');
            }
        }
    } else if (projectNum <= 2) {
        for (let i = 0; i < 4; i++) {
            count = (i * projectNum);
            setProject(result);
        }

        if (mediaQ.matches) {
            slide.css('width', '800%');
        } else {
            slide.css('width', '266.67%');
        }
        $('.slide-item').css('width', '12.5%');
        positionVar = 8

        window.onresize = function () {
            if (mediaQ.matches) {
                slide.css('width', '800%');
            } else {
                slide.css('width', '266.67%');
            }
        }
    } else {
        for (let i = 0; i < 3; i++) {
            count = (i * projectNum);
            setProject(result);
        }

        if (mediaQ.matches) {
            slide.css('width', (projectNum * 3 * 100) + '%');
        } else {
            slide.css('width', (projectNum * 100) + '%');
        }

        $('.slide-item').css('width', '20%');
        positionVar = projectNum * 3;

        window.onresize = function () {
            if (mediaQ.matches) {
                slide.css('width', (projectNum * 3 * 100) + '%');
            } else {
                slide.css('width', (projectNum * 100) + '%');
            }
        }
    }

    slide.css('transform', 'translateX(' + (-(100 / positionVar) * projectNum) + '%)');
}

$.get(ServerURL + '/api/home/project').then((result) => {
    projectNum = result.length;
    now_position = projectNum;

    initialSetting(result)

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

    setModal();
})


