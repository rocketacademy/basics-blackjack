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
}

class LinkedList {
  constructor() {
    this._root = new RootVertex();
  }

  getRoot = () => this._root;
  /**
   * @param {Seat|Hand []}
   */
  relist = (elements) => {
    console.group(`ll.relist`);
    let current = this._root;
    for (const element of elements) {
      const v = new Vertex(element);
      console.log(v.getElement());
      current.setNext(v);
      current = current.next();
    }
    console.groupEnd();
  };

  addTail = (element) => {};

  getElementGenerator = () => this._root.getElementGenerator();
}
