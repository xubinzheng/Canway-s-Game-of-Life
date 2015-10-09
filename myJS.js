/**
 * Created by xubinzheng1 on 10/4/15.
 */



    var deathL = 2;
    var deathO = 3;
    var gmin = 3;
    var gmax = 3;
    var radius = 1;

    var deadColor = "#FFFFFF";
    var liveColor = "#FF6600";
    var wasLiveColor = "#FFCC99";

    var tablesize = 20;
    var timeInterval = 1000;

    var myArray = Array.apply(null, Array(40000)).map(Number.prototype.valueOf,0);
    var tempArray = Array.apply(null, Array(40000)).map(Number.prototype.valueOf,0);
    var running = 0;

    var outside = 0;
    //0 consider dead, 1 consider live, 2 the other side




$(document).ready(function(){

    $("#startBtn").button().click(function(event){
        start(timeInterval);
    });

    $("#stopBtn").button().click(function(event){
        running = 0;
        stop(event);
    });

    $("#nextBtn").button().click(function(event){
        next();
    });

    $("#resetBtn").button().click(function(event){
        reset();
    });

    $("#randomBtn").button().click(function(event){
        random();
    });

    createMenuO(radius,deathL,gmin);

    $("#neighbor").selectmenu({
        width: 100,
        change: function(event,data){
            radius = parseInt(data.item.value);
            createMenuO(radius,deathL,gmin);
            update(1);
            if(running == 1){
                stop();
                start(timeInterval);
            }
        }
    });

    $("#Lonliness").selectmenu({
        width: 100,
        change: function(event,data){
            deathL = parseInt(data.item.value);
            createMenuO(radius,deathL,gmin);
            update(2);
            if(running == 1){
                stop();
                start(timeInterval);
            }
        }

    });

    $("#OverPop").selectmenu({
        width: 100,
        change: function(event,data){
            deathO = parseInt(data.item.value);
            if(running == 1){
                stop();
                start(timeInterval);
            }
        }

    });

    $("#GenMin").selectmenu({
        width: 80,
        change: function(event,data){
            gmin = parseInt(data.item.value);
            createMenuO(radius,deathL,gmin);
            update(3);
            if(running == 1){
                stop();
                start(timeInterval);
            }
        }
    });

    $("#GenMax").selectmenu({
        width: 70,
        change: function(event,data){
            gmax = parseInt(data.item.value);
            if(running == 1){
                stop();
                start(timeInterval);
            }
        }
    });


    $("#Outside").selectmenu({
        width: 100,
        change: function(event,data){
            outside = parseInt(data.item.value);
            console.log(outside);
            if(running == 1){
                stop();
                start(timeInterval);
            }
        }
    });

    createTable(tablesize);

    $("#sizeSlider").slider({
        min: 20,
        max: 200,
        value: 20,
        step: 1,
        stop: function(event,ui){
            reset();
            cleanArray();
            setSize(ui.value);
            $('#myTable').empty();

            createTable(tablesize);
        }

    });

    $("#speedSlider").slider({
        min: 0,
        max: 3000,
        value: 1000,
        step: 1,
        slide: function(event,ui){
            timeInterval = ui.value;
            if(running == 0){
            }else{
                stop();
                start(timeInterval);
            }
        }
    });
});





function observer(a){
    if (event.shiftKey){
        myArray[a] = 2;
        tempArray[a] = 2;
        document.getElementById("myTable").getElementsByTagName("td")[a].style.background=liveColor;

    }else if (event.altKey){
        if (myArray[a] > 0){
            myArray[a] = 1;
            tempArray[a] = 1;
            document.getElementById("myTable").getElementsByTagName("td")[a].style.background=wasLiveColor;
        }else{
            myArray[a] = 0;
            tempArray[a] = 0;
            document.getElementById("myTable").getElementsByTagName("td")[a].style.background=deadColor;
        }
    }else{
        if (myArray[a] > 0){
            if(myArray[a] == 2){
                myArray[a] = 1;
                tempArray[a] = 1;
                document.getElementById("myTable").getElementsByTagName("td")[a].style.background=wasLiveColor;
            }else{
                myArray[a] = 2;
                tempArray[a] = 2;
                document.getElementById("myTable").getElementsByTagName("td")[a].style.background=liveColor;
            }
        }else{
            myArray[a] = 2;
            tempArray[a] = 2;
            document.getElementById("myTable").getElementsByTagName("td")[a].style.background=liveColor;
        }
    }

}


function createTable(index) {
        var size = 600/index-2;
        var table = $('<table cellspacing=0 cellpadding=0 align="center" style="margin: 0px auto;"></table>').addClass('table');
        for (var i = 0; i < index; i++) {
            var row = $('<tr></tr>');
            for (var j = 0; j < index; j++) {
                var number = index*i+j;

                if(myArray[number] == 0){
                    var rowData = $('<td onclick=observer('+number+') bgcolor='+deadColor+' width='+size+'px height='+size+'px></td>');
                }else if (myArray[number] == 1){
                    var rowData = $('<td onclick=observer('+number+') bgcolor='+wasLiveColor+' width='+size+'px height='+size+'px></td>');
                }else{
                    var rowData = $('<td onclick=observer('+number+') bgcolor='+liveColor+' width='+size+'px height='+size+'px></td>');
                }
                row.append(rowData);
            }
            table.append(row);
        }

        if ($('table').length) {
            $("#someContainer tr:first").after(row);
        }
        else {
            $('#myTable').append(table);
        }
}


