var nodes; // global var (so filter.js can access)

$(document).ready(function() {

    for (var i=0; i<students.length; i++) {
        $('#bubbleContainer').append('<div class="bubble"><div class="bubble_text">' + ($("input[name='toggle']:checked").length > 0 ? students[i]['name'] : students[i]['course_number']) + '</div></div>');
    }

    /* container */
    var radius = 70,
        padding = 6,
        vis = d3.select("body").select("#bubbleContainer");

    // TODO: set foci intelligently, based on num of groups -- parameters['group'].length --
    var foci = [
      {x: 100, y: $("#bubbleContainer").height()/3}, 
      {x: $("#bubbleContainer").width()/2, y: $("#bubbleContainer").height()/3}, 
      {x: $("#bubbleContainer").width()-200, y: $("#bubbleContainer").height()/3},
      {x: 100, y: $("#bubbleContainer").height()/3}, 
      {x: $("#bubbleContainer").width()/2, y: $("#bubbleContainer").height()/3}, 
      {x: $("#bubbleContainer").width()-200, y: $("#bubbleContainer").height()/3},
      {x: 100, y: $("#bubbleContainer").height()/3}
    ];

    /* Force paramettring */
    var force = d3.layout.force()
        .size([$("#bubbleContainer").width(), $("#bubbleContainer").height()]) // gravity field's size
        .friction(.001) // 1 = frictionless
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
          return d.x + radius/2 + "px"; //x
        },
        'top': function(d) {
          return d.y + radius/2 + "px"; //y
        }
      })
      .call(force.drag);

    /* Start transition */
    vis.style("opacity", 1e-6)
        .transition()
        .duration(1000)
        .style("opacity", 1);

    function tick(e) {  
      var q = d3.geom.quadtree(students);
      for (var i = 0; i<students.length; i++) {
        q.visit(collide(students[i]))
      }
       
      var k = .6 * e.alpha;
      students.forEach(function(o, i) {
        o.y += (foci[o.group].y - o.y) * k;
        o.x += (foci[o.group].x - o.x) * k;
      });

      nodes.style({
        'left': function(d,i) {
          return d.x + 'px';
        },
        'top': function(d,i) {
          return d.y + 'px';
        }
      });
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
});
