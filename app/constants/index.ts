const ANIMATION_DELAY = 200;
const FORM_INITIAL_STATE = { opacity: 0, y: 80 };
const FORM_ANIMATION_STATE = { opacity: 1, y: 0 };
const FORM_TRANSITION = { type: "tween", duration: 0.25 };
const BOARD_WRAPPER_INITIAL_STATE = { opacity: 0, scale: 0.7 };
const BOARD_WRAPPER_ANIMATION_STATE = { opacity: 1, scale: 1 };
const BOARD_WRAPPER_TRANSITION = { duration: 0.4, ease: "easeInOut" };

export {
  FORM_INITIAL_STATE,
  FORM_ANIMATION_STATE,
  FORM_TRANSITION,
  ANIMATION_DELAY,
  BOARD_WRAPPER_INITIAL_STATE,
  BOARD_WRAPPER_ANIMATION_STATE,
  BOARD_WRAPPER_TRANSITION,
};
