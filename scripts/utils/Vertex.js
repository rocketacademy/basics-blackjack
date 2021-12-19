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
