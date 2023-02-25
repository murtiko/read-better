var ps = document.getElementsByTagName('p');

for (var i = 0; i < ps.length; i++) {

  var p = ps[i];
  var text = p.textContent;
  var words = text.split(' ');
  var replacedText = ""

  for (var j = 0; j < words.length; j++) {

   var len = (words[j].length < 3) ? 2 : (words[j].length / 2);

    word = '<span class="readbetter">' + words[j].substring(0,len) + '</span>'
    word = word + words[j].substring(len)

    if (j > 0) {
      replacedText = replacedText + ' '
    }
    replacedText = replacedText + word;

  }

  p.innerHTML = replacedText;
  // var dummy = p.offsetWidth;
}
