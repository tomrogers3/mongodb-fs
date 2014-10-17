// Obtain nested document property
function nestedProp(x, path) {
  if (path && path.length > 0 && x) {
    return nestedProp(x[path[0]], path.slice(1));
  } else {
    return x;
  }
}

// Used for ordering results based on orderby clause, using natural order
function order(orderby, level, keys, a, b) {
  if (level < keys.length) {
    var path = keys[level].split("."); // supports ordering on nested properties
    var valA = nestedProp(a, path);
    var valB = nestedProp(b, path);
    var result = 0;
    if (!valA && !valB) {
      result = 0; // handle empty
    } else if (!valA && valB) {
      result = -1; // handle empty
    } else if (valA && !valB) {
      result = 1; // handle empty
    } else {
      result = ((valA < valB) ? -1 : ((valA > valB) ? 1 : 0)); // compare
    }
    result = orderby[keys[level]] * result;
    if (result !== 0) {
      return result;
    } else {
      return order(orderby, level + 1, keys, a, b);
    }
  } else {
    return 0;
  }
}

module.exports = {
  orderBy: function(docs, orderby) {
    var keys = Object.keys(orderby);
    docs.sort(function(a, b) {
      return order(orderby, 0, keys, a, b);
    });
    return docs;    
  }
}