(function(){var _ion_compiler_traverse_ = function(module,exports,require){exports.traverse = function(graph, enterCallback, exitCallback) {
  var context, result, skip, traverseNode;
  result = graph;
  skip = false;
  context = {
    path: [],
    ancestors: [],
    skip: function() {
      return skip = true;
    },
    key: function() {
      return this.path[this.path.length - 1];
    },
    parent: function() {
      return this.ancestors[this.ancestors.length - 1];
    },
    remove: function() {
      return this.replace(void 0);
    },
    replace: function(value) {
      var index, parent;
      parent = this.parent();
      if (parent != null) {
        if (value === void 0) {
          if (Array.isArray(parent)) {
            index = parent.indexOf(value);
            return parent.splice(index, 1);
          } else {
            return delete parent[this.key()];
          }
        } else {
          return parent[this.key()] = value;
        }
      } else {
        return result = value;
      }
    },
    current: function() {
      var parent;
      parent = this.parent();
      if (parent != null) {
        return parent[this.key()];
      } else {
        return result;
      }
    }
  };
  traverseNode = function(node) {
    var index, key, value;
    if ((node != null) && typeof node === 'object') {
      if (typeof enterCallback === "function") {
        enterCallback(node, context);
      }
      if (skip) {
        skip = false;
      } else {
        node = context.current();
        if ((node != null) && typeof node === 'object') {
          context.ancestors.push(node);
          if (Array.isArray(node)) {
            index = 0;
            while (index < node.length) {
              value = node[index];
              context.path.push(index);
              traverseNode(value);
              context.path.pop();
              index++;
            }
          } else {
            for (key in node) {
              value = node[key];
              context.path.push(key);
              traverseNode(value);
              context.path.pop();
            }
          }
          context.ancestors.pop();
        }
      }
      return typeof exitCallback === "function" ? exitCallback(node, context) : void 0;
    }
  };
  traverseNode(graph);
  return result;
};

exports.test = function() {
  var expected, graph, result;
  graph = {
    id: 'root',
    alpha: 1,
    beta: {
      id: 'beta',
      charlie: 2,
      delta: 3
    },
    echo: {
      id: 'echo',
      foxtrot: 1
    }
  };
  if (graph !== exports.traverse(graph, function() {})) {
    throw new Error("traverse should have returned graph");
  }
  if (2 !== exports.traverse(graph, function(node, context) {
    return context.replace(2);
  })) {
    throw new Error("traverse should have returned 2");
  }
  result = [];
  exports.traverse(graph, function(node, context) {
    var _ref;
    result.push(node.id);
    result.push(context.key());
    result.push((_ref = context.parent()) != null ? _ref.id : void 0);
    if (node.id === 'beta') {
      return context.replace({
        id: 'foo',
        bar: {
          id: 'baz',
          skipMe: {
            value: 1
          }
        }
      });
    } else if (node.id === 'baz') {
      return context.skip();
    }
  });
  expected = ["root", void 0, void 0, "beta", "beta", "root", "baz", "bar", "foo", "echo", "echo", "root"];
  if (JSON.stringify(result) !== JSON.stringify(expected)) {
    throw new Error("" + result + " != " + expected);
  }
};

  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/compiler/traverse',_ion_compiler_traverse_);
    else
      _ion_compiler_traverse_.call(this, module, exports, require);
  }
  else {
    _ion_compiler_traverse_.call(this);
  }
}).call(this)