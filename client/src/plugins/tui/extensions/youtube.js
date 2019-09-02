import Editor from 'tui-editor';
// import Toolbar from 'tui-editor';
// import { Toolbar } from '@toast-ui/react-editor';

Editor.defineExtension('youtube', function() {
  // runs while markdown-it transforms code block to HTML
  Editor.codeBlockManager.setReplacer('youtube', function(youtubeId) {
    // Indentify multiple code blocks
    var wrapperId = 'yt' + Math.random().toString(36).substr(2, 10);
    // avoid sanitizing iframe tag
    setTimeout(renderYoutube.bind(null, wrapperId, youtubeId), 0);

    return '<div id="' + wrapperId + '" class="video-iframe__wrapper"></div>';
  });
});

function renderYoutube(wrapperId, youtubeId) {
  var el = document.querySelector('#' + wrapperId);
  el.innerHTML = '<iframe frameborder="0" allowfullscreen src="https://www.youtube.com/embed/' + youtubeId + '"></iframe>';
}
