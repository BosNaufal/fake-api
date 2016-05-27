
/**
  Make a Progress like function before serve the requested data
*/
let makeProgress = (duration, progress, done) => {
  let startTime = Date.now()
  let cur = 0 // current
  let to = 100 // The number should be

  function check() {
    if (cur != to) {

      (cur + (to / 60)) > to ? cur = to : cur += (to / 60);

      if(progress) progress(cur) // callback

      setTimeout(function() {
        return check();
      }, duration / 60); // 60 FPS

    } else {
      if(done) done()
    }
  }

  return check()
}


/**
  Get Random Duration if the duration is not being set
*/
let getRandomDuration = () => {
  return (Math.floor(Math.random() * 4)) * 1000
}

export { makeProgress, getRandomDuration };
