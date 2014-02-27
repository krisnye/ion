(function(){var _ion_compiler_traverse_ = function(module,exports,require){exports.traverse = function(graph, enterCallback, exitCallback) {
  var context, removed, result, skip, traverseNode;
  result = graph;
  skip = false;
  removed = 0;
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
    remove: function(node) {
      var index, parent;
      if (node == null) {
        throw new Error("You must specify the node to remove");
      }
      parent = this.parent();
      if (Array.isArray(parent)) {
        index = parent.indexOf(node);
        parent.splice(index, 1);
        return removed++;
      } else {
        return delete parent[this.key()];
      }
    },
    replace: function(value) {
      var parent;
      if (value === void 0) {
        throw new Error("You must specify a replacement value");
      }
      parent = this.parent();
      if (parent != null) {
        return parent[this.key()] = value;
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
    var index, key, newNode, value;
    if ((node != null) && typeof node === 'object') {
      if (typeof enterCallback === "function") {
        enterCallback(node, context);
      }
      if (skip) {
        skip = false;
      } else {
        newNode = context.current();
        if (newNode !== node) {
          if (typeof exitCallback === "function") {
            exitCallback(node, context);
          }
          node = newNode;
          if (node != null) {
            if (typeof enterCallback === "function") {
              enterCallback(node, context);
            }
          }
        }
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
              if (removed > 0) {
                index -= removed;
                removed = 0;
              }
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
      if (node != null) {
        return typeof exitCallback === "function" ? exitCallback(node, context) : void 0;
      }
    }
  };
  traverseNode(graph);
  return result;
};

exports.test = function() {
  var graph;
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