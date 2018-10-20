document.getElementById("res").innerHTML = "0";
document.getElementById("expr").innerHTML = "0";

var buttons = document.getElementsByTagName("button");

for(var i=0; i<buttons.length; i++){
    buttons[i].addEventListener("click", function(e){
        var txt = e.target.innerHTML;
        if(txt === "CA") {
            document.getElementById("expr").innerHTML = "0";
            document.getElementById("res").innerHTML = "0";
        } else if(txt === "←"){
            var expr = document.getElementById("expr").innerHTML;
            document.getElementById("expr").innerHTML = expr.substr(0, expr.length-1);
            if(document.getElementById("expr").innerHTML == "")
                document.getElementById("expr").innerHTML = "0"
        } else if(txt === "."){
            var expr = document.getElementById("expr").innerHTML;
            
            var found = false;
            for(var j=expr.length-1; j>=0; j--){
                if(expr[j] == "."){
                    found = true;
                    break;
                }
                if("+÷x-".indexOf(expr[j]) >= 0){
                    break;
                }
            }
            if(!found)
                document.getElementById("expr").innerHTML += "."
        }
        
        else if(!isNaN(txt)){
            if(document.getElementById("expr").innerHTML === "0")
                document.getElementById("expr").innerHTML = ""
            
            document.getElementById("expr").innerHTML += txt;
            var expr = document.getElementById("expr").innerHTML;

            expr = expr.replace(/÷/gi, "/").replace(/x/gi, "*");
            
            document.getElementById("res").innerHTML = eval(expr)+"";
        } else if(txt !== "=") {
            var expr = document.getElementById("expr").innerHTML;
            
            if("+÷x-".indexOf(expr[expr.length-1]) < 0){
                document.getElementById("expr").innerHTML += txt;

                if(!isNaN(expr[expr.length-1])){
                    expr = expr.replace(/÷/gi, "/").replace(/x/gi, "*");
                    document.getElementById("res").innerHTML = eval(expr)+"";
                }
            }
        } else {
            document.getElementById("expr").innerHTML = document.getElementById("res").innerHTML;
        }
    })
}

window.addEventListener("keypress", function(e){
    for(var i=0; i<buttons.length; i++){
        if(buttons[i].innerHTML === e.key)
            buttons[i].click();
        else if(buttons[i].innerHTML === "x" && e.key === "*")
            buttons[i].click();
        else if(buttons[i].innerHTML === "÷" && e.key === "/")
            buttons[i].click();
        else if(buttons[i].innerHTML === "←" && e.key === "Backspace")
            buttons[i].click();
            
        if(buttons[i].innerHTML === "=" && e.key === "Enter")
            buttons[i].click();
    }
})