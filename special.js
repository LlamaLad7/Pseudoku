const { dialog } = require('electron').remote
const fs = require('fs')
$(document).delegate('#textspecial', 'keydown', function(e) {
  var keyCode = e.keyCode || e.which;

  if (keyCode == 9) {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    $(this).val($(this).val().substring(0, start)
                + "\t"
                + $(this).val().substring(end));

    // put caret at right position again
    this.selectionStart =
    this.selectionEnd = start + 1;
  }
});

$("#addFile").click(function(){
  var filePath = dialog.showOpenDialog({ properties: ['openFile'] })
  var filename = filePath[0].replace(/^.*[\\\/]/, '')
  $(".tab-item").each(function() {
    $(this).removeClass("active")
  })
  $(".tab-item-fixed").before(`<div class="tab-item active" filepath="` + filePath + `">
    <span class="icon icon-cancel icon-close-tab"></span>`
    + filename +
  `</div>`)
  $(".tab-item").click(function(){
    if ($(this).hasClass("active")) {}
    else {
      $(".tab-item").each(function() {
        $(this).removeClass("active")
      })
      $(this).addClass("active")
      var filePath = $(this).attr("filepath")
      fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) return console.log(err);
      // data is the contents of the text file we just read
      $("#textspecial").val(data)
    });
    }
  })
  fs.readFile(filePath[0], 'utf8', function (err, data) {
  if (err) return console.log(err);
  // data is the contents of the text file we just read
  $("#textspecial").val(data)
});
});
