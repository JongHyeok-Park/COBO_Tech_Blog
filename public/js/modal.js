const modal = $('.project-modal');
const closeButton = $('.modal-close');
const background = $('.project-modal-background');

closeButton.click(function () {
    modal.css('transition', 'all 0.5s');
    modal.css('opacity', '0');
    setTimeout(function () {
        modal.css('visibility', 'hidden');
        modal.css('transition', 'none');
    }, 500);
})

background.click(function () {
    modal.css('transition', 'all 0.5s');
    modal.css('opacity', '0');
    setTimeout(function () {
        modal.css('visibility', 'hidden');
        modal.css('transition', 'none');
    }, 500);
})