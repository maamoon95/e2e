let loggerImpl = {
  silly: function () {
    console.log.apply(console, arguments);
  },
  debug: function () {
    console.log.apply(console, arguments);
  },
  info: function () {
    console.info.apply(console, arguments);
  },
  warn: function () {
    console.warn.apply(console, arguments);
  },
  error: function () {
    console.error.apply(console, arguments);
  }
};

let emitter = {
  on: function () { throw new Error('Not implemented'); },
  emit: function () {}
};

exports.init = function (impl, emitterParam) {
  loggerImpl = impl;
  if (emitterParam !== undefined) {
    emitter = emitterParam;
  }
};
exports.silly = function () {
  loggerImpl.silly.apply(loggerImpl, arguments);
};
exports.debug = function () {
  loggerImpl.debug.apply(loggerImpl, arguments);
};
exports.info = function () {
  loggerImpl.info.apply(loggerImpl, arguments);
};
exports.warn = function () {
  // @ts-ignore error TS2554: Expected 0 arguments, but got 1. // TODO: FIXME:
  emitter.emit('Warn');
  loggerImpl.warn.apply(loggerImpl, arguments);
};
exports.error = function () {
  // @ts-ignore error TS2554: Expected 0 arguments, but got 1. // TODO: FIXME:
  emitter.emit('Error');
  loggerImpl.error.apply(loggerImpl, arguments);
};

exports.on = function () {
  emitter.on.apply(emitter, arguments);
};
