// A simple implementation of Linked List
class Vertex {
  /**
   * @param {Seat|Hand} element
   */
  constructor(element) {
    this._element = element;
    /** @private {Seat|Hand} */
    this._next = null;
  }
  injectNext = (vertex) => {
    const prevNext = this._next;
    this.setNext(vertex);
    this._next.setNext(prevNext);
  };
  /**
   *
   * @param {Vertex} vertex
   */
  setNext = (vertex) => {
    this._next = vertex;
  };

  next = () => this._next;
  getElement = () => this._element;
  peekNextElement = () => this.next()?.getElement();
}

class RootVertex extends Vertex {
  constructor() {
    super(null);
  }

  getElementGenerator = () => {
    let currentVertex = this;
    return {
      current: () => currentVertex.getElement(),
      next: () => {
        if (currentVertex === null || currentVertex === undefined) {
          return null;
        }
        currentVertex = currentVertex.next();
        return !!currentVertex ? currentVertex.getElement() : null;
      },
    };
  };

  getVertexGenerator = () => {
    let currentVertex = this;
    return {
      current: () => currentVertex,
      next: () => {
        if (currentVertex === null || currentVertex === undefined) {
          return null;
        }
        currentVertex = currentVertex.next();
        return !!currentVertex ? currentVertex : null;
      },
    };
  };
}

class LinkedList {
  constructor() {
    this._root = new RootVertex();
  }
  isTrivial = () => !!this._root.next();
  getRoot = () => this._root;
  /**
   * @param {Seat|Hand []}
   */
  relist = (elements) => {
    console.group(`ll.relist`);
    let current = this._root;
    for (const element of elements) {
      const v = new Vertex(element);
      current.setNext(v);
      current = current.next();
    }
    console.groupEnd();
  };

  addElementTail = (element) => {
    let gen = this.getVertexGenerator();
    let parentV = gen.current();
    while (parentV.next()) {
      parentV = gen.next();
    }

    const newV = new Vertex(element);
    parentV.setNext(newV);

    return newV;
  };
  getVertexGenerator = () => this._root.getVertexGenerator();
  getElementGenerator = () => this._root.getElementGenerator();
}
