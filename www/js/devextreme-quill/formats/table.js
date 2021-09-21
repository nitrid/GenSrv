import Block from '../blots/block';
import Container from '../blots/container';
import isDefined from '../utils/isDefined';

const TABLE_TAGS = ['TD', 'TH', 'TR', 'TBODY', 'THEAD', 'TABLE'];

class BaseCell extends Block {
  static create(value) {
    const node = super.create();
    const attrName = this.dataAttribute;
    if (value) {
      node.setAttribute(attrName, value);
    } else {
      node.setAttribute(attrName, tableId());
    }
    return node;
  }

  static formats(domNode) {
    const attrName = this.dataAttribute;
    if (domNode.hasAttribute(attrName)) {
      return domNode.getAttribute(attrName);
    }
    return undefined;
  }

  cellOffset() {
    if (this.parent) {
      return this.parent.children.indexOf(this);
    }
    return -1;
  }

  row() {
    return this.parent;
  }

  rowOffset() {
    if (this.row()) {
      return this.row().rowOffset();
    }
    return -1;
  }

  table() {
    return this.row() && this.row().table();
  }
}
BaseCell.tagName = ['TD', 'TH'];

class TableCell extends BaseCell {
  format(name, value) {
    if (name === TableCell.blotName && value) {
      this.domNode.setAttribute(TableCell.dataAttribute, value);
    } else {
      super.format(name, value);
    }
  }
}
TableCell.blotName = 'table';
TableCell.dataAttribute = 'data-row';

class TableHeaderCell extends BaseCell {
  format(name, value) {
    if (name === TableHeaderCell.blotName && value) {
      this.domNode.setAttribute(TableHeaderCell.dataAttribute, value);
    } else {
      super.format(name, value);
    }
  }
}
TableHeaderCell.tagName = ['TH', 'TD'];
TableHeaderCell.blotName = 'tableHeaderCell';
TableHeaderCell.dataAttribute = 'data-header-row';

class BaseRow extends Container {
  checkMerge() {
    if (super.checkMerge() && isDefined(this.next.children.head)) {
      const formatName = this.childFormatName;
      const thisHead = this.children.head.formats();
      const thisTail = this.children.tail.formats();
      const nextHead = this.next.children.head.formats();
      const nextTail = this.next.children.tail.formats();
      return (
        thisHead[formatName] === thisTail[formatName] &&
        thisHead[formatName] === nextHead[formatName] &&
        thisHead[formatName] === nextTail[formatName]
      );
    }
    return false;
  }

  optimize(...args) {
    super.optimize(...args);
    const formatName = this.childFormatName;
    this.children.forEach(child => {
      if (!isDefined(child.next)) {
        return;
      }

      const childFormats = child.formats();
      const nextFormats = child.next.formats();
      if (childFormats[formatName] !== nextFormats[formatName]) {
        const next = this.splitAfter(child);
        if (next) {
          next.optimize();
        }
        // We might be able to merge with prev now
        if (this.prev) {
          this.prev.optimize();
        }
      }
    });
  }

  rowOffset() {
    if (this.parent) {
      return this.parent.children.indexOf(this);
    }
    return -1;
  }

  table() {
    return this.parent && this.parent.parent;
  }
}
BaseRow.tagName = 'TR';

class TableRow extends BaseRow {
  constructor(scroll, domNode) {
    super(scroll, domNode);

    this.childFormatName = 'table';
  }
}
TableRow.blotName = 'tableRow';

class TableHeaderRow extends BaseRow {
  constructor(scroll, domNode) {
    super(scroll, domNode);

    this.childFormatName = 'tableHeaderCell';
  }
}
TableHeaderRow.blotName = 'tableHeaderRow';

class TableBody extends Container {}
TableBody.blotName = 'tableBody';
TableBody.tagName = ['TBODY'];

class TableHeader extends Container {}
TableHeader.blotName = 'tableHeader';
TableHeader.tagName = ['THEAD'];

class TableContainer extends Container {
  balanceCells() {
    const headerRows = this.descendants(TableHeaderRow);
    const bodyRows = this.descendants(TableRow);
    const maxColCount = this.getMaxTableColCount(headerRows, bodyRows);

    this.balanceRows(maxColCount, headerRows, TableHeaderCell);
    this.balanceRows(maxColCount, bodyRows, TableCell);
  }

