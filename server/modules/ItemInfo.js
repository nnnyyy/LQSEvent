/**
 * Created by nnnyy on 2018-12-01.
 */
'use strict';



class ItemInfo {
    constructor() {
        this.itemsn = -1;
        this.name = '-';
        this.desc = '';
    }
}

class ItemInfoMan {
    constructor() {
        this.mItems = new Map();
        this.init();
    }

    init() {
        this.addItem('����ü', 'ä���� ����ü�� �̿��� �� �ִ�', 10001);
        this.addItem('��Ʈ �÷� ���', 'ä�� �÷��� �����Ѵ�', 10002);
        this.addItem('��Ʈ �÷� ����', 'ä�� �÷��� �����Ѵ�', 10003);
    }

    addItem( name , desc, itemsn ) {
        let newItem = new ItemInfo();
        newItem.itemsn = itemsn;
        newItem.name = name;
        newItem.desc = desc;
        this.mItems.push(itemsn, newItem);
    }
}