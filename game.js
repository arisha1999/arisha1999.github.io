var level=1;
var timer=10;
var gameField = document.getElementById("gameField");
var interval;

window.onload = function (){
    if(localStorage.length>1 && (localStorage.getItem("x")!="NaN" && (localStorage.getItem("gameLost")!="NaN"||localStorage.getItem("gameLost")=="true"))){
        newGame();
        loadTournamentTable();
    }
    else{
        localStorage.setItem("isUnloaded","false");
    }
}

window.onunload = function(){

}

function newGame(){
    clearInterval(interval);
    if(localStorage.getItem("isUnloaded")!="true"){
        localStorage.clear();
        var t = confirm("Do you want to start new game?!");
    }
    else {
        var r = true;
    }
    interval = setInterval(timerWork, 1000);
    if (t == true && r != true) {
        level = 1;
    }
    else{
        level = parseInt(localStorage.getItem("level"));
    }
    document.getElementById("level").innerHTML = level;
    createGameField(level);
}

function createGameField(level){
    clearInterval(interval);
    const hue = rand(0, 360),
        saturation = 100,
        lightness = 50;
    if(localStorage.getItem("isUnloaded")!="true"){
        var x=rand(0,level);
        var y=rand(0,level);
        var field_color="hsl(" + hue.toString() + ", " + saturation.toString() + "%, " + lightness.toString() + "%)";
        var main_color= "hsl(" + hue.toString() + ", " + (saturation - saturation/level).toString() + "%, " + (lightness - lightness/level).toString() + "%)";
        timer = 10;
    }
    else{
        var x = localStorage.getItem("x");
        var y = localStorage.getItem("y");
        var field_color= localStorage.getItem("field_color");
        var main_color = localStorage.getItem("main_color");
        timer = localStorage.getItem("timer");
    }
    localStorage.setItem("isUnloaded","false");
    window.onunload = function(){
        if(localStorage.getItem("gameLost")!="true"){
            localStorage.setItem("level",level);
            localStorage.setItem("x",x);
            localStorage.setItem("y",y);
            localStorage.setItem("field_color",field_color);
            localStorage.setItem("main_color",main_color);
            localStorage.setItem("isUnloaded","true");
            localStorage.setItem("gameLost","false");
        }
    }
    document.getElementById("time").innerHTML = timer+'s';
    interval = setInterval(function (){timerWork(level)}, 1000);
    document.getElementById("level").innerHTML = level;
    gField=new Array(level+1);

    for (i=0;i<level+1;i++) gField[i]=new Array(level+1);

    var nextlevel=level+1;
    var hT="<table border=1px  >";
    for (i=0;i<level+1;i++) {
        hT+="<tr  >";
        for (j=0;j<level+1;j++) {
            if(i==x && j==y)
                hT+="<td id='"+i+j+"' onclick='createGameField("+nextlevel+")' bgColor='"+main_color+"'></td>";
            else
                hT+="<td id='"+i+j+"' bgColor='"+field_color+"' onclick='gameLost("+level+")'></td>";
        }
        hT+="</tr>";
    }

    document.getElementById('botButton').onclick = function (){startBot(level+1);};
    document.getElementById('gameField').innerHTML = hT+"</table>";
}

function rand(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function startBot(level){
    if(level !=0) {
        var x1=0,y1=0, x2,y2,count_1=0, count_2=0,color1 = document.getElementById('00').bgColor, color2;
        for (var i = 0; i < level; i++) {
            for (var j = 0; j < level; j++) {
                color2 = document.getElementById(i+""+j).bgColor;
                if(color1.toString()!=color2.toString()){
                    count_2++;
                    x2=i;
                    y2=j;
                }
                else {
                    count_1++;
                }
            }
        }
        if(count_1<count_2){
            document.getElementById(x1+""+y1).click();
        }
        else {
            document.getElementById(x2+""+y2).click();
        }
    }
    else{
        alert("There is nothing to help you with!");
    }
}

function timerWork(level) {
    timer = timer-1;
    localStorage.setItem("timer",timer);
    document.getElementById("time").innerHTML = timer + "s";
    if (timer < 0) {
        gameLost(level);
    }
}

function gameLost(level){
    alert(`GAME OVER! YOU REACHED ${level.toString()} LEVEL!`);
    document.getElementById('gameField').innerHTML = '';
    timer = 0;
    document.getElementById('time').innerHTML = timer;
    document.getElementById('level').innerHTML = 0;
    document.getElementById('botButton').onclick = function (){
        startBot(0);
    };
    localStorage.clear();
    localStorage.setItem("gameLost","true");
    clearInterval(interval);
}

function loadTournamentTable(){

}

function addToTournamentTable(){

}
