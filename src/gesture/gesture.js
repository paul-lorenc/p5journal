var gesture = function(s) {
    s.on = false
    s.point_stack = []
    s.last_two = []
    s.gestures = []
    s.GESTURE_POINT_NUM = 5

    s.setup = function() {
        s.createCanvas(windowWidth/4+windowWidth/16, windowWidth/4+windowWidth/16)
    }

    s.draw = function() {
        s.push()
        s.background(30, 64, 88)
        s.noFill()
        if(s.point_stack.length === s.GESTURE_POINT_NUM) {
            s.last_two.push(s.point_stack)
            s.point_stack = []
        }

        if(s.last_two.length === 2) {
            s.gestures.push({
                point_set: s.last_two,
                f: ge_pickDrawFunction()
            })
            s.last_two = []
        }
        for(let j = 0; j < s.point_stack.length; j++) {
            s.ellipse(s.point_stack[j].x,s.point_stack[j].y, 3)
        }
        s.multicurve(s.point_stack)

        for(let k = 0; k < s.last_two.length; k++) {
            s.multicurve(s.last_two[k])
        }

        for(let i = 0; i < s.gestures.length; i++) {
            s.multicurve(s.gestures[i].point_set[0])
            s.multicurve(s.gestures[i].point_set[1])
            s.gestures[i].f(s, s.gestures[i].point_set)
        }
    }

    s.windowResized = function() {
        s.resizeCanvas(s.windowWidth/4, s.windowHeight/4)
    }

    s.mousePressed = function() {
        p = {
            x: s.mouseX,
            y: s.mouseY
        }
        if(!s.inCanvas(p)) {
            return
        }
        s.noFill()
        console.log("x: " + s.mouseX)
        console.log("y: " + s.mouseY)
        s.point_stack.push(p)
        
    }

    s.inCanvas = function(p) {
        return !(p.x < 0 || p.y < 0 || !half_canvas)
    }

    s.multicurve = function(points) {
        var p0, p1, midx, midy;

        s.beginShape()

        if(points.length < 3) {
            return
        }

        s.vertex(points[0].x, points[0].y);

        for(var i = 1; i < points.length - 2; i += 1) {
            p0 = points[i];
            p1 = points[i + 1];
            midx = (p0.x + p1.x) / 2;
            midy = (p0.y + p1.y) / 2;
            s.quadraticVertex(p0.x, p0.y, midx, midy);
            s.vertex(midx, midy)
        }
        p0 = points[points.length - 2];
        p1 = points[points.length - 1];
        s.quadraticVertex(p0.x, p0.y, p1.x, p1.y);
        s.endShape()
    }
}