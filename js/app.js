$(function () {


    // listy rozwijane - wyjezdzanie

    // gatunek

    $('.right').find('.list1').hide();
    $('.gatunek').on('click', function () {
        $('.right').find('.list1').toggle('show');

    });

    // lata

    $('.right').find('.list2').hide();
    $('.lata').on('click', function () {
        $('.right').find('.list2').toggle('show');
    });


    // mominacje

    $('.right').find('.list3').hide();
    $('.nominacje').on('click', function () {
        $('.right').find('.list3').toggle('show');
    });


    $('.list').hide();
    $('span').on('click', (e) => {
        $('.list').hide(500);
        $(e.target).parent().next().children().show(500);
    });

    // API
    //do kategorii gatunek

    var url = "http://localhost:3000/movies";
    var changeParam = $(".change");

    var types = [];
    var years = [];
    var nominations = [];
    var all = [];
    
    changeParam.on("click", function () {
        // console.log($(this).data());
        let dataType = $(this).data("type");
        let dataValue = $(this).data("value");
        if (dataType == "genre") {
            if (types.indexOf(dataValue) < 0) {
                types.push(dataValue);
            } else {
                let index = types.indexOf(dataValue);
                types.splice(index, 1);
            }
        } else if (dataType == "year") {
            if (years.indexOf(dataValue) < 0) {
                years.push(dataValue);
            } else {
                let index = years.indexOf(dataValue);
                years.splice(index, 1);
            }
        } else if (dataType == "nomination") {
            if (nominations.indexOf(dataValue) < 0) {
                nominations.push(dataValue);
            } else {
                let index = nominations.indexOf(dataValue);
                nominations.splice(index, 1);
            }
        }

        nominations.sort();
        //console.log(nominations);
        let urlParams = '?';
       
        

        years.forEach(year => {
            urlParams += urlParams == "?" ? "years=" + year : '&years=' + year;
        });
        types.forEach(type => {
            urlParams += urlParams == "?" ? "type=" + type : '&type=' + type;
        });
        nominations.forEach((nomination, index) => {
            // urlParams += urlParams=="?" ? "type="+type : '&type='+type;
            urlParams += urlParams == "?" ? "nominations=" + nomination : '&nominations=' + nomination;
        });
        if (nominations.length > 1) {
            urlParams += nominations.length > 0 ? '&nominations=' : '';
            nominations.forEach((nomination, index) => {
                // urlParams += urlParams=="?" ? "type="+type : '&type='+type;
                urlParams += index == 0 ? nomination : ',' + nomination;
            });
        }

       

        var slider = $("#slider");

        if (types.length==0&&years.length==0&&nominations.length==0) {
            slider.hide();
        }else {
            slider.show();
        }


        var innerSlider = $(".carousel-inner");
        $(innerSlider)[0].innerHTML = "";
        $.ajax({
            url: url + urlParams,
            method: "GET",
            dataType: "json"
        }).done((response) => {

            var arrayImg = [];
            let carouselItem = null;
            response.map((e, i) => {
                arrayImg.push(e.images);
                if (i == 0) {
                    carouselItem = $('<div class="carousel-item active">');
                } else {
                    carouselItem = $('<div class="carousel-item">');
                }
                let img = $('<img class="d-block">');
                img.attr('src', e.images);
                carouselItem.append(img);
                innerSlider.append(carouselItem);
               
            });


        }).fail((error) => {
            console.log("err");
        });
       
    });

});