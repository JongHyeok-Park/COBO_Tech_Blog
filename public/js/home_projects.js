let data = [
    {
        title: "기가 막힌 프로젝트 1",
        brief_content: "예전에 만들었던 기가 막힌 프로젝트임 아무튼 그럼. 예전에 만들었던 기가 막힌 프로젝트임 아무튼 그럼. 예전에 만들었던 기가 막힌 프로젝트임 아무튼 그럼.",
        skillTag: "HTML"
    },
    {
        title: "기가 막힌 프로젝트 2",
        brief_content: "예전에 만들었던 기가 막힌 프로젝트임 아무튼 그럼.",
        skillTag: "HTML"
    },
    {
        title: "기가 막힌 프로젝트 3",
        brief_content: "예전에 만들었던 기가 막힌 프로젝트임 아무튼 그럼.",
        skillTag: "HTML"
    },
    {
        title: "기가 막힌 프로젝트 4",
        brief_content: "예전에 만들었던 기가 막힌 프로젝트임 아무튼 그럼.",
        skillTag: "HTML"
    },
    {
        title: "기가 막힌 프로젝트 5",
        brief_content: "예전에 만들었던 기가 막힌 프로젝트임 아무튼 그럼.",
        skillTag: "HTML"
    },
    {
        title: "기가 막힌 프로젝트 6",
        brief_content: "예전에 만들었던 기가 막힌 프로젝트임 아무튼 그럼.",
        skillTag: "HTML"
    },
];

// $.get('http://13.125.236.152:8080/api/home/project').then((result) => {
//     data = JSON.parse(result);
// })

// Template //
// <div class="slide-item">
//     <div class="card m-auto" style="width: 18rem;">
//         <img src="https://t3.ftcdn.net/jpg/02/15/15/46/360_F_215154625_hJg9QkfWH9Cu6LCTUc8TiuV6jQSI0C5X.jpg"
//             class="card-img-top" alt="...">
//         <div class="card-body">
//             <h5 class="card-title">기가 막힌 프로젝트1</h5>
//             <div class="card-text-container"><p class="card-text">예전에 만들었던 기가 막힌 프로젝트임 아무튼 그럼.</p></div>
//             <div class="card-tag">
//                 <span class="badge text-bg-danger">HTML</span>
//                 <span class="badge text-bg-primary">CSS3</span>
//                 <span class="badge text-bg-warning">Javascript</span>
//             </div>
//         </div>
//     </div>
// </div>


for (let i = 0; i < 3; i++) {
    data.forEach(item => {
        template = `
        <div class="slide-item">
            <div class="card m-auto" style="width: 18rem;">
                <img src="https://t3.ftcdn.net/jpg/02/15/15/46/360_F_215154625_hJg9QkfWH9Cu6LCTUc8TiuV6jQSI0C5X.jpg"
                    class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.brief_content}</p>
                    <div class="card-tag">
                        <span class="badge text-bg-danger">${item.skillTag}</span>
                    </div>
                </div>
            </div>
        </div>
        `;

        $('.silde-items-list').append(template);
    });
}