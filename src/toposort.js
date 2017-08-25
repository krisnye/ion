module.exports = exports = function toposort(edges) {
  let nodes = new Set()
  let parents = new Map()

  for (edge of edges)
      for (node of edge)
          nodes.add(node)

  for (node of nodes)
      parents.set(node, [])

  for (edge of edges)
      parents.get(edge[1]).push(edge[0])

  let sorted = []
  let visited = new Set()

  function visit(node, path = new Set()) {
      if (path.has(node))
          throw new Error("Graph is cyclic: " + node + ' -> ' + Array.from(path).reverse().join(' -> '))
      if (visited.has(node))
          return
      visited.add(node)
      path.add(node)
      for(let parent of parents.get(node))
          visit(parent, path)
      sorted.push(node)
  }

  for(let node of nodes)
      visit(node)
  
  return sorted
}

// function test() {
//   let a = 'a'
//   let b = 'b'
//   let c = 'c'
//   let d = 'd'

//   let edges = [[a,b], [a,c], [b,d], [c,d]]
//   // edges.reverse()

//   let sorted = toposort(edges)
  
//   console.log(sorted)
// } 