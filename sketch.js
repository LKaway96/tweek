let input;
let slider;
let button;
let dropdown;
let textStr = "教育科技學系";
let textSizeValue = 32;
let isBouncing = false;
let offsets = [];
let iframe;

function setup() {
  // 產生一個畫布，充滿整個視窗，背景顏色為#003049
  createCanvas(windowWidth, windowHeight).background('#f0f3bd');

  // 產生一個輸入框，並顯示在座標 (10, 10)
  input = createInput(textStr);
  input.position(10, 10);
  input.size(300, 80);
  input.input(updateText);

  // 產生一個滑桿，並顯示在座標 (320, 10)
  slider = createSlider(12, 30, 32);
  slider.position(320, 10);
  slider.size(100);
  slider.input(updateTextSize);

  // 產生一個按鈕，並顯示在座標 (430, 10)
  button = createButton('跳動');
  button.position(430, 10);
  button.mousePressed(toggleBounce);

  // 產生一個下拉式選單，並顯示在座標 (800, 10)
  dropdown = createSelect();
  dropdown.position(800, 10);
  dropdown.size(100);
  dropdown.option('選擇網站');
  dropdown.option('淡江大學');
  dropdown.option('教育科技學系');
  dropdown.option('教學平台');
  dropdown.changed(handleDropdownChange);
}

function updateText() {
  textStr = this.value();
}

function updateTextSize() {
  textSizeValue = slider.value();
}

function toggleBounce() {
  isBouncing = !isBouncing;
  if (isBouncing) {
    // 初始化每行的偏移量
    offsets = Array(ceil(windowHeight / (textAscent() + textDescent() + 20))).fill(0).map(() => random(-5, 5));
  }
}

function handleDropdownChange() {
  let selected = dropdown.value();
  if (iframe) {
    iframe.remove();
  }
  if (selected === '淡江大學') {
    iframe = createElement('iframe');
    iframe.attribute('src', 'https://www.tku.edu.tw'); // 淡江大學官方網站
    iframe.position(10, 100);
    iframe.size(windowWidth - 20, windowHeight - 120);
  } else if (selected === '教育科技學系') {
    iframe = createElement('iframe');
    iframe.attribute('src', 'https://www.et.tku.edu.tw'); // 教育科技學系系網站
    iframe.position(10, 100);
    iframe.size(windowWidth - 20, windowHeight - 120);
  } else if (selected === '教學平台') {
    iframe = createElement('iframe');
    iframe.attribute('src', 'https://hackmd.io/@L-Kaway/SyS9NWWhye'); // 教學平台網址，請填入網址
    iframe.position(10, 100);
    iframe.size(windowWidth - 20, windowHeight - 120);
  }
}

function draw() {
  background('#f0f3bd');
  // 設定文字大小、對齊方式、顏色等
  textSize(textSizeValue);
  textAlign(LEFT, TOP);
  fill('#014f86');
  stroke(255); // 設定字體邊框顏色為白色
  strokeWeight(1);

  // 計算每個文字的寬度和間隔
  let spacingX = 10; // 每個字串之間的間隔
  let spacingY = 20; // 每行之間的間隔
  let totalWidth = textWidth(textStr) + spacingX;
  let totalHeight = textAscent() + textDescent() + spacingY;

  // 計算可以放多少個文字
  let numTextsX = ceil(windowWidth / totalWidth);
  let numTextsY = ceil(windowHeight / totalHeight);

  // 在視窗中間重複填滿整個視窗的文字
  for (let y = 0; y < numTextsY; y++) {
    let offsetY = isBouncing ? offsets[y % offsets.length] : 0;
    for (let x = 0; x < numTextsX; x++) {
      text(textStr, x * totalWidth, y * totalHeight + offsetY);
    }
  }

  // 更新偏移量
  if (isBouncing) {
    offsets = offsets.map(() => random(-15, 15));
  }
}

function windowResized() {
  // 當視窗大小改變時，重新設定畫布大小
  resizeCanvas(windowWidth, windowHeight);
  if (iframe) {
    iframe.size(windowWidth - 20, windowHeight - 120);
  }
}