var nodes; // global var (so filter.js can access)

$(document).ready(function() {

  $('#logo').click(function() {
    document.location.href = 'home.html';
  });

    student_dict = {}
    for (var i=0; i<students.length; i++) {
      student_dict[i] = students[i];
        $('#bubbleContainer').append('<div class="bubble" student_id="' + i + '""><div class="bubble_text">' + 
          ($("input[name='toggle']:checked").length > 0 ? students[i]['name'] : students[i]['course_number']) + '</div></div>');
        console.log()
    }

    var bubbles = $('.bubble');
    for (var i=0; i<students.length; i++) {
      bubbles[i].setAttribute("student_id",i);
    }
    /* container */
    var radius = 50,
        padding = 6,
        vis = d3.select("body").select("#bubbleContainer");

    var svg = d3.select("#bubbleContainer").append("svg")
        .attr("width", $("#bubbleContainer").width())
        .attr("height", $("#bubbleContainer").height());

    /* Force paramettring */
    var force = d3.layout.force()
        .size([$("#bubbleContainer").width(), $("#bubbleContainer").height()]) // gravity field's size
        //.friction(1) // 1 = frictionless
        .charge(0)
        .gravity(0) 
        .nodes(students) 
        .links([])
        .on("tick", tick)
        .start();

    // TODO: set foci intelligently, based on num of groups -- parameters['group'].length --
    var foci;

    $(window).resize(function(){
      var height = $("#bubbleContainer").height();
      var width = $("#bubbleContainer").width();
      //resize hull container as well
      svg.attr("width", $("#bubbleContainer").width())
          .attr("height", $("#bubbleContainer").height());
      foci = hexpac(parameters['group'].length, radius*3, width, height);

      force.stop();
      force.start();
    });

    $(window).trigger('resize');

    //Find the number of groups
    totalGroups = parameters['group'].length;
    /*
    for (var i = students.length - 1; i >= 0; i--) {
      if(students[i].group > totalGroups){
        totalGroups = students[i].group;
      }
    };
    totalGroups += 1
*/
    //EXPERIMENT
    var hulls = []; 
    for (var i = parameters['group'].length - 1; i >= 0; i--) {
      hulls.push(svg.append("path").attr("class", "hull").attr("group",parameters['group'].length - i - 1));
    };
    /////////


    /*Associate the divs with the node objects. */
    nodes = vis.selectAll(".bubble")
      .data(students)
      .attr({
        'id': function(d,i) {return 'node_' + i},
      })
      .style({
        'width': radius + 'px',
        'height': radius + 'px',
        'background-color': '#ccc',
        'border-radius': radius/2 + 'px',
        'font-size': '30px',
        'line-height': radius + 'px',
        'left': function(d) {
          return d.x + radius + "px"; //x
        },
        'top': function(d) {
          return d.y + radius + "px"; //y
        }
      })
      .call(force.drag);

    /* Start transition */
    vis.style("opacity", 1e-6)
        .transition()
        .duration(1000)
        .style("opacity", 1);
    points = [];
    function tick(e) {  
      //everything collide with everything else
      
      //var q = d3.geom.quadtree(students);
      /*
      for (var i = 0; i<students.length; i++) {
        collide2(.5)(students[i]);
      }*/
      var q = d3.geom.quadtree(students);
            for (var i = 0; i<students.length; i++) {
              q.visit(collide(students[i]))
            }
      //nodes.each(collide2(.5));
       
      //gravity towards foci
      /*
      var k = .2 * e.alpha;
      nodes.each(
        o.y += (foci[o.group].y - o.y) * k;
        o.x += (foci[o.group].x - o.x) * k;
      );
*/
      //console.log(nodes);
      nodes.each(gravity(.2 * e.alpha));
      nodes
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
        
      points = [];
      for (var i = parameters['group'].length - 1; i >= 0; i--) {
        points.push([]);
      };
      for (var i = students.length - 1; i >= 0; i--) {
        points[students[i].group].push([students[i].px + radius/2,students[i].py + radius/2]);
      };
      redraw();
      nodes.style({
        'left': function(d,i) {
          return d.x + 'px';
        },
        'top': function(d,i) {
          return d.y + 'px';
        }
      });


    }
    // Move nodes toward cluster focus.
    function gravity(alpha) {
      return function(d) {
        d.y += (foci[d.group].y-(radius/2) - d.y) * alpha;
        d.x += (foci[d.group].x-(radius/2) - d.x) * alpha;
      };
    }

    function collide(nodey) {
      var r = radius + padding,
          nx1 = nodey.x - r,
          nx2 = nodey.x + r,
          ny1 = nodey.y - r,
          ny2 = nodey.y + r;
      return function(quad, x1, y1, x2, y2) {
         if (quad.point && (quad.point !== nodey)) {
           var x = nodey.x - quad.point.x,
             y = nodey.y - quad.point.y,
             l = Math.sqrt(x * x + y * y),
             r = radius + padding;
           if (l < r) {
             l = (l - r) / l * .5;
             nodey.x -= x *= l;
             nodey.y -= y *= l;
             quad.point.x += x;
             quad.point.y += y;
           } 
         }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      };
    }
    function collide2(alpha) {
      quadtree = d3.geom.quadtree(students);
      return function(d) {
        var r = radius + padding,
            nx1 = d.x - r,
            nx2 = d.x + r,
            ny1 = d.y - r,
            ny2 = d.y + r;
        quadtree.visit(function(quad, x1, y1, x2, y2) {
          //console.log(quad);
          if (quad.point && (quad.point !== d)) {
            //console.log("collision");
            from = d;
            to = quad;
            var x = d.x - quad.point.x,
                y = d.y - quad.point.y,
                l = Math.sqrt(x * x + y * y),
                r = d.radius + padding;
            if (l < r) {
              l = (l - r) / l * alpha;
              d.x -= x *= l;
              d.y -= y *= l;
              quad.point.x += x;
              quad.point.y += y;
            }
          }
          return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
      };
    }
    ////UNDO and REDO////
    var undoStack = [];
    var redoStack = [];
    var undo = function(e){
      if(undoStack.length > 0){
        //show redo, take away undo if it is length 0 
        $("#redo").remove();
        $("#undo").remove();
        if(undoStack.length > 1){
          $("#buttons").prepend("<a id=undo>undo</a>");
          $("#undo").click(undo);
        }
        $("#buttons").prepend("<a id=redo>redo</a>");
        $("#redo").click(redo);
        var toBeUndone = undoStack.pop();
        console.log(toBeUndone);
        var tmpGroup = student_dict[toBeUndone[0].attr("student_id")].group;
        student_dict[toBeUndone[0].attr("student_id")].group = student_dict[toBeUndone[1].attr("student_id")].group;
        student_dict[toBeUndone[1].attr("student_id")].group = tmpGroup;
        redoStack.push(toBeUndone);
        //get them to move
        force.stop();
        force.start();
      }
    }
    var redo = function(e){
      if(redoStack.length > 0){
        //show undo, take away redo if it is length 0 
        $("#redo").remove();
        $("#undo").remove();
        $("#buttons").prepend("<a id=undo>undo</a>");
        $("#undo").click(undo);
        if(redoStack.length > 1){
          $("#buttons").prepend("<a id=redo>redo</a>");
          $("#redo").click(redo);
        }
        
        var toBeRedone = redoStack.pop();
        var tmpGroup = student_dict[toBeRedone[0].attr("student_id")].group;
        student_dict[toBeRedone[0].attr("student_id")].group = student_dict[toBeRedone[1].attr("student_id")].group;
        student_dict[toBeRedone[1].attr("student_id")].group = tmpGroup;
        undoStack.push(toBeRedone);
        //get them to move
        force.stop();
        force.start();
      }
    }
    $(window).keydown(function(e) {
      //modified from http://stackoverflow.com/questions/3902635/how-does-one-capture-a-macs-command-key-via-javascript
      if(e.metaKey){
        //shift+z
        if (e.keyCode == 90 && e.shiftKey) {
          console.log("redo");
          redo(e)
        }
        //z
        else if (e.keyCode == 90) {
          undo(e)
          console.log("undo");
          
        }
        
      }
    });
    ////SWAPPING STUFF////

    //TODO: Make it so that when you drag something it doesn't interpret it as clicked

    var nothingSelected = function(evt){
      console.log("nothingSelected");
      //First check if it's not the last thing in a group
      //add selected class
      $(this).addClass("selected");
      //add listener to click on everything else for swap
      $(".bubble").unbind("click");
      $(".bubble").click(bubbleSelected);
      evt.stopPropagation();
      //add listener to click on background to deselect
      $(document).click(deselect);
    }

    var bubbleSelected = function(evt){
      console.log("bubbleSelected");
      if(student_dict[$(this).attr("student_id")].group !== student_dict[$(".selected").attr("student_id")].group){
        //display undo, undisplay redo
        $("#redo").remove();
        $("#undo").remove();
        $("#buttons").prepend("<a id=undo>undo</a>");
        $("#undo").click(undo);
        undoStack.push([$(this),$(".selected")]);
        redoStack = [];

        var tmpGroup = student_dict[$(this).attr("student_id")].group;

        student_dict[$(this).attr("student_id")].group = student_dict[$(".selected").attr("student_id")].group;
        student_dict[$(".selected").attr("student_id")].group = tmpGroup;
        $(".selected").removeClass("selected");
        //unhookup second function
        $(".bubble").unbind("click");
        $(document).unbind("click");
        //hookup first function
        $(".bubble").click(nothingSelected);
        /*var q = d3.geom.quadtree(students);
              for (var i = 0; i<students.length; i++) {
                q.visit(collide(students[i]))
              }*/
        /*
        var ething = {};
        ething.alpha = .5;
        tick(ething);
        */
        //get them to move
        force.stop();
        force.start();
      }else if($(this).hasClass("selected")){//gotta check if it's the same one in which case deselect
        $(".selected").removeClass("selected");
        //unhookup second function
        $(".bubble").unbind("click");
        $(document).unbind("click");
        //hookup first function
        $(".bubble").click(nothingSelected);
        evt.stopPropagation();
      }else{
        console.log("got here");
        $(".selected").removeClass("selected");
        $(this).addClass("selected");
        evt.stopPropagation();
      }
      
    }

    var deselect = function(evt){
      console.log("deselect");
      $(".selected").removeClass("selected");
      //unhookup second function
      $(".bubble").unbind("click");
      $(document).unbind("click");
      //hookup first function
      $(".bubble").click(nothingSelected);
    }

    $(".bubble").click(nothingSelected);



    $(".bubble").dblclick(function(){
      $("#studentModal").modal("show");
    });


    function redraw() {
      for (var i = parameters['group'].length - 1; i >= 0; i--) {
        hulls[i].datum(d3.geom.hull(points[i])).attr("d", function(d) { return "M" + d.join("L") + "Z"; });
        hulls[i].attr("fill", getHullColor(i))
        hulls[i].attr("stroke", getHullColor(i))
      };
    }

    
});
