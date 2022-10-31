/**
 * Name: Kyle Leung
 * Date:10/19/2022
 * Section: CSE 154 AB Donovan Kong
 *
 * This is the index.js page for my Creative Project 2 meme generating website. It
 * has js code that provides functions to the UI of my meme generator in response to
 * events and inputs. Functions that include generating the meme when clicking a button,
 * toggling the display visibility of certain section elements and changing image srcs.
 */

"use strict";
(function() {
  window.addEventListener("load", init);

  let memeImageSrc = '';
  let memeImageAlt = '';

  /** initializes event listeners */
  function init() {
    let chooseTemplates = id('choose-template');
    chooseTemplates.addEventListener('click', toggleTemplate);

    let ownImage = id('own-image');
    ownImage.addEventListener('click', toggleOwnImage);

    let genButton = id('gen');
    genButton.addEventListener('click', generateMeme);

    let clearButton = id('clear');
    clearButton.addEventListener('click', clearMeme);
  }

  /** appends p and img elements inside meme-window id and clears input */
  function generateMeme() {
    let topText = id('joke1');
    let bottomText = id('joke2');
    let memeWindow = id('meme-window');
    let memeImage = document.createElement('img');

    memeWindow.innerHTML = "";
    if (topText.value !== '') {
      let topTextDisplay = document.createElement('p');
      topTextDisplay.textContent = topText.value;
      memeWindow.appendChild(topTextDisplay);
    }

    memeImage.src = memeImageSrc;
    memeImage.alt = memeImageAlt;
    memeWindow.appendChild(memeImage);

    if (bottomText.value !== '') {
      let botTextDisplay = document.createElement('p');
      botTextDisplay.textContent = bottomText.value;
      memeWindow.appendChild(botTextDisplay);
    }

    topText.value = "";
    bottomText.value = "";
  }

  /**
   * changes memeImage src/alt from clicked template and applies class to chosen template
   * @param {Event} evt - event from clicking on template image
   */
  function prepareImage(evt) {
    let templates = qsa('img');
    for (let i = 0; i < templates.length; i++) {
      templates[i].classList.remove('template-chosen');
    }
    let imgUrl = id('img-url');
    imgUrl.classList.remove('template-chosen');
    evt.currentTarget.classList.toggle('template-chosen');
    let path = evt.currentTarget.src;
    memeImageSrc = path;
    memeImageAlt = 'meme-template';
  }

  /** changes memeImage src/alt from entered url and applies class to input */
  function prepareImageCustom() {
    let templates = qsa('img');
    for (let i = 0; i < templates.length; i++) {
      templates[i].classList.remove('template-chosen');
    }
    let imgUrl = id('img-url');
    imgUrl.classList.toggle('template-chosen');
    memeImageSrc = imgUrl.value;
    memeImageAlt = 'custom-template';
  }

  /** toggles if template options are visible and add event listeners to template options */
  function toggleTemplate() {
    let templateOptions = id('template-options');
    templateOptions.classList.toggle('hidden');
    templateOptions.classList.toggle('temp-flex');

    let templates = qsa('img');
    for (let i = 0; i < templates.length; i++) {
      templates[i].addEventListener('click', prepareImage);
    }
  }

  /** toggles if input to put image url is visible and add event listeners to button */
  function toggleOwnImage() {
    let imgButton = id('image-button');
    let ownImageUrl = id('own-options');
    ownImageUrl.classList.toggle('hidden');
    ownImageUrl.classList.toggle('own-options');
    imgButton.addEventListener('click', prepareImageCustom);
  }

  /** clears the meme-window node */
  function clearMeme() {
    let memeWindow = id('meme-window');
    memeWindow.innerHTML = "";
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID.
   * @returns {object} - DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns an array of elements matching the given query.
   * @param {string} selector - CSS query selector.
   * @returns {array} - Array of DOM objects matching the given query.
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }
})();