  getMaxTableColCount(headerRows, bodyRows) {
    return Math.max(
      this.getMaxRowColCount(headerRows),
      this.getMaxRowColCount(bodyRows),
    );
  }

  getMaxRowColCount(rows) {
    return Math.max(...rows.map(row => row.children.length));
  }

  balanceRows(maxColCount, rows, CellClass) {
    rows.forEach(row => {
      new Array(maxColCount - row.children.length).fill(0).forEach(() => {
        let value;
        if (isDefined(row.children.head)) {
          value = CellClass.formats(row.children.head.domNode);
        }
        const blot = this.scroll.create(CellClass.blotName, value);
        row.appendChild(blot);
        blot.optimize(); // Add break blot
      });
    });
  }

  cells(column) {
    return this.rows().map(row => row.children.at(column));
  }

  deleteColumn(index) {
    [TableHeader, TableBody].forEach(blot => {
      const [tablePart] = this.descendants(blot);
      if (!isDefined(tablePart) || !isDefined(tablePart.children.head)) {
        return;
      }
      tablePart.children.forEach(row => {
        const cell = row.children.at(index);
        if (isDefined(cell)) {
          cell.remove();
        }
      });
    });
  }

  insertColumn(index) {
    [TableHeader, TableBody].forEach(blot => {
      const [tablePart] = this.descendants(blot);
      if (!isDefined(tablePart) || !isDefined(tablePart.children.head)) {
        return;
      }

      const CellBlot = blot === TableHeader ? TableHeaderCell : TableCell;
      tablePart.children.forEach(row => {
        const ref = row.children.at(index);
        const value = CellBlot.formats(row.children.head.domNode);
        const cell = this.scroll.create(CellBlot.blotName, value);
        row.insertBefore(cell, ref);
      });
    });
  }

  insertRow(index) {
    const [body] = this.descendants(TableBody);
    if (!isDefined(body) || !isDefined(body.children.head)) {
      return;
    }

    const id = tableId();
    const row = this.scroll.create(TableRow.blotName);
    body.children.head.children.forEach(() => {
      const cell = this.scroll.create(TableCell.blotName, id);
      row.appendChild(cell);
    });
    const ref = body.children.at(index);
    body.insertBefore(row, ref);
  }

  insertHeaderRow() {
    const [header] = this.descendants(TableHeader);
    const [body] = this.descendants(TableBody);

    if (
      isDefined(header) ||
      !isDefined(body) ||
      !isDefined(body.children.head)
    ) {
      return;
    }

    const id = tableId();
    const newHeader = this.scroll.create(TableHeader.blotName);
    const row = this.scroll.create(TableHeaderRow.blotName);
    const ref = this.children.at(0);
    newHeader.appendChild(row);
    body.children.head.children.forEach(() => {
      const cell = this.scroll.create(TableHeaderCell.blotName, id);
      row.appendChild(cell);
      cell.optimize();
    });
    this.insertBefore(newHeader, ref);
  }

  rows() {
    const body = this.children.head;
    return isDefined(body) ? body.children.map(row => row) : [];
  }
}
TableContainer.blotName = 'tableContainer';
TableContainer.tagName = 'TABLE';

TableContainer.allowedChildren = [TableHeader, TableBody];
TableBody.requiredContainer = TableContainer;
TableHeader.requiredContainer = TableContainer;

TableBody.allowedChildren = [TableRow];
TableRow.requiredContainer = TableBody;

TableRow.allowedChildren = [TableCell];
TableCell.requiredContainer = TableRow;

TableHeader.allowedChildren = [TableHeaderRow];
TableHeaderRow.requiredContainer = TableHeader;

TableHeaderRow.allowedChildren = [TableHeaderCell];
TableHeaderCell.requiredContainer = TableHeaderRow;

function tableId() {
  const id = Math.random()
    .toString(36)
    .slice(2, 6);
  return `row-${id}`;
}

export {
  TableCell,
  TableHeaderCell,
  TableRow,
  TableHeaderRow,
  TableBody,
  TableHeader,
  TableContainer,
  tableId,
  TABLE_TAGS,
};
