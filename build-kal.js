var path = require('path'),
    childProcess = require('child_process');

var $file = process.argv[2],
    $packages = process.argv[3],
    file_name = path.basename($file),
    file_base_name = path.basename($file, '.kal'),
    dest_file = file_base_name + '.js';

var escape = /\W\[[\d;]*m/g,
    kalErr = /(\^\n([\S\s]*) on line (\d*))/;

// Remove the destination file. If the file exists, in some cases
// the Kal transformer may not replace it
var rm = childProcess.exec('rm ' + dest_file);

rm.on('exit', function () {

    // cwd is the $file's path
    var kal = childProcess.exec("kal -o . " + file_name, function (error, stdout, stderr) {
        var buffer = '';
        if (error && error.code === 127) {
            buffer += error.stack;
            buffer += '\nPlease check `kal` is installed and it is available in your $PATH.\n';
        } else {
            buffer += '[kal: ' + $file + ']';
            stderr = stderr.replace(escape, '');
            stdout = stdout.replace(escape, '');

            error = stderr.match(kalErr);
            if (error) {
                buffer += '\n\n    ' + error[3] + ',0: ' + error[2] + '\n';
                buffer += '\n✗ Error transforming Kal, double-click above, [F4] for next, [shift-F4] for previous.\n';
            } else {
                buffer += '\n\n✓ Transformed: ' + file_name + ' → ' + dest_file + '\n';
            }
        }

        console.log(buffer);
    });

});

