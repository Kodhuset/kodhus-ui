class KScroll {
  init(options) {
    this.windowHeight = window.innerHeight;
    this.options = options;
    document.querySelector('body').style.height = `${this.frameToScreen(this.findEndingFrame()) + this.windowHeight}px`;
    this.scrollables = [];
    options.items.forEach((item) => {
      const eInfo = {
        el: document.querySelector(item.selector),
        story: KScroll.createStory(item.frames),
      };
      this.scrollables.push(eInfo);
    });
    this.initializePositions();
    this.initEventHandlers();
    this.start = 0;
  }

  findEndingFrame() {
    let max = -9999999;
    let maxFrame = {};
    this.options.items.map(item => item.frames)
      .reduce((acc, current) => [...acc, ...current], [])
      .forEach((f) => {
        const digitVal = KScroll.getDigitValue(f.scrollPosition);
        if (digitVal > max) {
          max = digitVal;
          maxFrame = f;
        }
      });
    return maxFrame.scrollPosition;
  }

  static createStory(frames) {
    // need to be checked if the first frame's styles is empty
    frames = frames.map((item, index) => {
      if (item.styles === '' && index !== 0) {
        item.styles = frames[index - 1].styles;
      }
      return item;
    });
    const maxIndex = frames.length;
    const digitRegex = /[+-]?\d+/g;
    const story = frames.reduce((acc, current, currentIndex) => {
      if (currentIndex < maxIndex - 1) {
        const frame = {
          start: current.scrollPosition,
          end: frames[currentIndex + 1].scrollPosition,
          styles: {},
        };
        current.styles.split(';').forEach((style) => {
          if (style !== '') {
            const styleProps = style.split(':');
            // initiate initial styles
            if (currentIndex === 0) {
              const [key, value] = styleProps;
              acc.initialStyles[key] = value;
            }
            frame.styles[styleProps[0]] = {
            // initialState: styleProps[1],
              beginProp: [
                styleProps[1].replace(digitRegex, '$'),
                styleProps[1].match(digitRegex).map(digit => +digit),
              ],
            };
          }
        });
        frames[currentIndex + 1].styles.split(';').forEach((style) => {
          if (style !== '') {
            const styleProps = style.split(':');
            frame.styles[styleProps[0]].endProp = [
              styleProps[1].replace(digitRegex, '$'),
              styleProps[1].match(digitRegex).map(digit => +digit),
            ];
          }
        });
        acc.frames = [...acc.frames, frame];
      }
      return acc;
    }, { initialStyles: {}, frames: [] });
    return story;
  }

  static calculateRangeValue(oldMin, oldMax, newMin, newMax, oldValue) {
    const oldRange = (oldMax - oldMin);
    const newRange = (newMax - newMin);
    const newVal = (((oldValue - oldMin) * newRange) / oldRange) + newMin;
    return Math.ceil(newVal);
  }

  initializePositions() {
    /* add initial style */
    this.scrollables.forEach((scrollable) => {
      const styles = scrollable.story.initialStyles;
      Object.keys(styles).forEach((key) => {
        scrollable.el.style[key] = styles[key];
      });
    });
  }

  static between(a, b, c) {
    const min = Math.min.apply(Math, [a, b]);
    const max = Math.max.apply(Math, [a, b]);
    return c >= min && c <= max;
  }

  static getDigitValue(amount) {
    return +(amount.match(/\d+/));
  }

  frameToScreen(amount) {
    const num = KScroll.getDigitValue(amount);
    if (amount.charAt(amount.length - 1) === '%') {
      return (num / 100) * this.windowHeight;
    }
    return num;
  }

  scroll(scrollPos) {
    let newVal = 0;
    this.scrollables.forEach((scrollable) => {
      const firstFrame = scrollable.story.frames[0];
      const lastFrame = scrollable.story.frames[scrollable.story.frames.length - 1];
      if (scrollPos < this.frameToScreen(firstFrame.start)) {
        Object.keys(firstFrame.styles).forEach((style) => {
          let i = -1;
          const interPolated = firstFrame.styles[style].beginProp[0].replace(/\$/g, () => {
            i += 1;
            newVal = firstFrame.styles[style].beginProp[1][i];
            return newVal;
          });
          scrollable.el.style[style] = interPolated;
        });
      } else if (scrollPos > this.frameToScreen(lastFrame.end)) {
        Object.keys(lastFrame.styles).forEach((style) => {
          let i = -1;
          const interPolated = lastFrame.styles[style].beginProp[0].replace(/\$/g, () => {
            i += 1;
            newVal = lastFrame.styles[style].endProp[1][i];
            return newVal;
          });
          scrollable.el.style[style] = interPolated;
        });
      } else {
        scrollable.story.frames.forEach((frame) => {
          const startFrame = this.frameToScreen(frame.start);
          const endFrame = this.frameToScreen(frame.end);
          if (KScroll.between(startFrame, endFrame, scrollPos)) {
            Object.keys(frame.styles).forEach((style) => {
              let i = -1;
              const interPolated = frame.styles[style].beginProp[0].replace(/\$/g, () => {
                i += 1;
                newVal = KScroll.calculateRangeValue(startFrame, endFrame,
                  frame.styles[style].beginProp[1][i],
                  frame.styles[style].endProp[1][i], scrollPos);
                return newVal;
              });
              scrollable.el.style[style] = interPolated;
            });
          }
        });
      }
    });
  }

  initEventHandlers() {
    let lastKnownScrollPosition = 0;
    let ticking = false;
    window.addEventListener('scroll', () => {
      lastKnownScrollPosition = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.scroll(lastKnownScrollPosition);
          ticking = false;
        });
        ticking = true;
      }
    });
  }
}

export default KScroll;
