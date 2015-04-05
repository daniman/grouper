$(document).ready(function() {
    $("[name='toggle']").bootstrapSwitch({
      size: 'small',
      onText: '',
      offText: '',
      onColor: 'info',
      offColor: 'info'
    });


    // <div class="filterType">
    //     <div class="filterTypeTitle">
    //         Data Labels:
    //     </div>
    //     Student Course Number <input type="checkbox" name="toggle" checked> Student Name
    // </div>

    // <div class="filterType">
    //     <input type="checkbox" value="gender"> Gender<br>
    //     <input type="checkbox" value="year"> Year<br>
    //     <input type="checkbox" value="sports_team"> Sports Team<br>
    //     <input type="checkbox" value="living_group"> Living Group<br>
    //     <input type="checkbox" value="greek_affiliation"> Greek Affiliation
    // </div>

    for (var i=0; i<filters.length; i++) {
        $('#filters').append('<div>' +
            '<input class="filterCat" type="radio" name="filters" value="' + filters[i] + '">' + filters[i] + '<br>' +
            '</div>');
    }

    $('.filterCat').click(function(event) {
        filter(event.target.value, nodes);
    })

    


});

function filter(attr, nodes) {
    var colors = generateColors(parameters[attr].length);
    nodes.selectAll().forEach(function(d,i) {
        var cat = students[i][attr];
        $(d.parentNode).animate({
            'background-color': colors[parameters[attr].indexOf(cat)]
        }, 1000);
    });
}

function generateColors(num) {
    var colorPool = ['rgb(240,163,255)','rgb(0,117,220)','rgb(153,63,0)','rgb(76,0,92)','rgb(25,25,25)','rgb(0,92,49)','rgb(43,206,72)','rgb(255,204,153)','rgb(128,128,128)','rgb(148,255,181)','rgb(143,124,0)','rgb(157,204,0)','rgb(194,0,136)','rgb(0,51,128)','rgb(255,164,5)','rgb(255,168,187)','rgb(66,102,0)','rgb(255,0,16)','rgb(94,241,242)','rgb(0,153,143)','rgb(224,255,102)','rgb(116,10,255)','rgb(153,0,0)','rgb(255,255,128)','rgb(255,255,0)','rgb(255,80,5)'];
    return colorPool.slice(0,num);
}