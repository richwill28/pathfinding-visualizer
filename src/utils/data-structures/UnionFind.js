export default class UnionFind {
  constructor(n) {
    this.parent = [...Array(n).keys()];
    this.rank = Array(n).fill(0);
    this.numOfDisjointSets = n;
  }

  findSet(i) {
    const set = this.parent[i] === i ? i : this.findSet(this.parent[i]);
    this.parent[i] = set;
    return set;
  }

  isSameSet(a, b) {
    return this.findSet(a) === this.findSet(b);
  }

  getNumOfDisjointSets() {
    return this.numOfDisjointSets;
  }

  unionSet(a, b) {
    if (this.isSameSet(a, b)) return;
    let x = this.findSet(a);
    let y = this.findSet(b);
    if (this.rank[x] > this.rank[y]) {
      let temp = x;
      x = y;
      y = temp;
    }
    this.parent[x] = y;
    if (this.rank[x] === this.rank[y]) this.rank[y]++;
    this.numOfDisjointSets--;
  }
}
