export default class Component {
  constructor() {
    this.render = function(state, newTemplate, oldTemplate, selector, id) {
      if (state === false) {
        // First time render element
        selector.innerHTML += newTemplate;
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
}
