
function alertButton(){

    var textareaComment = document.getElementById("comment_input");
    var textareaAA = document.getElementById("aa_input");
    var textareaResult = document.getElementById("aa_result");

    var commentArray = textareaComment.value.split(/\r\n|\n/);
    var AaArray = textareaComment.value.split(/\r\n|\n/);

    var sentence = "";
    for (let i = 0; i < commentArray.length; i++)
    {
        sentence = sentence + commentArray[i] + "test" + "\n";
    }      

    textareaResult.value = sentence;
}
function alertButton_(){

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