var timer1 = 0;

function start(a){
    if (running == 0){
        console.log("Delay "+a+" ms");
        timer1 = setInterval(refresh,a);
        running = 1;
    }
}


function stop(){
    clearInterval(timer1);
    console.log("Timer Stoped");
    running = 0;
}


function setSize(newsize){
    tablesize = newsize;
}


function next(){
    if(running == 0){
        nextStep();
    }
}


function reset(){
    stop();
    for(var i = 0; i < tablesize*tablesize; i++){
        myArray[i] = 0;
        tempArray[i] = 0;
        document.getElementById("myTable").getElementsByTagName("td")[i].style.background=deadColor;
    }
}


function cleanArray(){
    for(var i = 0; i < tablesize*tablesize; i++){
        myArray[i] = 0;
    }
}


function random(){
    reset();
    for(var i = 0; i < tablesize*tablesize; i++){
        if(Math.random()>0.5){
            myArray[i] = 0;
            document.getElementById("myTable").getElementsByTagName("td")[i].style.background=deadColor;
        }else{
            myArray[i] = 2;
            document.getElementById("myTable").getElementsByTagName("td")[i].style.background=liveColor;
        }
    }
}


function refresh(){
    nextStep();
}


function nextStep(){
    for(var i = 0; i < tablesize*tablesize; i++){
        var liveCount = 0;
        var numberNode = 0;
        var upper = radius;
        var lower = radius;

        var floor = Math.floor(i/tablesize);

        var rightNumber = (floor+1) * tablesize-1;
        var leftNumber = floor*tablesize;

        var left = radius;
        var right = radius;

        if ( floor < radius){
            upper = floor;
        }else if (floor+radius > tablesize-1){
            lower = tablesize-1-floor;
        }

        if (i+radius > rightNumber){
            right = rightNumber-i;
        }else if (i-radius < leftNumber){
            left = i-leftNumber;
        }

        for (var j = -upper; j<=lower; j++){
            for (var k = -left; k<=right; k++){
                numberNode++;
                if(myArray[i+j*tablesize+k] == 2){
                    liveCount = liveCount+1;

                }
            }
        }

        if(outside == 0){
        }else if (outside == 1){
            var range = radius*2+1
            liveCount = liveCount + (range*range - numberNode);
        }else{
            var outsideNumber = outSideCount(upper,lower,left,right,radius,tablesize,i);
            liveCount = liveCount + outsideNumber;
        }

        if(myArray[i]==2){
            liveCount = liveCount-1;
        }

        if(liveCount < deathL){
            if(myArray[i] == 2) {
                tempArray[i] = 1;
            }
        }else if (liveCount > deathO){
            if(myArray[i] == 2) {
                tempArray[i] = 1;
            }
        }else if (liveCount >= gmin && liveCount <= gmax){
            tempArray[i] = 2;
        }


        if (tempArray[i] == 2){
            document.getElementById("myTable").getElementsByTagName("td")[i].style.background=liveColor;
        }else if (tempArray[i] == 1){
            document.getElementById("myTable").getElementsByTagName("td")[i].style.background=wasLiveColor;
        }else{
            document.getElementById("myTable").getElementsByTagName("td")[i].style.background=deadColor;
        }

    }
    for(var i =0; i< tablesize*tablesize; i++){
        myArray[i] = tempArray[i];
    }
}


function createMenuO(a,b,c){
    var lRange = 4*a*a+4*a;
    $('#Lonliness').empty();
    for (var j =0; j < lRange; j ++){
        if(j == 2){
            $('#Lonliness').append("<option selected=selected value=" +j+ ">Less than " +j+ " </option>");
        }else{
            $('#Lonliness').append("<option value=" +j+ ">Less than " +j+ " </option>");
        }
    }

    var oRange = 4*a*a+4*a;
    $('#OverPop').empty();
    for (var j =b; j < oRange; j ++){
        if(j == deathL+1){
            $('#OverPop').append("<option selected=selected value=" +j+ ">Over than " +j+ " </option>");
        }else{
            $('#OverPop').append("<option value=" +j+ ">Over than " +j+ " </option>");
        }
    }

    $('#GenMin').empty();
    for (var j =0; j < lRange; j ++){
        if(j == 3){
            $('#GenMin').append("<option selected=selected value=" +j+ ">From " +j+ " </option>");
        }else{
            $('#GenMin').append("<option value=" +j+ ">From " +j+ "</option>");
        }
    }

    $('#GenMax').empty();
    for (var j =c; j < lRange; j ++){
        if(j == c){
            $('#GenMax').append("<option selected=selected value=" +j+ ">To " +j+ " </option>");
        }else{
            $('#GenMax').append("<option value=" +j+ ">To " +j+ " </option>");
        }
    }
}


