
// copied from https://github.com/marcelklehr/toposort/blob/master/index.js

function toposort(nodes, edges) {
  var cursor = nodes.length;
  var sorted = new Array(cursor);
  var visited = {};
  var i = cursor;

  while (i--) {
    if (!visited[i]) {
      visit(nodes[i], i, [], new Set());
    }
  }

  // console.log("DONE.");

  return sorted;

  function visit(node, i, predecessors, set) {
    if (set.has(node)) {
      console.log("cycle detected, skipping: " + node);
      return;
    }
    // if (predecessors.indexOf(node) >= 0) {
    //   //  automatically remove self from predecessors?
    //   console.log("Cyclic dependency removal in toposort")
    //   //  predecessors = predecessors.filter(p => p !== node)
    //   throw new Error('Cyclic dependency: ' + toCodeString(node));
    // }

    if (visited[i]) {
      return;
    }
    visited[i] = true;

    //  outgoing edges
    var outgoing = edges.filter(edge => edge[0] === node);
    if (i = outgoing.length) {
      var preds = predecessors.concat(node);
      do {
        var child = outgoing[--i][1];
        set.add(node);
        // console.log(i);
        visit(child, nodes.indexOf(child), preds, set);
        set.delete(node);
      } while (i);
    }

    sorted[--cursor] = node;
    return;
  }
}

function uniqueNodes(arr){
  var res: any[] = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    var edge = arr[i];
    if (res.indexOf(edge[0]) < 0) { 
      res.push(edge[0]);
    }
    if (res.indexOf(edge[1]) < 0) {
      res.push(edge[1]);
    }
  }
  return res;
}

/**
 * Topological sorting function
 *
 * @param {Array} edges
 * @returns {Array}
 */
export default function(edges){
  return toposort(uniqueNodes(edges), edges)
}
