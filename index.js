class Vector{
    constructor(x=0,y=0){
        this.x = x;
        this.y = y;
    }

    normalize(){
        var norm = Math.sqrt(this.x*this.x + this.y*this.y);
        if(norm>0){
            return new Vector(this.x/norm , this.y/norm);
        }else return new Vector(0,0);
    }

    add(vec){
        return new Vector(this.x + vec.x, this.y + vec.y);
    }

    get_norm(){
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    dot(vec){
        return this.x*vec.x + this.y*vec.y;
    }

    mult(c=1){
        return new Vector(this.x * c, this.y * c);
    }

    transform(){
        var a = 100;
        var b = 400;
        return new Vector(this.x*a+b,this.y*a+b);
    }
}

class Track{

    constructor(){
        this.point = [];
        this.current_point = new Vector(0,0);
        this.audio = new Audio("sounds/snare.wav");
        this.current_goal = 1;
        this.bpm = 115;
    }

    add(pointvec){
        this.point.push(pointvec);
    }

    setbpm(bpm){
        this.bpm = bpm;
    }

    setmp3(filename){
        this.audio = new Audio("sounds/"+filename);
    }

    remove(){
        this.point.pop();
    }

    setstart(vec){
        this.current_point = new Vector(vec.x,vec.y);
    }

    play(time_delta = 0.01){
        // console.log("play");
        // console.log(this);

        paint.brushNode.paintJS.brushColor="#000000"
        paint.brushNode.paintJS.brush.mousedown(this.current_point.transform());
        paint.brushNode.paintJS.brush.mouseup();

        var dist_delta = this.bpm * time_delta / 60;
        var goal_vec = this.point[this.current_goal].add(this.current_point.mult(-1));
        goal_vec = goal_vec.normalize();
        this.current_point = this.current_point.add(goal_vec.mult(dist_delta));

        paint.brushNode.paintJS.brushColor="#ff0000"
        paint.brushNode.paintJS.brush.mousedown(this.current_point.transform());
        paint.brushNode.paintJS.brush.mouseup();

        if(this.current_point.add(this.point[this.current_goal].mult(-1)).get_norm()<=dist_delta/2){
            console.log("goal finish");
            this.audio.play();
            this.current_goal = (this.current_goal+1) % this.point.length;
        }
    }

    draw(){
        for(var i=0;i<this.point.length;i++){
            paint.brushNode.paintJS.brush.mousedown(this.point[i].transform());
            paint.brushNode.paintJS.brush.mousemove(this.point[(i+1)%this.point.length].transform());
            paint.brushNode.paintJS.brush.mouseup();
        }
    }
}
var track1 = new Track();
var track2 = new Track();
var track3 = new Track();

document.addEventListener("DOMContentLoaded", function(){
    console.log("document ready");
    
    track1.add(new Vector(0,1));
    track1.add(new Vector(-1,1));
    track1.add(new Vector(-1,0));
    track1.add(new Vector(1,0));
    track1.add(new Vector(1,-1));
    track1.add(new Vector(0,-1));
    track1.setstart(new Vector(0,1));
    track1.setbpm(160);
    track1.setmp3("kick.wav");
    track1.draw();

    
    track2.add(new Vector(-1.5,1.5));
    track2.add(new Vector(-1.5,-2.5));
    track2.add(new Vector(0,-2.5));
    track2.add(new Vector(0,-1.5));
    track2.add(new Vector(1.5,-1.5));
    track2.add(new Vector(1.5,2.5));
    track2.add(new Vector(0,2.5));
    track2.add(new Vector(0,1.5));
    track2.setstart(new Vector(-1.5,0.5));
    track2.setbpm(160);
    track2.setmp3("snare.wav");
    track2.draw();

    track3.add(new Vector(4,1));
    track3.add(new Vector(5,1));
    track3.add(new Vector(5,0));
    track3.add(new Vector(4,0));
    track3.add(new Vector(4,-1));
    track3.add(new Vector(3,-1));
    track3.add(new Vector(3,0));
    track3.add(new Vector(4,0));
    track3.setstart(new Vector(4,1));
    track3.setbpm(160);
    track3.setmp3("hihat.wav");
    track3.draw();


    
});

document.getElementById("btn1").addEventListener("click",function(){
    time_delta = 40;
    var playtrack1 = setInterval(function(){
        track1.play(time_delta/1000)
    },time_delta);
    var playtrack2 = setInterval(function(){
        track2.play(time_delta/1000)
    },time_delta);
    var playtrack3 = setInterval(function(){
        track3.play(time_delta/1000)
    },time_delta);
})