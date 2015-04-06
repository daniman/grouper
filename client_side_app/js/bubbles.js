var nodes; // global var (so filter.js can access)

$(document).ready(function() {
    student_dict = {}
    for (var i=0; i<students.length; i++) {
      student_dict[i] = students[i];
        $('#bubbleContainer').append('<div class="bubble" student_id="' + i + '""><div class="bubble_text">' + 
          ($("input[name='toggle']:checked").length > 0 ? students[i]['name'] : students[i]['course_number']) + '</div></div>');
    }

    var bubbles = $('.bubble');
    for (var i=0; i<students.length; i++) {
      bubbles[i].setAttribute("student_id",i);
    }
    /* container */
    var radius = 50,
        padding = 6,
        vis = d3.select("body").select("#bubbleContainer");

    // TODO: set foci intelligently, based on num of groups -- parameters['group'].length --
    var height = $("#bubbleContainer").height();
    var width = $("#bubbleContainer").width();
    console.log(height);
    console.log(width);

    var foci = [
      {x: width/4, y: height/4}, 
      {x: 3*width/4, y: height/4}, 
      {x: width/12, y: height/2},
      {x: width/2, y: height/2}, 
      {x: 11*width/12, y: height/2}, 
      {x: width/4, y: 3*height/4},
      {x: 3*width/4, y: 3*height/4}
    ];

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

    ////SWAPPING STUFF////
    /*
    $(".bubble").click(function(evt){
      console.log("dog");
    });
*/

    //Make it so that when you drag something it doesn't interpret it as clicked

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


    
});