function update(a){
    if (a ==1){
        $('#Lonliness').selectmenu("refresh");
        $('#OverPop').selectmenu("refresh");
        $('#GenMin').selectmenu("refresh");
        $('#GenMax').selectmenu("refresh");
    }else if (a ==2){
        $('#OverPop').selectmenu("refresh");
    }else{
        $('#GenMax').selectmenu("refresh");
    }

}


function outSideCount(upper,lower,left,right,radius,tablesize,location){
    var count = 0;

    var exU = radius - upper;
    var exD = radius - lower;
    var exL =radius - left;
    var exR = radius - right;

    if(exU > 0){
        console.log('location '+location);
        if(exL > 0){
            var k = tablesize - radius;
            for (var i = k; i <= k+exL-1; i++){
                for(var j = k; j <=k+exU-1; j++){
                    if(myArray[location+j*tablesize+i]==2){
                        count++;
                    }
                }
            }
            for(var i = -upper; i<= lower; i++){
                for(var j =  k; j <= k+exL-1; j++){
                    if(myArray[location+i*tablesize+j]==2){
                        count++;
                    }
                }
            }
            for (var i = -radius+1; i <= radius; i++){
                for(var j = k; j <=k+exU-1; j++){
                    if(myArray[location+j*tablesize+i]==2){
                        count++;
                    }
                }
            }
        }else if (exR > 0){
            var k = tablesize - radius;
            var p = tablesize - 1;

            for (var i =  -p; i <= -p+exR-1; i++){
                for(var j = k; j <=k+exU-1; j++){
                    if(myArray[location+j*tablesize+i]==2){
                        count++;
                    }
                }
            }
            for (var i = -radius; i < radius; i++){
                for(var j = k; j <=k+exU-1; j++){
                    if(myArray[location+j*tablesize+i]==2){
                        count++;
                    }
                }
            }
            for(var i = -upper; i<= lower; i++){
                for(var j =  -p; j <= -p+exR-1; j++){
                    if(myArray[location+i*tablesize+j]==2){
                        count++;
                    }
                }
            }
        }else{
            var k = tablesize - radius;
            for (var i = -radius; i <= radius; i++){
                for(var j = k; j <=k+exU-1; j++){
                    if(myArray[location+j*tablesize+i]==2){
                        count++;
                    }
                }
            }

        }

    }else if (exD > 0){
        if(exL > 0){
            var k = tablesize - radius;
            var p = tablesize - 1;
            console.log('location '+location);
            for (var i = k; i <= k+exL-1; i++){
                for(var j =  -p; j <= -p+exD-1; j++){
                    if(myArray[location+j*tablesize+i]==2){
                        count++;
                    }
                }
            }
            for(var i = -upper; i<= lower; i++){
                for(var j =  k; j <= k+exL-1; j++){
                    if(myArray[location+i*tablesize+j]==2){
                        count++;
                    }
                }
            }
            for(var i = -radius+1; i<= radius; i++){
                for(var j =  -p; j <= -p+exD-1; j++){
                    if(myArray[location+j*tablesize+i]==2){
                        count++;
                    }
                }
            }
        }else if (exR > 0){
            var k = tablesize - radius;
            var p = tablesize - 1;
            for (var i =  -p; i <= -p+exR-1; i++){
                for(var j =  -p; j <= -p+exD-1; j++){
                    if(myArray[location+j*tablesize+i]==2){
                        count++;
                    }
                }
            }
            for(var i = -radius; i< radius; i++){
                for(var j =  -p; j <= -p+exD-1; j++){
                    if(myArray[location+j*tablesize+i]==2){
                        count++;
                    }
                }
            }

            for(var i = -upper; i<= lower; i++){
                for(var j =  -p; j <= -p+exR-1; j++){
                    if(myArray[location+i*tablesize+j]==2){
                        count++;
                    }
                }
            }
        }else{
            var p = tablesize - 1;
            for(var i = -radius; i<= radius; i++){
                for(var j =  -p; j <= -p+exD-1; j++){
                    if(myArray[location+j*tablesize+i]==2){
                        count++;
                    }
                }
            }
        }

    }else{
        if(exL > 0){
            var k = tablesize - radius;
            for(var i = -upper; i<= lower; i++){
                for(var j =  k; j <= k+exL-1; j++){
                    if(myArray[location+i*tablesize+j]==2){
                        count++;
                    }
                }
            }
        }else if (exR > 0){
            var p = tablesize - 1;
            for(var i = -upper; i<= lower; i++){
                for(var j =  -p; j <= -p+exR-1; j++){
                    if(myArray[location+i*tablesize+j]==2){
                        count++;
                    }
                }
            }
        }else{

        }
    }
    return count;
}




