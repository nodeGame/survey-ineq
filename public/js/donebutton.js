(function() {
    var node;
    node = parent.node;
    node.on('PLAYING', function() {
        node.window.writeln();
        node.window.writeln();
        node.widgets.add('DoneButton', 'container', { text: 'Next' }); 
    });
})();