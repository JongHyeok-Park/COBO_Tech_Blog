// id = "custom-navbar" 에 load
$(document).ready(function () {
    $("#custom-navbar").load("../../pages/includes/navbar.html", function () {
        let path = window.location.pathname;
        let page = path.split("/").pop();

        switch (page) {
            case "about.html":
                document.querySelectorAll('.nav-item a')[0].classList.add('active');
                break;
            case "tech.html":
                document.querySelectorAll('.nav-item a')[1].classList.add('active');
                break;
            case "projects.html":
                document.querySelectorAll('.nav-item a')[2].classList.add('active');
                break;
            default:
                break;
        }

        // Toggle button
        $('.navbar-toggler').click(function (e) {
            $('#navbarNav').toggle('show');
        })
    });
})



