const winston = require('winston');
const path = require('path');
const fs = require('fs');
let logStream;

const getCaller = function () {
  let caller = '';

  try {
    const frame = (new Error()).stack.split('\n')[3];
    // eslint-disable-next-line no-useless-escape
    const line = /.+ \((.+)\:(\d+)\:(\d+)\)/.exec(frame);
    caller = line[1].split('\\').slice(-2).join('/') + '.' + line[2]; // + ':' + line[3];
  } catch (ex) {
    // Do nothing
  }

  return caller;
};

const Logger = function () {
  const self = this;
  this.logger = new winston.Logger();
  this.level = 'info';

  self.logger.on('error', function (err) {
    console.error('[logger] failed: ' + err.toString());
  });

  // checks if folder exists, returns:
  //   true  - if folder exists
  //   false - if does not exist or if file or device with the same name exists
  const chkdir = function (dirname) {
    try {
      return fs.statSync(dirname).isDirectory();
    } catch (ex) {
      // Do nothing
    }

    return false;
  };

  // creates a folder or nested folders
  // throws exception if cannot create folder
  const mkdir = function (dirname) {
    const dirs = path.resolve(dirname).split(path.sep);
    let root = '';

    while (dirs.length > 0) {
      const dir = dirs.shift();

      if (dir === '') {
        root = path.sep;
      }

      if (!chkdir(root + dir)) {
        fs.mkdirSync(root + dir);
      }

      root += dir + path.sep;
    }
  };

  // returns current UTC date in format: 'YYYY-MM-DD hh:mm:ss.nnn'
  const getDate = function () {
    const zeropad = function (val) {
      return (val < 10) ? '0' + val : val;
    };

    const now = new Date();
    const Y = now.getUTCFullYear();
    const M = zeropad(now.getUTCMonth() + 1);
    const D = zeropad(now.getUTCDate());
    const h = zeropad(now.getUTCHours());
    const m = zeropad(now.getUTCMinutes());
    const s = zeropad(now.getUTCSeconds());
    let ms = now.getUTCMilliseconds();

    ms = (ms < 10) ? '00' + ms : (ms < 100) ? '0' + ms : ms;
    return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s + '.' + ms;
  };

  // logger initialization method
  this.init = function (options) {
    try {
      options = options || {};

      // do not exit on error
      self.logger.exitOnError = false;

      // log error to console
      self.logger.on('error', function (err) {
        console.log(err);
      });

      if (options.level) {
        self.level = options.level;
      }

      if (options.exportToFile) {
        logStream = fs.createWriteStream(options.exportToFilePath, { flags: 'a' });
        let string = 'Date,';
        string += 'Method,';
        string += 'CallPath,';
        string += 'Message\n';
        logStream.write(string);
      }

      // set log levels and console colors
      if (options.levels) {
        self.logger.setLevels(options.levels);
      }

      if (options.colors) {
        winston.addColors(options.colors);
      }

      Object.keys(options.levels).forEach(function (method) {
        self[method] = function () {
          const caller = getCaller();
          self.setPath(caller);
          self.logger[method].apply(self.logger, arguments);
          if (options.exportToFile) {
            let string = `${getDate()},`;
            string += `${method},`;
            string += `${getCaller()},`;
            string += `${arguments[0]}\n`;
            logStream.write(string);
          }
        };
      });

      // set transports
      for (let i = 0; i < options.transports.length; i++) {
        if (options.transports[i].timestamp) {
          options.transports[i].timestamp = getDate;
        }

        if (options.transports[i].type === 'console') {
          self.logger.add(winston.transports.Console, options.transports[i]);
        } else if (options.transports[i].type === 'file') {
          mkdir(path.dirname(options.transports[i].filename));
          options.transports[i].json = false;
          options.transports[i].prettyPrint = true;
          self.logger.add(winston.transports.File, options.transports[i]);
        }
      }
    } catch (ex) {
      console.error('logger init failed: ' + ex.toString());
    }
  };

  // express middleware function for logging http requests and responses
  this.httplog = function (req, res, next) {
    const sock = req.socket;
    let peer = '';

    function logResponse () {
      try {
        const respTime = Math.abs(new Date().getTime() - req._startTime);
        const statusText = /^.+ \d{3} ([a-zA-Z ]+)/.exec(res._header)[1] || '';

        res.removeListener('finish', logResponse);
        res.removeListener('close', logResponse);

        self.setPath(getCaller());
        self.logger.info('[send] %sres=%s %s time=%dms',
          (peer !== '') ? 'to=' + peer + ' ' : '',
          res.statusCode, statusText, respTime);
      } catch (ex) {
        console.error('[logger.httplog] log response failed: ' + ex.toString());
      }
    }

    try {
      req._startTime = new Date().getTime();
      req._remoteAddress = sock.socket ? sock.socket.remoteAddress : sock.remoteAddress;

      if (req.socket._peername) {
        peer = req.socket._peername.address + ':' + req.socket._peername.port;
      }

      self.setPath(getCaller());
      self.logger.info('[recv] %sreq=%s %s useragent=%s',
        (peer !== '') ? 'from=' + peer + ' ' : '',
        req.method, req.url, req.headers['user-agent']);

      res.on('finish', logResponse);
      res.on('close', logResponse);
    } catch (ex) {
      console.error('[logger.httplog] log request failed: ' + ex.toString());
    }

    next();
  };

  // express custom error handler
  this.httperr = function (err, req, res, next) {
    if (err) {
      self.error('http error "%s" with stack "%s"', err, err.stack);
    }
    next(err);
  };

  // logging methods
  // the specific level methods like 'info', 'warn', 'error' will be added
  // from 'init' method according configuration object 'levels'
  this.log = function () {
    self.setPath(getCaller());
    self.logger.log.apply(self.logger, arguments);
  };

  // sets 'path' property of winston transports
  // represents source file name and line number of the log caller
  this.setPath = function (path) {
    for (const prop in self.logger.transports) {
      self.logger.transports[prop].label = path;
    }
  };
};

// make alternative constructor to the singleton class if someone needed it
Logger.prototype.Logger = Logger;

// export the singleton
module.exports = exports = new Logger();
