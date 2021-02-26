// Graph holds all nodes an edges.
class Graph {
    edges = {}

    constructor() {}

    // hasNode returns if n is a node of the graph.
    hasNode(n) {
        return this.edges[n] != undefined
    }

    // nodes returns an array of all nodes in the graph.
    get nodes() {
        return Object.keys(this.edges)
    }

    // getEdges returns an array of all edges of node.
    // the contents of the array are structured like
    // {from:"nodeName", to:"otherNode", weight:5}
    getEdges(node) {
        if (!this.hasNode(node)) {
            throw 'node "' + node + '" doesnt exist'
        }
        let arr = []
        for (let t in this.edges[node]) {
            arr.push({from:node, to:t, weight:this.edges[node][t]})
        }
        return arr
    }

    // setEdge adds a new edge, and possibly nodes, to the graph.
    // setEdge overrides any previous edge between "from" and "to".
    setEdge(from, to, weight) {
        if (typeof from != "string") {
            throw '"from" must be string'
        }
        if (typeof to != "string") {
            throw '"to" must be string'
        }
        if (typeof weight != "number") {
            throw '"weight" must be number'
        }
        if (this.edges[from] == undefined) {
            this.edges[from] = {}
        }
        this.edges[from][to] = weight
        if (this.edges[to] == undefined) {
            this.edges[to] = {}
        }
        this.edges[to][from] = weight
    }

    // privat
    // getDistinctEdges returns all distinct edges from the graph.
    // 2 edges are considered equal, if they contain the same start/end-nodes,
    // regardless of the direction.
    // getDistinctEdges returns an object, that maps their
    // destination-nodes to their weight.
    getDistinctEdges() {
        let eds = {}
        for (const from in this.edges) {
            for (const to in this.edges[from]) {
                let [f, t] = from <= to ? [from, to] : [to, from]
                if (eds[f] == undefined) {
                    eds[f] = {}
                }
                eds[f][t] = this.edges[from][to]
            }
        }
        return eds
    }

    // log writes a string-representation of the graph to the console.
    log() {
        let eds = this.getDistinctEdges()
        for (let f in eds) {
            for (let t in eds[f]) {
                console.log(f, " -(", eds[f][t], ")-> ", t)
            }
        }
    }

    // prim returns a new graph, using the prim-algorithm.
    // startNode is the starting point for the algorithm.
    prim(startNode) {
        if (typeof startNode != "string") {
            throw '"startNode" must be string'
        }
        let pg = new Graph()
        if (Object.keys(this.edges).length == 0) {
            return pg
        }
        let [from, to, weight] = [startNode, null, 0]
        for (let iTo in this.edges[from]) {
            let iWeight = this.edges[from][iTo]
            if (to == null || iWeight < weight) {
                [to, weight] = [iTo, iWeight]
            }
        }
        pg.setEdge(from, to, weight)
        while (true) {
            to = null
            for (let iFrom in pg.edges) {
                for (let iTo in this.edges[iFrom]) {
                    let iWeight = this.edges[iFrom][iTo]
                    if (pg.hasNode(iTo)) {
                        continue
                    }
                    if (to == null || iWeight < weight) {
                        [from, to, weight] = [iFrom, iTo, iWeight]
                    }
                }
            }
            if (to == null) {
                break
            }
            pg.setEdge(from, to, weight)
        }
        return pg
    }
}
