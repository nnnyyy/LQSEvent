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
        this.addItem('볼드체', '채팅을 볼드체로 이용할 수 있다', 10001);
        this.addItem('폰트 컬러 블루', '채팅 컬러를 변경한다', 10002);
        this.addItem('폰트 컬러 레드', '채팅 컬러를 변경한다', 10003);
    }

    addItem( name , desc, itemsn ) {
        let newItem = new ItemInfo();
        newItem.itemsn = itemsn;
        newItem.name = name;
        newItem.desc = desc;
        this.mItems.push(itemsn, newItem);
    }
}