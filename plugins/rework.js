'use strict';

/**
 * Namespace all selector definitions in CSS content, useful for namespacing
 * CSS to specific pagelets.
 *
 * @param {Array|String} d array of valid CSS selectors
 * @api public
 */
exports.namespace = function namespace(namespaces) {
  if (!Array.isArray(namespaces)) namespaces = [namespaces];

  /**
   * Prefix each selector with each namespace.
   *
   * @param {Object} css parsed CSS representation
   * @param {Rework} rework instance
   * @api private
   */
  return function multiPrefix(css, rework) {
    css.rules = css.rules.map(function rules(rule) {
      if (!rule.selectors) return rule;

      rule.selectors = rule.selectors.map(function selectors(selector) {
        if (':root' === selector) return namespaces.join();

        selector = selector.replace(/^\:root\s?/, '');
        return namespaces.map(function multi(name) {
          return name + ' ' + selector;
        }).join();
      });

      return rule;
    });
  };
};