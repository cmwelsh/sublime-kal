var path = require('path'),
    childProcess = require('child_process');

var $file = process.argv[2],
    $packages = process.argv[3],
    file_name = path.basename($file),
    file_base_name = path.basename($file, '.jsx'),
    dest_file = file_base_name + '.js';

var escape = /\W\[[\d;]*m/g,
    jsxErr = /(Line (\d*): (.*))/;

// Remove the destination file. If the file exists, in some cases 
// the jsx transformer may not replace it
var rm = childProcess.exec('rm ' + dest_file);

rm.on('exit', function () {

    // cwd is the $file's path
    var jsx = childProcess.exec("jsx --no-cache-dir --extension jsx . . " + file_base_name, function (error, stdout, stderr) {
        var buffer = '';
        if (error) {
            buffer += error.stack;
            buffer += '\nPlease check `jsx` is installed and it is available in your $PATH.\n';
        } else {
            buffer += '[jsx: ' + $file + ']';
            stderr = stderr.replace(escape, '');
            stdout = stdout.replace(escape, '');

            error = stderr.match(jsxErr);
            if (error) {
                buffer += '\n\n    ' + error[2] + ',0: ' + error[3] + '\n';
                buffer += '\n✗ Error transforming JSX, double-click above, [F4] for next, [shift-F4] for previous.\n';
            } else {
                buffer += '\n\n✓ Transformed: ' + file_name + ' → ' + dest_file + '\n';
            }
        }

        console.log(buffer);
    });

    jsx.on('exit', function () {
        var jshint = "jshint '" + dest_file + "' --reporter='" + $packages + "reporter.js'";

        childProcess.exec(jshint, function (error, stdout, stderr) {
            console.log(stdout);
        });
    });

});