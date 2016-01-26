hexpac = function(clusters, cluster_diameter, width, height) {
    var a = clusters;
    var cluster_padding = cluster_diameter/2;

    function roomy(cols) {
        return width - cols*(cluster_diameter+(2*cluster_padding))/2 > 0;
    }

    for (var k=2;k<=a;k++) {
        if ((2*a+k-1)/(2*k)%1==0) {
            n=(2*a+k-1)/(2*k);
            var cols = 2*n-1;

            if (roomy(cols)) {
                var foci = [];
                for (j=1; j<=k; j++) {
                    if (j%2==1) { // odd rows
                        for (i=1; i<=n; i++) {
                            foci.push({
                                x: i*width/(n+1),
                                y: j*height/(k+1)
                            })
                        }
                    } else { // even rows
                        for (i=1; i<=n-1; i++) {
                            foci.push({
                                x: (2*i+1)*width/(2*(n+1)),
                                y: j*height/(k+1)
                            })
                        }
                    } 
                }
                return foci;
            }
        }

        if ((2*a+k)/(2*k)%1==0) {
            n=(2*a+k)/(2*k);
            var cols = 2*n-1;

            if (roomy(cols)) {
                var foci = [];
                for (j=1; j<=k; j++) {
                    if (j%2==1) { // odd rows
                        for (i=1; i<=n; i++) {
                            foci.push({
                                x: i*width/(n+1),
                                y: j*height/(k+1)
                            })
                        }
                    } else { // even rows
                        for (i=1; i<=n-1; i++) {
                            foci.push({
                                x: (2*i+1)*width/(2*(n+1)),
                                y: j*height/(k+1)
                            })
                        }
                    } 
                }
                return foci;
            }
        }

        if ((2*a-k+1)/(2*k)%1==0) {
            n=(2*a-k+1)/(2*k);
            var cols = 2*(n+1);

            if (roomy(cols)) {
                var foci = [];
                for (j=1; j<=k; j++) {
                    if (j%2==1) { // odd rows
                        for (i=1; i<=n; i++) {
                            foci.push({
                                x: (2*i)*width/cols,
                                y: j*height/(k+1)
                            })
                        }
                    } else { // even rows
                        for (i=1; i<=n+1; i++) {
                            foci.push({
                                x: (2*i-1)*width/cols,
                                y: j*height/(k+1)
                            })
                        }
                    } 
                }
                return foci;
            }
        }

        if ((a/k)%1==0) {
            n=a/k;
            var cols = 2*n;

            if (roomy(cols)) {
                var foci = [];
                for (j=1; j<=k; j++) {
                    if (j%2==1) { // odd rows
                        for (i=1; i<=n; i++) {
                            foci.push({
                                x: (2*i-1)*width/(cols+1),
                                y: j*height/(k+1)
                            })
                        }
                    } else { // even rows
                        for (i=1; i<=n; i++) {
                            foci.push({
                                x: (2*i)*width/(cols+1),
                                y: j*height/(k+1)
                            })
                        }
                    } 
                }
                return foci;
            } else if (n==1) {
                var foci = [];
                for (j=1; j<=k; j++) {
                        foci.push({
                            x: width/2,
                            y: j*height/(k+1)
                        });
                }
                return foci;
            }
        }

    }
}

