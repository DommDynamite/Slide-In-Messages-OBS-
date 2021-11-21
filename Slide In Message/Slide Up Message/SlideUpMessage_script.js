$(document).ready(function(){
    // Set the style settings from Messages.js
    document.getElementById("AnimatedText").style.fontFamily = font;
    document.getElementById("AnimatedText").style.fontSize = size + 'px';
    document.getElementById("AnimatedText").style.fontStyle = style;
    document.getElementById("AnimatedText").style.fontWeight = weight;
    document.getElementById("AnimatedText").style.color = color;
    if (dropShadow === true) {
      document.getElementById("AnimatedText").style.textShadow = `5px 5px 5px ${shadowColor}`;
    }
  
    // Begin the message displaying upon page load
    setInterval(UpDownMessageAnimation, calculateDelayFromSeconds(delaySeconds));
  });
  
  var currentMessage = 0;
  
  function UpDownMessageAnimation() {
    // Get the element to be animated and set the starting position and opacity
    var elem = document.getElementById("AnimatedText");
    var pos = 200;
    var opp = 0;
  
    elem.textContent = messages[currentMessage];
    
    // Begin the animation by calling the nested function slideUp to run every 10 milliseconds, creating the slide up part of the animation.
    var id = setInterval(slideUp, 10);
    
    function slideUp () {
        if (pos == 100) {
          clearInterval(id);            // At this point the animation is complete, clear the id so it is clean for the next message to run.
          sleep(calculateDelayFromSeconds(messageDisplayTimeSeconds)) // Wait the configured period of time before hiding the message
          id = setInterval(slideDown, 10); // Begin the slideUp animation at 10 milliseconds.
        } else {
          pos--;                        // Adjust the position upward
          opp = opp + .01               // Adjust the opacity value
          elem.style.top = pos + 'px';  // Apply upward movement
          elem.style.opacity = opp;     // Apply the opacity setting for fade out
        }
    }

    function slideDown() {
      if (pos == 200) {     // Once the animation is complete...
        clearInterval(id);
      } else {
        pos++;                        // Adjust the position downward
        opp = opp - .01               // Adjust the opacity value
        elem.style.top = pos + 'px';  // Apply downward movement
        elem.style.opacity = opp      // Apply the opacity setting for fade in
      }
    }
  
    // Either move to the next message, or flip back to the first one.
    if (currentMessage >= messages.length) {
      currentMessage = 0;
    }
    else {
      currentMessage++;
    }
  }
  
  function sleep(milliseconds) {
      const date = Date.now();
      let currentDate = null;
      do {
        currentDate = Date.now();
      } while (currentDate - date < milliseconds);
  }
  
  
  function calculateDelayFromSeconds(milliseconds){
    return milliseconds*1000
  }
