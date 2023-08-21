$.get(ServerURL + '/api/home/project').then((result) => {
    let count = 0;

    for (let i = 0; i < 3; i++) {
        count = (i * 6);
        result.forEach(item => {
            let template = `
            <div class="slide-item">
                <div class="card m-auto">
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
})


