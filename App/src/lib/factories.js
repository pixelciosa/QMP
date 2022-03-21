
class categoryObject{
    constructor({
        title = requiredParam('title'),
        subcategories = [],
        graphic = ''
    }) {
        this.title = title;
        this.subcategories = subcategories;
        this.graphic = graphic;
    };
}


function categoriesFactory(arr) {
    let categoriesObj = {
        top: {},
        bottom : {},
        feet : {},
        fullBody : {},
        accessories : {}
    };
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].title === 'top') {
            categoriesObj['top'] = new categoryObject(arr[i]);
            // categoriesObj.top.subcategories.push(arr[i].subcategories);
            // categoriesObj.top.graphic = (arr[i].graphic);
        };
        if (arr[i].title === 'bottom') {
            categoriesObj['bottom'] = new categoryObject(arr[i]);
            // categoriesObj.bottom.subcategories = arr[i].subcategories;
            // categoriesObj.bottom.graphic = (arr[i].graphic);
        };
        if (arr[i].title === 'feet') {
            categoriesObj['feet'] = new categoryObject(arr[i]);
            // categoriesObj.feet.subcategories = arr[i].subcategories;
            // categoriesObj.feet.graphic = (arr[i].graphic);
        };
        if (arr[i].title === 'fullBody') {
            categoriesObj['fullBody'] = new categoryObject(arr[i]);
            // categoriesObj.fullBody.subcategories = arr[i].subcategories;
            // categoriesObj.fullBody.graphic = (arr[i].graphic);
        };
        if (arr[i].title === 'accessories') {
            categoriesObj['accessories'] = new categoryObject(arr[i]);
            // categoriesObj.accessories.subcategories = arr[i].subcategories;
            // categoriesObj.accessories.graphic = (arr[i].graphic);
        }
        return categoriesObj
    }
}


class propObject {
    constructor({
        title = requiredParam('title'),
        category = requiredParam('category'),
        subcategory = '',
        fabrics = [],
        colors = [],
        tags = [],
        dateAdded = dateAdded,
        imgUrl = '',
    }) {
        this.title = title;
        this.category = category;
        this.subcategory = subcategory;
        this.fabrics = fabrics;
        this.colors = colors;
        this.tags = tags;
        this.dateAdded = dateAdded;
        this.imgUrl = imgUrl;
    }
}

class topObject extends propObject {
    constructor(args) {
        super(args);
    }
}

class bottomObject extends propObject {
    constructor(args) {
        super(args);
    }
}

class feetObject extends propObject {
    constructor(args) {
        super(args);
    }
}

class fullBodyObject extends propObject {
    constructor(args) {
        super(args);
    }
}

class accessoryObject extends propObject {
    constructor(args) {
        super(args);
    }
}

function propsFactory(arr) {
    console.log(arr);
    let propsObj = {
        'top': [],
        'bottom': [],
        'feet': [],
        'fullBody': [],
        'accessories': []
    };
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i].title);
        if (arr[i].category === 'top') {
            let obj = new topObject(arr[i]);
            propsObj['top'].push(obj);
        };
        if (arr[i].category === 'bottom') {
            let obj = new bottomObject(arr[i]);
            propsObj['bottom'].push(obj);
        };
        if (arr[i].category === 'feet') {
            let obj = new feetObject(arr[i]);
            propsObj['feet'].push(obj);
        };
        if (arr[i].category === 'fullBody') {
            let obj = new fullBodyObject(arr[i]);
            propsObj['fullBody'].push(obj);
        };
        if (arr[i].category === 'accessories') {
            let obj = new accessoryObject(arr[i]);
            propsObj['accesories'].push(obj);
        }
    }
    console.log('propsObj', propsObj);
    return propsObj;
}

export { propsFactory, categoriesFactory };