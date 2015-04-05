/* container */
var wI = window.innerWidth,
    hI = window.innerHeight,
    w = wI + "px",
    h = hI + "px",
    radius = 80,
    padding = 6,
    fill = d3.scale.category10(),
    foci = [{x: 200, y: window.innerHeight/2}, {x: window.innerWidth/2, y: window.innerHeight/2}, {x: window.innerWidth-200, y: window.innerHeight/2}],
    nodes = [{group:0}, {group:1}, {group:2}, {group:0}, {group:1}, {group:2}, {group:0}, {group:1}, {group:2}, {group:0}];

var nearest = function(n, range){
  return Math.round(n/range) * range;
};


var vis = d3.select("body").select("#container")
    .style("width", w)
    .style("height", h);

/* Force paramettring */
var force = d3.layout.force()
    .size([wI, hI]) // gravity field's size(x, y)
    .friction(.001) // 1 = frictionless
    .charge(0)
    .gravity(0) 
    .nodes(nodes) 
    .links([])
    .on("tick", tick)
    .start();

/*Associate the divs with the node objects. */
var node = vis.selectAll("div")
    .data(nodes)
    .attr("class", function(d, i){return 'node' + i;})
    .style("left", function(d) { return d.x + 50 + "px"; }) //x
    .style("top", function(d) { return d.y + 50 + "px"; }) //y
    .style("width", radius + "px")
    .style("height", radius + "px")
    .style("background-color", '#ff8c17')
    .call(force.drag);

/* Start transition */
vis.style("opacity", 1e-6)
    .transition()
    .duration(1000)
    .style("opacity", 1)

function tick(e) {

  var q = d3.geom.quadtree(nodes);
  for (var i = 0; i<nodes.length; i++) {
    q.visit(collide(nodes[i]))
  }
   
  //gravity
  var k = .6 * e.alpha;
  nodes.forEach(function(o, i) {
    o.y += (foci[o.group].y - o.y) * k;
    o.x += (foci[o.group].x - o.x) * k;
  });

  node.style("left", function(d, i) { 
    return d.x + 'px';
  }).style("top", function(d) { 
    return d.y + 'px';     
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