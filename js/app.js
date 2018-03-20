$(function(){

    $('.gatunek').find('.list1').hide();
    $('.gatunek').on('click', function(){
        $(this).find('.list1').toggle('show');
    });

    $('.lata').find('.list2').hide();
    $('.lata').on('click', function(){
        $(this).find('.list2').toggle('show');
    });

    $('.nominacje').find('.list3').hide();
    $('.nominacje').on('click', function(){
        $(this).find('.list3').toggle('show');
    });


    
    



});

