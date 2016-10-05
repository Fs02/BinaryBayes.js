function deepCopy (arr) {
    var out = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        var item = arr[i];
        var obj = {};
        for (var k in item) {
            obj[k] = item[k];
        }
        out.push(obj);
    }
    return out;
}

function massAssign(arr, k, v) {
  let new_arr = deepCopy(arr)
  for (let i = 0; i < arr.length; ++i) {
    new_arr[i][k] = v
  }
  return new_arr
}

module.exports = class BinaryBayes {
  constructor() {
    this.nodes = {}
  }

  addNode(node) {
    this.nodes[node] = {
      parents: [],
      probabilities: []
    }
  }

  addArc(parent, child) {
    this.nodes[child].parents.push(parent)
  }

  setProbabilities(node, probabilities) {
    this.nodes[node].probabilities = probabilities
  }

  probabilityDistribution(node, given) {
    let variables = this.nodes[node].parents
    variables = variables.concat(node)

    let index = 0
    for (let i = 0; i < variables.length; ++i) {
      if (given[variables[i]] === false) {
        index += Math.pow(2, variables.length - i - 1)
      }
    }

    return this.nodes[node].probabilities[index]
  }

  permutate(evidence) {
    let combos = [{}]

    for (let n in this.nodes) {
      if (n in evidence) {
        combos = massAssign(combos, n, evidence[n])
      } else {
        combos = massAssign(combos, n, true).concat(massAssign(combos, n, false))
      }
    }

    return combos
  }

  joint(evidence) {
    let prob = 1.0
    for (let n in this.nodes) {
      prob *= this.probabilityDistribution(n, evidence)
    }
    return prob
  }

  infer(y, x) {
    let numerator = this.permutate(Object.assign({}, y, x))
    let denominator = this.permutate(x)

    let numerator_p = 0.0
    for (let c of numerator) {
      numerator_p += this.joint(c)
    }

    let denominator_p = 0.0
    for (let c of denominator) {
      denominator_p += this.joint(c)
    }

    return numerator_p/denominator_p
  }
}
