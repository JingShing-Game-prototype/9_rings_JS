
let ring_code = [];
let nowRing;
let getColor;
const colorsName = ["black", "red", "blue"]
let x = 3;
let y = 3;
let codeLength = 3;
let nowPlayer = 1;
let winPlayer = 0;
createBlocks(x, y);
setEventsToRings(x, y);
document.addEventListener("click", function(){
    winPlayer = checkWinner();
    if(winPlayer!="0"){
        console.log(winPlayer);
    }
});

function createBlocks(x, y){
    for(let i = 0; i < x; i++){
        var row = [];
        for(let j = 0; j < y; j++){
            row.push("000");
        }
        ring_code.push(row);
    }
    for(let i = 0; i < x; i++){
        var nextLine = document.createElement("br");
        document.body.appendChild(nextLine);
        for(let j = 0; j < y; j++){
            let index = i.toString() + j.toString();
            var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute('id', 'block_'+index);
            svg.setAttribute('viewBox', '0 0 10 10');
            svg.setAttribute('width', '20%');

            var circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle1.setAttribute('id', 'ring_'+index+'0');
            circle1.setAttribute('cx', '5');
            circle1.setAttribute('cy', '5');
            circle1.setAttribute('r', '4');
            circle1.setAttribute('stroke-width', '1');
            circle1.setAttribute('stroke', 'black');
            circle1.setAttribute('fill', 'white');
            svg.appendChild(circle1);

            var circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle2.setAttribute('id', 'ring_'+index+'1');
            circle2.setAttribute('cx', '5');
            circle2.setAttribute('cy', '5');
            circle2.setAttribute('r', '2');
            circle2.setAttribute('stroke-width', '1');
            circle2.setAttribute('stroke', 'black');
            circle2.setAttribute('fill', 'white');
            svg.appendChild(circle2);

            var circle3 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle3.setAttribute('id', 'ring_'+index+'2');
            circle3.setAttribute('cx', '5');
            circle3.setAttribute('cy', '5');
            circle3.setAttribute('r', '1');
            circle3.setAttribute('fill', 'black');
            svg.appendChild(circle3);

            document.body.appendChild(svg);
        }
    }
}
function setEventsToRings(x, y){
    for(let k = 0; k < x; k++)
    for(let j = 0; j < y; j++)
    for(let i = 0;i < codeLength; i++){
        let index = k.toString() + j.toString();
        nowRing = document.getElementById("ring_"+index+i);
        nowRing.addEventListener("click", function(){
            let code_digit = parseInt(ring_code[k][j][i]);
            if(code_digit == 0){
                // to avoid changing the colored tile
                code_digit = nowPlayer;
                nowPlayer = nowPlayer%2+1;
            }
            ring_code[k][j] = replaceCharAtIndex(ring_code[k][j], i, code_digit.toString());
            detect_ring_code(x, y);
        });
    }
}
function replaceCharAtIndex(str, index, replacement) {
    return str.substring(0, index) + replacement + str.substring(index + 1);
}
function detect_ring_code(x, y){
    for(let k = 0; k < x; k++)
    for(let j = 0; j < y; j++)
    for(let i = 0;i < codeLength; i++){
        let code_2 = ring_code[k][j];
        let index = k.toString() + j.toString();
        nowRing = document.getElementById("ring_"+index+i);
        let code_digit = code_2[i];
        if(i+1==codeLength)nowRing.setAttribute("fill", colorsName[parseInt(code_digit)]);
        else nowRing.setAttribute("stroke", colorsName[parseInt(code_digit)]);
    }
}
function checkWinner() {
    let current;
    console.log(ring_code);

    // for (let i = 0; i < x; i++) {
    //     for (let j = 0; j < y; j++) {
    //         current = ring_code[i][j];
    //         console.log(`i: ${i}`);
    //         console.log(`j: ${j}`);
    //         console.log(`current: ${current}`);
    //     }
    // }

    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            current = ring_code[i][j];
            console.log(`i: ${i}`);
            console.log(`j: ${j}`);
            console.log(`current: ${current}`);
            if (current == "111") return 1;
            else if (current == "222") return 2;

            for (let k = 0; k < codeLength; k++) {
                let current_digit = ring_code[i][j][k];
                if (j <= y - 3) {
                    const horizontal = [ring_code[i][j][k], ring_code[i][j + 1][k], ring_code[i][j + 2][k]];
                    if (horizontal.every((value) => value[k] === current_digit)) {
                        return parseInt(current_digit);
                    }
                }

                if (i <= x - 3) {
                    const vertical = [ring_code[i][j][k], ring_code[i + 1][j][k], ring_code[i + 2][j][k]];
                    if (vertical.every((value) => value === current_digit)) {
                        return parseInt(current_digit);
                    }
                }

                if (i <= x - 3 && j <= y - 3) {
                    const diagonal1 = [ring_code[i][j][k], ring_code[i + 1][j + 1][k], ring_code[i + 2][j + 2][k]];
                    if (diagonal1.every((value) => value === current_digit)) {
                        return parseInt(current_digit);
                    }
                }

                if (i >= 2 && j <= y - 3) {
                    const diagonal2 = [ring_code[i][j][k], ring_code[i - 1][j + 1][k], ring_code[i - 2][j + 2][k]];
                    if (diagonal2.every((value) => value === current_digit)) {
                        return parseInt(current_digit);
                    }
                }
            }
        }
    }

    return 0;
}

