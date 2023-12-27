window.addEventListener("DOMContentLoaded", () => {
    // textareaタグを全て取得
    const textareaEls = document.querySelectorAll("textarea");
  
    textareaEls.forEach((textareaEl) => {
      // デフォルト値としてスタイル属性を付与
      textareaEl.setAttribute("style", `height: ${textareaEl.scrollHeight}px;`);
      // inputイベントが発生するたびに関数呼び出し
      textareaEl.addEventListener("input", setTextareaHeight);
    });
  
    // textareaの高さを計算して指定する関数
    function setTextareaHeight() {
      this.style.height = "auto";
      this.style.height = `${this.scrollHeight}px`;

      //連続するスペースがあれば背景色を変更
      if( (this.value.match(/ {2,}/) || []).length > 0){
        this.style.backgroundColor = 'red';
      }else{
        this.style.backgroundColor = 'transparent';
      }
    }
  });

function linkageAsciiArt(){

    var textareaComment = document.getElementById("comment_input");
    var textareaAA = document.getElementById("aa_input");
    var textareaResult = document.getElementById("aa_result");

    var commentArray = textareaComment.value.split(/\r\n|\n/);
    var aaArray = textareaAA.value.split(/\r\n|\n/);

    var startRow = getStartRowAA();
    var lastRow = getLastRowAA();

    var sentence = getPrevSentenseAA();

    var sizeSpace = scaleSentense("　");
    var sentenseSizeMaxAA = scaleSentense(aaArray[startRow]);

    var branc = "";
    for (let i = 0; i < sentenseSizeMaxAA / sizeSpace ; i++){
        branc = branc + "　";
    }

    var maxRow;
    if(startRow + commentArray.length < aaArray.length){
        maxRow = startRow + commentArray.length;
    }else{
        maxRow = aaArray.length;
    }

    for (let i = startRow; i < maxRow; i++){
        
        var sentenseSizeTmpAA = scaleSentense(aaArray[i]);

        while(sentenseSizeTmpAA < sentenseSizeMaxAA){
            aaArray[i] = aaArray[i] + "　";
            sentenseSizeTmpAA = sentenseSizeTmpAA + sizeSpace;
        }
    }

    sentence = sentence + commentArray[0] + "\n";
    for (let i = 1; i < commentArray.length; i++){
        var sentenseAA = branc;
        if(startRow + i < aaArray.length){
            sentenseAA = aaArray[startRow + i];
        }
            
        sentence = sentence + sentenseAA + commentArray[i] + "\n";
    }

    if(startRow + commentArray.length < lastRow){
        for (let i = startRow + commentArray.length; i < aaArray.length; i++){
            sentence = sentence + aaArray[i] + "\n";
        }
    }

    textareaResult.value = sentence;
    let e = new Event('input')
    textareaResult.dispatchEvent(e);
}

function getPrevSentenseAA(){
    var textareaAA = document.getElementById("aa_input");

    var sentence = textareaAA.value;
    var len      = textareaAA.length;
    var pos      = textareaAA.selectionStart;

    var before   = sentence.substr(0, pos);
    return before;
}

function getStartRowAA(){
    var textareaAA = document.getElementById("aa_input");

    var sentence = textareaAA.value;
    var len      = textareaAA.length;
    var pos      = textareaAA.selectionStart;

    var before   = sentence.substr(0, pos);

    var count = before.split(/\r\n|\n/).length;
    return count - 1;
}

function getLastRowAA(){
    var textareaAA = document.getElementById("aa_input");
    var sentence = textareaAA.value;

    var count = sentence.split(/\r\n|\n/).length;

    return count;
}

function scaleSentense(sentense){
    // spanを生成.
    var span = document.createElement('span');

    // 現在の表示要素に影響しないように、画面外に飛ばしておく.
    span.style.position = 'absolute';
    span.style.top = '-1000px';
    span.style.left = '-1000px';

    // 折り返しはさせない.
    span.style.whiteSpace = 'nowrap';

    // 計測したい文字を設定する.
    span.innerHTML = sentense;

    // 必要に応じてスタイルを適用する.
    span.classList.add("aahub_light");

    // DOMに追加する（追加することで、ブラウザで領域が計算されます）
    document.body.appendChild(span);

    // 横幅を取得します.
    var width = span.clientWidth;

    // 終わったらDOMから削除します.
    span.parentElement.removeChild(span);

    return width;
}

function addAnchor(){
    var textareaComment = document.getElementById("comment_input");

    var sentence = textareaComment.value;
    var len      = textareaComment.length;
    var pos      = textareaComment.selectionStart;

    var before   = sentence.substr(0, pos);
    var word     = ">> \n";
    var after    = sentence.substr(pos, len);

    sentence = before + word + after;

    textareaComment.value = sentence;
}

function linkageAsciiArt_(){

    var textareaComment = document.getElementById("comment_input");
    var textareaAA = document.getElementById("aa_input");
    var textareaResult = document.getElementById("aa_result");

    var sentence = textareaAA.value;
    var len      = textareaAA.length;
    var pos      = textareaAA.selectionStart;

    var before   = sentence.substr(0, pos);
    var word     = textareaComment.value;
    var after    = sentence.substr(pos, len);

    sentence = before + word + after;

    textareaResult.value = sentence;
}