student_dict = {}
buildBubbles = function() {
  $('#bubbleContainer').html('');

  $(window).unbind('keydown');
    nodes = null;
    group_nodes = null;
    force = null;

    activeGroup = Classes.findOne({_id: Session.get('active')});

    students = activeGroup['data'].slice();
    students_copy = activeGroup['data'].slice();
    points = [];

    var filters = activeGroup['filters'];
    var totalGroups = filters['group'].length;
    foci = hexpac(totalGroups, radius*3, $("#bubbleContainer").width(), $("#bubbleContainer").height());

    for (var i = 0; i < totalGroups; i++) {
      students_copy.push({name:i,group:i});
    };

     /**
     * Build bubbles.
     */
    for (var i=0; i<students.length; i++) {
      student_dict[i] = activeGroup['data'][i];
        $('#bubbleContainer').append('<div class="bubble" id="student_bubble" student_id="' + i + '""><div class="bubble_text"></div></div>');
    }
    // activeGroup.map = student_dict;
    for (var i=0; i<students.length; i++) {
      $('.bubble')[i].setAttribute("student_id",i);
    }

    for (var i = 0; i < totalGroups; i++) {
      $('#bubbleContainer').append('<div class="group_bubble"><div class="bubble_text">' + 
        'Group <br>' + (i+1) + '</div></div>');
    };

    /* container */
    var radius = 50,
        padding = 6,
        vis = d3.select("body").select("#bubbleContainer");

    var svg = d3.select("#bubbleContainer").append("svg")
        .attr("id", "hulls")
        .attr("width", $("#bubbleContainer").width())
        .attr("height", $("#bubbleContainer").height());

    /* Force paramettring */
    force = d3.layout.force()
        .size([$("#bubbleContainer").width(), $("#bubbleContainer").height()]) // gravity field's size
        .charge(0)
        .gravity(0) 
        .nodes(students_copy) 
        .links([])
        .on("tick", tick);
        // .start(); 

    var h = $("#bubbleContainer").height();
    var w = $("#bubbleContainer").width();
    svg.attr("width", w).attr("height", h);
    foci = hexpac(totalGroups, radius*3, w, h);
    force.start();   

    $(window).resize(function(){
      var h = $("#bubbleContainer").height();
      var w = $("#bubbleContainer").width();
      svg.attr("width", w).attr("height", h);
      foci = hexpac(totalGroups, radius*3, w, h);
      force.stop().start();
    });
    $(window).trigger('resize');

    // console.log(activeGroup);
    // console.log(students);
    
    //hulls
    hulls = []; 
    for (var i = filters['group'].length - 1; i >= 0; i--) {
      hulls.push(svg.append("path").attr("class", "hull").attr("group",filters['group'].length - i - 1));
    };
    /////////

    nodes = vis.selectAll(".bubble, .group_bubble")
      .data(students_copy)
      .attr({
        'id': function(d,i) {return 'node_' + i},
      })
      .style({
        'width': radius + 'px',
        'height': radius + 'px',
        'background-color': 'transparent',
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
      var q = d3.geom.quadtree(students_copy);
            for (var i = 0; i<students_copy.length; i++) {
              q.visit(collide(students_copy[i]))
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
        
      //remake the points list for the hull
      points = [];
      for (var i = filters['group'].length - 1; i >= 0; i--) {
        points.push([]);
      };
      for (var i = students_copy.length - 1; i >= 0; i--) {
        points[students_copy[i].group].push([students_copy[i].px + radius/2,students_copy[i].py + radius/2]);
      };
      //redraw the hull
      redraw();

      nodes.style({
        'left': function(d,i) {
          return d.x + 'px';
        },
        'top': function(d,i) {
          return d.y + 'px';
        }
      });/*
      for (var i = 0; i < totalGroups; i--) {
        nodes[students.length + i].style({
        'left': function(d,i) {
          return foci[i].x + 'px';
        },
        'top': function(d,i) {
          return foci[i].y + 'px';
        }
      });
      };*/


    }
    // Move nodes toward cluster focus.
    function gravity(alpha) {
      return function(d) {
        // console.log(d);
        // console.log(foci);
        // console.log(foci[d.group]);
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
      quadtree = d3.geom.quadtree(students_copy);
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
    undoStack = [];
    redoStack = [];

    /*
     * Execute an Undo, Update Undo/Redo buttons, Update DB for Undo
     */
    var undo = function(e){
      console.log('undo');
      console.log(undoStack);
      if(undoStack.length > 0) {
        /* Show Redo, Take away Undo if it's length is 0 */
        $('#redo').removeClass('disabled');
        if (! $._data($('#redo')[0], 'events').click) {
          $("#redo").bind('click.grouper', redo);
        }
        if(undoStack.length > 1) {
          $('#undo').removeClass('disabled');
          if (! $._data($('#undo')[0], 'events').click) {
            $("#undo").bind('click.grouper', undo);
          }
        } else {
          $('#undo').addClass('disabled');
          $('#undo').unbind('click.grouper');
        }        

        /* Execute Undo */
        var toBeUndone = undoStack.pop();
        if (toBeUndone[0]==="drag") {
          //drag redo
          redoStack.push(["drag",toBeUndone[1],student_dict[toBeUndone[1].attr("student_id")].group]);
          student_dict[toBeUndone[1].attr("student_id")].group = toBeUndone[2];
          //get them to move
          force.stop();
          force.start();
        } else if (toBeUndone[0]==="delete") {
          redoStack.push(toBeUndone);
          var bubble = toBeUndone[1];
          var id = bubble.attr("student_id");
          students_copy.push(toBeUndone[3]);
          students.push(toBeUndone[3]);
          $("#bubbleContainer").append(bubble);
          start();
          activeGroup.data = students;
        } else {
          var tmpGroup = student_dict[toBeUndone[0].attr("student_id")].group;
          student_dict[toBeUndone[0].attr("student_id")].group = student_dict[toBeUndone[1].attr("student_id")].group;
          student_dict[toBeUndone[1].attr("student_id")].group = tmpGroup;
          redoStack.push(toBeUndone);
          //get them to move
          force.stop();
          force.start();
        }

        /* Store Undo in DB */
        Meteor.call('moveBubble', {
          bubble_index: toBeUndone[1].attr("student_id"),
          class_id: Session.get('active'),
          new_group: student_dict[toBeUndone[1].attr("student_id")].group
        });
      }
    }

    /*
     * Execute an Redo, Update Undo/Redo buttons, Update DB for Redo
     */
    var redo = function(e){
      console.log('redo');
      console.log(redoStack);
      if(redoStack.length > 0){
        /* Show Undo, Take away Redo if it's length is 0 */
        $('#undo').removeClass('disabled');
        if (! $._data($('#undo')[0], 'events').click) {
          $("#undo").bind('click.grouper', undo);
        }
        if(redoStack.length > 1) {
          $('#redo').removeClass('disabled');
          if (! $._data($('#redo')[0], 'events').click) {
            $("#redo").bind('click.grouper', redo);
          }
        } else {
          $('#redo').addClass('disabled');
          $('#redo').unbind('click.grouper');
        }

        /* Execute Redo */
        var toBeRedone = redoStack.pop();
        if(toBeRedone[0] === "drag"){
          //drag redo
          undoStack.push([toBeRedone[0],toBeRedone[1],student_dict[toBeRedone[1].attr("student_id")].group]);
          student_dict[toBeRedone[1].attr("student_id")].group = toBeRedone[2];
          //get them to move
          force.stop();
          force.start();
        }else if(toBeRedone[0]==="delete"){
          undoStack.push(toBeRedone);
          var bubble = toBeRedone[1];
          var id = bubble.attr("student_id");

          students_copy = students_copy.filter(function(el){return el.index != id});
          students = students.filter(function(el){return el.index != id});
          bubble.remove();
          start();
          activeGroup.data = students;
        }else{
          var tmpGroup = student_dict[toBeRedone[0].attr("student_id")].group;
          student_dict[toBeRedone[0].attr("student_id")].group = student_dict[toBeRedone[1].attr("student_id")].group;
          student_dict[toBeRedone[1].attr("student_id")].group = tmpGroup;
          undoStack.push(toBeRedone);
          //get them to move
          force.stop();
          force.start();          
        }

        /* Store Redo in DB */
        Meteor.call('moveBubble', {
          bubble_index: toBeRedone[1].attr("student_id"),
          class_id: Session.get('active'),
          new_group: student_dict[toBeRedone[1].attr("student_id")].group
        });
      }
    }

    /*
     * Key Listeners for Undo, Redo, and Delete
     */
    $(window).keydown(function(e) {
      if (e.metaKey) {
        if (e.keyCode == 90 && e.shiftKey) { //shift+z
          redo(e)
        } else if (e.keyCode == 90) { //z
          undo(e)          
        } 
      } else {
        if((e.keyCode == 46 || e.keyCode == 8) && $(".selected").length > 0){
          var bub = $(".selected")
          bub.removeClass("selected");
          //unhookup second function
          $(".bubble").unbind("click");
          $(document).unbind("click", deselect);
          //hookup first function
          $(".bubble").click(nothingSelected);
          deleteBubble(bub);
          e.preventDefault();
        }
      }
    });

    /////////////////////////////////////////////////////// -- SWAPPING STUFF -- ///////////////////////////////////////////////////////

    var nothingSelected = function(evt){
      var point = {
        'x':evt.pageX - $("#bubble-canvas").position().left,
        'y':evt.pageY - $("#bubble-canvas").position().top
      };
      var focus = closestFocus(point);

      if (focus == student_dict[$(this).attr("student_id")].group) {
        //if just clicking -> add selected class
        $(this).addClass("selected");

        //add listener to click on everything else for swap
        $(".bubble").unbind("click");
        $(".bubble").click(bubbleSelected);
        evt.stopPropagation();

        //add listener to click on background to deselect
        $(document).click(deselect);
        
        force.stop();
        force.start();
      } else {
        moveToGroup($(this),focus);
      }
    }

    var bubbleSelected = function(evt){
      console.log("bubble selected");
      if (student_dict[$(this).attr("student_id")].group !== student_dict[$(".selected").attr("student_id")].group) { // bubble swap
        console.log('bubble swap');
        //display undo, undisplay redo
        $("#redo").addClass('disabled');
        $('#undo').removeClass('disabled');
        if (! $._data($('#undo')[0], 'events').click) {
          $("#undo").bind('click.grouper', undo);
        }

        undoStack.push([$(this),$(".selected")]);
        redoStack = [];

        var tmpGroup = student_dict[$(this).attr("student_id")].group;

        student_dict[$(this).attr("student_id")].group = student_dict[$(".selected").attr("student_id")].group;
        student_dict[$(".selected").attr("student_id")].group = tmpGroup;
        $(".selected").removeClass("selected");

    ///-----------------------------------------///
      Meteor.call('moveBubble', {
        bubble_index: $(".selected").attr("student_id"),
        class_id: Session.get('active'),
        new_group: student_dict[$(".selected").attr("student_id")].group
      });
    ///-----------------------------------------///

        //unhookup second function
        $(".bubble").unbind("click");
        $(document).unbind("click", deselect);

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
        $(document).unbind("click", deselect);
        //hookup first function
        $(".bubble").click(nothingSelected);
        evt.stopPropagation();

        var point = {'x':evt.pageX - $("#bubble-canvas").position().left
        , 'y':evt.pageY - $("#bubble-canvas").position().top};
        var focus = closestFocus(point);

        if(focus != student_dict[$(this).attr("student_id")].group){
          moveToGroup($(this),focus);
        }
      }else{
        

        console.log("got here");
        $(".selected").removeClass("selected");

        var point = {'x':evt.pageX - $("#bubble-canvas").position().left
        , 'y':evt.pageY - $("#bubble-canvas").position().top};
        var focus = closestFocus(point);
        if(focus != student_dict[$(this).attr("student_id")].group){
          moveToGroup($(this),focus);
          //unhookup second function
          $(".bubble").unbind("click");
          $(document).unbind("click", deselect);
          //hookup first function
          $(".bubble").click(nothingSelected);
        }else{
          $(this).addClass("selected");

        }
        evt.stopPropagation();

      }

    // DON'T THINK THIS IS NECESSARY?
    // ///-----------------------------------------///
    //   Meteor.call('moveBubble', {
    //     class_id: Session.get('active'),
    //     bubble_data: Classes.findOne({_id: Session.get('active')})['data'][$(".selected").attr("student_id")],
    //     new_group: student_dict[$(".selected").attr("student_id")].group
    //   });
    // ///-----------------------------------------///
      
    }

    var deselect = function(evt){
      console.log("deselect");
      $(".selected").removeClass("selected");
      //unhookup second function

      $(".bubble").unbind("click");
      $(document).unbind("click", deselect);

      //hookup first function
      $(".bubble").click(nothingSelected);
    }

    $(".bubble").click(nothingSelected);


    var closestFocus = function(point){
      var closest = 0;
      closestDist = dist(foci[0],point);
      for (var i = foci.length - 1; i >= 1; i--) {
        if(dist(foci[i],point) < closestDist){
          closest = i;
          closestDist = dist(foci[i],point);
        }
      };
      return closest;
    }

    var dist = function(p,p2){
      return (p.x-p2.x)*(p.x-p2.x) + (p.y-p2.y)*(p.y-p2.y);
    }

    var moveToGroup = function(bubble, focus){
      console.log('bubble moved to group');
      // show undo, hide redo
      $("#redo").addClass('disabled');
      // $('#redo').unbind('click.grouper');
      $('#undo').removeClass('disabled');
      if (! $._data($('#undo')[0], 'events').click) {
        $("#undo").bind('click.grouper', undo);
      }

      undoStack.push(["drag",bubble,student_dict[bubble.attr("student_id")].group]);
      redoStack = [];

      var updated_student = student_dict[bubble.attr("student_id")];
      updated_student.group = focus;

      Meteor.call('moveBubble', {
        class_id: Session.get('active'),
        bubble_index: bubble.attr('student_id'),
        new_group: focus
      });

      force.stop();
      force.start();
    }
    
    start = function (){
      node = svg.selectAll(".node")
      node = node.data(force.nodes(), function(d) { return d.id;});
      node.enter().append("circle").attr("class", function(d) { return "node_" + d.id; });
      node.exit().remove(); 
      force.start()
    }
    
    // TODO: update the undo/redo for this function
    deleteBubble = function(bubble){
      $("#redo").addClass('disabled');
      $("#undo").addClass('disabled');
      // $("#buttons").prepend("<a id=undo class='btn'>undo</a>");
      $('#undo').removeClass('disabled');
      if (! $._data($('#undo')[0], 'events').click) {
        $("#undo").bind('click.grouper', undo);
      }
      var id = bubble.attr("student_id");
      undoStack.push(["delete",bubble,student_dict[bubble.attr("student_id")].group,students.filter(function(el){return el.index == id})[0]]);
      redoStack = [];

      students_copy = students_copy.filter(function(el){return el.index != id})
      students = students.filter(function(el){return el.index != id})
      bubble.remove()
      start()
      Parse.User.current().save(
                {'groups': Grouper.groups }, 
                { error: function(obj, error) { console.log(error); }
            });
      activeGroup.data = students;
      return bubble;
    }

    /*
    //unused
    addBubble = function(bubble){
      $("#redo").remove();
      $("#undo").remove();
      $("#buttons").prepend("<a id=undo class='btn'>undo</a>");
      if (!$('#undo').hasClass('disabled')) $("#undo").click(undo);
      redoStack.push(["delete",bubble,student_dict[bubble.attr("student_id")].group]);
      redoStack = [];

      var id = bubble.attr("student_id");
      students_copy = students_copy.filter(function(el){return el.index != id})
      students = students.filter(function(el){return el.index != id})
      bubble.remove()
      start()

    }*/
    

    function redraw() {
      for (var i = filters['group'].length - 1; i >= 0; i--) {
        if(points[i].length >= 3){
          hulls[i].datum(d3.geom.hull(points[i])).attr("d", function(d) { return "M" + d.join("L") + "Z"; });
        }else if(points[i].length === 2){
          //I just use my 2 points multiple times so that it is willing to draw a line
          hulls[i].datum(d3.geom.hull(points[i].concat(points[i]))).attr("d", function(d) { return "M" + d.join("L") + "Z"; });
        }else if(points[i].length === 1){
          //I made one point very slightly different so that it will draw
          //I'm sorry mike bostock :(
          hackytmp = points[i][0][0] + .01;
          list = [[hackytmp,points[i][0][1]]].concat(points[i].concat(points[i]));
          hulls[i].datum(d3.geom.hull(list)).attr("d", function(d) { return "M" + d.join("L") + "Z"; });

        }else{
          //again, hacky-basically I just want to draw it with nothing
          //but I'm not sure how to do that so I draw with all same point
          hulls[i].datum(d3.geom.hull([[1,1],[1,1],[1,1]])).attr("d", function(d) { return "M" + d.join("L") + "Z"; });
        }
        // hulls[i].attr("fill", getHullColor(i))
        // hulls[i].attr("stroke", getHullColor(i))
        hulls[i].attr("fill", '#8d8d8d')
        hulls[i].attr("stroke", '#8d8d8d')
      };
    }

    return student_dict;

};