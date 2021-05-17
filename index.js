var bpm = 160;

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
}

class Track{

    constructor(){
        this.point = [];
        this.current_point = new Vector(0,0);
        this.audio = new Audio("sounds/snare.wav");
        this.current_goal = 1;
    }

    add(pointvec){
        this.point.push(pointvec);
    }

    remove(){
        this.point.pop();
    }
    play(time_delta = 0.01){
        // console.log("play");
        // console.log(this);
        var dist_delta = bpm * time_delta / 60;
        var goal_vec = this.point[this.current_goal].add(this.current_point.mult(-1));
        goal_vec = goal_vec.normalize();
        this.current_point = this.current_point.add(goal_vec.mult(dist_delta));
        if(this.current_point.add(this.point[this.current_goal].mult(-1)).get_norm()<=0.02){
            console.log("goal finish");
            //this.audio.play();
            this.current_goal = (this.current_goal+1) % this.point.length;
        }
    }
}

document.addEventListener("DOMContentLoaded", function(){
    console.log("document ready");
    var track = new Track();
    track.add(new Vector(0,0));
    track.add(new Vector(1,0));
    bpm = 120;

    console.log("track ready");
    console.log(track);
    var playtrack = setInterval(function(){
        track.play()
    },10);
});