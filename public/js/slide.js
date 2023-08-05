const left_button = $('.control-prev');
const right_button = $('.control-next');
const slide = $('.silde-items-list');

// Initail Setting
let now_position = 6;
slide.css('transform', 'translateX(' + (now_position * (-5.55)) + '%)');

function intervalSetting() {
    now_position += 1;
    setPosition(now_position);
}

function buttonDisable(state) {
    left_button.prop('disabled', state);
    right_button.prop('disabled', state);
}

function setPosition(position) {
    buttonDisable(true);
    clearTimeout(autoSlide);
    slide.css('transition', 'all 0.5s');
    slide.css('transform', 'translateX(' + (position * (-5.55)) + '%)');
    setTimeout(function () {
        positionCheck();
        slide.css('transition', 'all 0s');
        buttonDisable(false);
        autoSlide = setTimeout(intervalSetting, 4500);
    }, 500);
}

function positionCheck() {
    if (now_position >= 12) {
        now_position = 6;
        slide.css('transform', 'translateX(' + (now_position * (-5.55)) + '%)');
    } else if (now_position <= 0) {
        now_position = 6;
        slide.css('transform', 'translateX(' + (now_position * (-5.55)) + '%)');
    }
}

// 슬라이드 자동 전환 시작
let autoSlide = setTimeout(intervalSetting, 5000);

// 페이지 넘기기
right_button.click(function () {
    now_position += 1;
    setPosition(now_position);
})

left_button.click(function () {
    now_position -= 1;
    setPosition(now_position);
})