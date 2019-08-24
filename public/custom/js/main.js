$(document).ready(function(){
    $('.delete-activity').on('click',function(e){
        $target=$(e.target);
        const id=$target.attr('data-id');
        $.ajax({
            type:'DELETE',
            url: '/edit/'+id,
            success: function(response){
                window.location.href='/dashboard'
            },
            error: function(err){
                console.log(err);
            }
        })
    })
})