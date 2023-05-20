module.exports = {
  wait,
};

function wait(time = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}
