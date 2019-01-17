export default class Component {
  constructor() {
    this.render = function(state, newTemplate, oldTemplate, selector, id) {
      if (state === false) {
        // First time render element
        selector.innerHTML += newTemplate;
        console.log(this.strToDOM(newTemplate));
      }

      if (state === true) {
        // Change (update) rendered element
        if (selector.innerHTML.indexOf(oldTemplate) + 1) {
          selector.innerHTML = selector.innerHTML.replace(
            oldTemplate,
            newTemplate
          );
        }
      }

      if (state === null) {
        // Delete
        if (selector.innerHTML.indexOf(oldTemplate) + 1) {
          selector.innerHTML = selector.innerHTML.replace(oldTemplate, "");
        }
      }

      this.oldTemplate[id] = newTemplate;
    };
  }

  strToDOM(htmlString) {
    var [
      ,
      openTag,
      content
    ] = /<(.*?|(?:.*?\n)+.*?)>(.*?|(?:.*?\n)+.*?)<\/.+?>/.exec(htmlString);
    var tagName = /\w+/.exec(openTag);
    var element = document.createElement(tagName);
    var reParams = /([\w|-]+)="(.*?|(?:.*?\n?)+.*?)"/g;
    var reParamsExecResult;
    while ((reParamsExecResult = reParams.exec(openTag))) {
      element.setAttribute(reParamsExecResult[1], reParamsExecResult[2]);
    }
    element.innerHTML = content.trim();
    return element;
  }
}
