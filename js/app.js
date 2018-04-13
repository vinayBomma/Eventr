// var elem = document.querySelector('.sidenav');
// var instance = M.Sidenav.init(elem, options);

$(document).ready(function(){
    $('.sidenav').sidenav();

    $('.fixed-action-btn').floatingActionButton();

    $('.modal').modal();
});