const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const INITIAL_COLOR = "2c2c2c";
const CANVAS_SIZE = "700";

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR;    //그릴 선들의 색깔
ctx.fillStyle = INITIAL_COLOR;      //채울 색깔
ctx.lineWidth = 2.5;                //선의 너비

let painting = false;               //색깔
let filling = false;                //색깔 채우기

function stopPainting () {
    painting = false;
};

function startPainting () {
    painting = true;
};

function onMouseMove (event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    };
};

function handleCanvasClick () {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    };
};

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
};

function handleColorClick (event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
};

function handleRangeChange (event) {
    const size = event.target.value;
    ctx.lineWidth = size;
};

function handleModeClick () {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "PAINT";
    };
};

Array.from(colors).forEach(color =>color.addEventListener("click", handleColorClick));

// range 스크롤을 조절하면, 선의 너비가 변경
if (range) {
    range.addEventListener("input", handleRangeChange);
};

//Fill 버튼을 눌르면 canvas전체에 지정한 색깔로 변경 가능
if (mode) {
    mode.addEventListener("click", handleModeClick);
};