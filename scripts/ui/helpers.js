// This file relies on the fact that the following declarations have been made
// in runtime:

/**
 *
 * @param {Ui_Component} ui
 * @param {string} value
 */
const SET_UI_TEXT_CONTENT = (ui, value) => {
  ui.getRoot().textContent = value;
};
