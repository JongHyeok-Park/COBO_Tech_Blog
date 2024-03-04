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
    slide.css('transform', 'translateX(' + (-(100 / positionVar) * now_position) + '%)');
    setTimeout(function () {
        positionCheck();
        slide.css('transition', 'all 0s');
        buttonDisable(false);
        autoSlide = setTimeout(intervalSetting, 4500);
    }, 500);
}

function positionCheck() {
    if (now_position >= projectNum * 2) {
        now_position = projectNum;
        slide.css('transform', 'translateX(' + (-(100 / positionVar) * now_position) + '%)');
    } else if (now_position <= 0) {
        now_position = projectNum;
        slide.css('transform', 'translateX(' + (-(100 / positionVar) * now_position) + '%)');
    }
}