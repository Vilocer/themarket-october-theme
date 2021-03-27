// Initializate a select on sort.htm
(function() {
    [].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {	
        new SelectFx(el, { stickyPlaceholder: true, onChange:function(selectedValue){ el.form.submit(); } });
    } );
})();

// Show a content
$(function() { 
    $('.show-on-load').toggleClass('active'); 
});

$("#filter-form").submit(function(e) {
    e.preventDefault();
    
    var form = $(this).serializeArray();
        redirect_link = '?'
        categories=[]
        brands=[];

    for (data in form) {
        var name = form[data]['name']
            value = form[data]['value'];

        if (name == 'sort' || name == 'page') {
            redirect_link += (name + '=' + value + '&');
        }

        if (name.includes('category') && value == 'on'){
            categories += (parseInt(name.match(/\d+/)) + ',');
        }

        if (name.includes('brand') && value == 'on'){
            brands += (parseInt(name.match(/\d+/)) + ',');
        }

    }

    redirect_link += ('brands' + '=' + brands + '&');
    redirect_link += ('categories' + '=' + categories + '&');

    $(location).attr('href', redirect_link);

});

$('.category-input').on('change', function(e) {
    var checked = $(this.checked)[0];

    $(this).nextAll('.list-group').children().each(function () {
        this.children[0].checked = checked;
    });
});
