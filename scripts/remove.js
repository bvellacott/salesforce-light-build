const program = require('commander')
  .option('-t, --target [value]', 'Deployment build results directory')
  .parse(process.argv);

require("fs-extra").removeSync(program.target);