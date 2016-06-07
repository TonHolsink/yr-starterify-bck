import array from 'lodash/array';

// Find first ancestor of el with tagName
// or undefined if not found
function upTo(el, tagName) {
    tagName = tagName.toLowerCase();

    while (el && el.parentNode) {
        el = el.parentNode;
        if (el.tagName && el.tagName.toLowerCase() == tagName) {
            return el;
        }
    }

    // Many DOM methods return null if they don't
    // find the element they are searching for
    // It would be OK to omit the following and just
    // return undefined
    return null;
}

function hasClass(el, className) {
    return (" " + el.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1;
}

function removeClass(el, className) {
    let classes = el.className.split(" ");
    console.log('classes: ' + classes)
    classes = array.without(classes, className);
    console.log('classes2: ' + classes)
    return classes.join(' ');
}
function siblings(node, children) {
    siblingList = children.filter(function(val) {
        return [node].indexOf(val) != -1;
    });
    return siblingList;
}

