
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

function uniqueNodes(edges): Set<any> {
  var res = new Set();
  for (const [a,b] of edges) {
    res.add(a);
    res.add(b);
  }
  return res;
}

/**
 * Topological sorting function
 *
 * @param {Array} edges
 * @returns {Array}
 */
export default function(nodes: any[], edges: [any,any][]){
  let sentinel = {};
  let unique = uniqueNodes(edges);
  for (let node of nodes) {
    if (!unique.has(node)) {
      unique.add(node);
      edges.push([sentinel, node]);
    }
  }
  let result = toposort([...unique], edges)
  if (result[0] === sentinel) {
    result.splice(0, 1);
  }
  return result;
}
