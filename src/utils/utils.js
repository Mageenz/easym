// github都放弃jquery了，所以http://youmightnotneedjquery.com/

// 获取兄弟节点
function siblings(el) {
  let siblings = []
  siblings = Array.prototype.filter.call(el.parentNode.children, function(child){
    return child !== el;
  });

  return siblings;
}

// addClass
function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += ' ' + className;
  }
}

// removeClass
function removeClass(el, className) {
  el.forEach(el => {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  })
}

// selector
function selector(selector) {
  return document.querySelectorAll(selector);
}

export default {
  siblings,
  addClass,
  removeClass,
  selector
}