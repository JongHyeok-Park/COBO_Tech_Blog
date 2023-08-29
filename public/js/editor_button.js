const editorContent = document.querySelector('.editor');
const fontTagSelector = document.querySelector('#font-tag-seletor');
const fontColorSelector = document.querySelector('#font-color-seletor');
const btnBold = document.querySelector('#btn-bold');
const btnItalic = document.querySelector('#btn-italic');
const btnUnderLine = document.querySelector('#btn-underline');
const btnStrike = document.querySelector('#btn-strike');
const btnLeft = document.querySelector('#btn-left');
const btnCenter = document.querySelector('#btn-center');
const btnRight = document.querySelector('#btn-right');
const btnFull = document.querySelector('#btn-full');
const btnQuote = document.querySelector('#btn-quote');
const btnOrderedList = document.querySelector('#btn-ordered-list');
const btnUnorderedList = document.querySelector('#btn-unordered-list');
const btnLink = document.querySelector('#btn-link')
const btnImage = document.querySelector('#btn-image');
const imageSelector = document.querySelector('#img-selector');

setFocus();

// 스타일 변경 함수
function styleSwitch(style) {
    document.execCommand(style, false, null);
    setFocus();
}

function setFocus() {
    editorContent.focus({ preventScroll: true });
}

// 개행 기본 br 세팅
editorContent.onkeyup = function () {
    let a = document.activeElement;
    if (a.lastChild && a.lastChild.nodeName != "BR") {
        a.appendChild(document.createElement("br"));
    }
};

editorContent.onkeypress = function (e) {
    if (e.key == 'Enter' && !e.shiftKey) {
        let selection = window.getSelection(),
            range = selection.getRangeAt(0),
            br = document.createElement("br");
        range.deleteContents();
        range.insertNode(br);
        range.setStartAfter(br);
        range.setEndAfter(br);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
        return false;
    }
};

// Heading
fontTagSelector.addEventListener('change', function (e) {
    const newTag = parseInt(e.target.value);
    switch (newTag) {
        case 1:
            document.execCommand('formatBlock', false, 'H1');
            break;
        case 2:
            document.execCommand('formatBlock', false, 'H2');
            break;
        case 3:
            document.execCommand('formatBlock', false, 'h3');
            break;
        case 4:
            document.execCommand('formatBlock', false, 'h4');
            break;
        case 5:
            document.execCommand('formatBlock', false, 'h5');
            break;
        case 6:
            document.execCommand('formatBlock', false, 'h6');
            break;
        case 7:
            let selection = window.getSelection(),
                range = selection.getRangeAt(0);
            let target = selection.focusNode.parentElement;
            if (target.nodeName == "H1"
                || target.nodeName == "H2"
                || target.nodeName == "H3"
                || target.nodeName == "H4"
                || target.nodeName == "H5"
                || target.nodeName == "H6") {
                $(selection.focusNode).unwrap();
            }
            selection.removeAllRanges();
            selection.addRange(range);
            break;
        default:
            break;
    }

    fontTagSelector.options[0].selected = true;
    setFocus();
})

// Font Color
fontColorSelector.addEventListener('change', function (e) {
    const color = parseInt(e.target.value);

    switch (color) {
        case 1:
            document.execCommand('foreColor', false, 'black');
            break;
        case 2:
            document.execCommand('foreColor', false, 'red');
            break;
        case 3:
            document.execCommand('foreColor', false, 'blue');
            break;
        case 4:
            document.execCommand('foreColor', false, 'green');
            break;
        case 5:
            document.execCommand('foreColor', false, 'grey');
            break;
        default:
            break;
    }
})

// Font-Style
btnBold.addEventListener('click', function () {
    styleSwitch('bold');
})

btnItalic.addEventListener('click', function () {
    styleSwitch('italic');
})

btnUnderLine.addEventListener('click', function () {
    styleSwitch('underline');
})

btnStrike.addEventListener('click', function () {
    styleSwitch('strikeThrough');
})

// Text Align
btnLeft.addEventListener('click', function () {
    styleSwitch('justifyLeft');
})

btnCenter.addEventListener('click', function () {
    styleSwitch('justifyCenter');
})

btnRight.addEventListener('click', function () {
    styleSwitch('justifyRight');
})

btnFull.addEventListener('click', function () {
    styleSwitch('justifyFull');
})

// Block Quote Insert
btnQuote.addEventListener('click', function () {
    document.execCommand('formatBlock', false, 'blockquote');
    setFocus();
})

// List Insert
btnOrderedList.addEventListener('click', function () {
    styleSwitch('insertOrderedList');
})

btnUnorderedList.addEventListener('click', function () {
    styleSwitch('insertUnorderedList');
})

// Link(URL) Insert
btnLink.addEventListener('click', function () {
    const target = window.getSelection();
    if (target.isCollapsed) {
        return;
    } else {
        const url = target.toString();
        document.execCommand('createLink', false, url);
    }
    setFocus();
})

// Image Insert
btnImage.addEventListener('click', function () {
    imageSelector.click();
})

imageSelector.addEventListener('change', function (e) {
    const files = e.target.files;
    const multipartFile = new FormData();
    if (!!files) {
        console.log(files[0].name, files[0]);
        multipartFile.append('multipartFile', files[0]);
        $.ajax({
            type: 'POST',
            url: ServerURL + '/api/tech/img',
            data: multipartFile,
            contentType: false,
            processData: false,
            headers: {
                "Authorization": 'Bearer ' + getCookie('AccessToken')
            }
        }).then((res) => {
            console.log('이미지 전송 완료');
            console.log(res);
            insertImageData(res);
        }).catch((err) => {
            alert('이미지 전송 실패');
            console.log("이미지 전송 실패");
            console.log(err);
        })
    }
})

function insertImageData(file) {
    const image = `
        <img src="https://cobo-blog.s3.ap-northeast-2.amazonaws.com/${file[0].url}" data-id="${file[0].id}">
    `;
    document.execCommand('insertHTML', false, image);
    setFocus();
}