
/**
 * 列表转成树形结构，下面提供七种方法供参考
 * 方法一
 */
let arr = [
    { id: 1, name: '部门1', pid: 0 },
    { id: 2, name: '部门2', pid: 1 },
    { id: 3, name: '部门3', pid: 1 },
    { id: 4, name: '部门4', pid: 3 },
    { id: 5, name: '部门5', pid: 4 },
    { id: 6, name: '部门6', pid: 0 },
]

function list2tree(arr) {
    let map = {}
    let newArr = []
    //先根据pid排个序,,这是个树形结构,pid越小说明越上层,
    arr.sort((a,b)=>a.pid-b.pid)
    for(let obj of arr){
        map[obj.id] = obj 
        if(obj.pid === 0){
            newArr.push(obj)
        }else{
            if(map[obj.pid].children){
                map[obj.pid].children.push(obj)
            }else{
                map[obj.pid].children = [obj]
            }
            
        }
    }
    return newArr
}
list2tree(arr)



/**
 * 列表转成树形结构
 * 方法二
 */
const data2 = [
  { id: '1', name: '父节点1', parentId: undefined },
  { id: '1-1', name: '子节点1-1', parentId: '1' },
  { id: '1-1-1', name: '子节点1-1-1', parentId: '1-1' },
  { id: '1-1-2', name: '子节点1-1-2', parentId: '1-1' },
  { id: '2', name: '父节点2', parentId: undefined },
  { id: '2-1', name: '子节点2-1', parentId: '2' }
];
function deepClone(value) {
  if (typeof value === 'object' && value !== null) {
    const result = Array.isArray(value) ? [] : {};
    for (const key in value) {
      result[key] = deepClone(value[key])
    }
    return result
  }
  return value
}
const result = deepClone(data2).reduce(function (acc, cur, idx, arr) {
  // 检索当前元素的子元素; tips: 此时操作cur会改变arr本身
  cur.cildren = arr.filter(item => item.parentId === cur.id);
  // 判断是否为根元素
  return arr.filter(item => !item.parentId)
}, []);
console.log(result);



/**
 * 列表转成树形结构
 * 方法三
 */
let list = [
  { id: 1, name: '部门1', pid: undefined }, // 如果没有父元素则为undefined
  { id: 4, name: '部门4', pid: 3 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 5, name: '部门5', pid: 4 },
  { id: 6, name: '部门6', pid: undefined },
  { id: 3, name: '部门3', pid: 1 },
  { id: 7, name: '部门7', pid: 2 },
];

function list3tree(arr) {
  return arr.reduce((pre, { id, name, pid }) => {
    const children = pre.get(id) ?? [];
    const parent = pre.get(pid) ?? [];
    parent.push({ id, name, children });
    return pre.set(id, children).set(pid, parent);
  }, new Map()).get(undefined);
}
console.log(list3tree(list));



/**
 * 列表转成树形结构
 * 方法四
 */
let arr4 = [
  { id: '1', name: '父节点1', pid: undefined },
  { id: '1-1', name: '子节点1-1', pid: '1' },
  { id: '1-1-1', name: '子节点1-1-1', pid: '1-1' },
  { id: '1-1-2', name: '子节点1-1-2', pid: '1-1' },
  { id: '2', name: '父节点2', pid: undefined },
  { id: '2-1', name: '子节点2-1', pid: '2' }
];

function listToTree(arr) {
  const res = [], map = new Map();
  // 创建hashMap，用pid当做键值
  for (let i of arr) {
    if (map.get(i.pid)) {
      map.get(i.pid).push(i)
    } else {
      map.set(i.pid, [i])
    }
  }
  arr.forEach(item => {
    if (map.get(item.id)) {
      item.children = map.get(item.id)
    }
    // 不是根节点就不用往里插了
    if (!item.pid) {
      res.push(item)
    }
  })
  return res
}
console.log(listToTree(arr4));

//解法2：
function listToTree2(list) {
  const result = []
  list.forEach(node => {
    if (!node.pid) {
      result.push(node)
    } else {
      const parent = list.find(item => item.id === node.pid)
      if (list.find(item => item.id === node.pid)) {
        if (parent.children) {
          parent.children.push(node)
        } else {
          parent.children = [node]
        }
      }
    }
  })
  return result
}
console.log(listToTree2(arr4));


/***
 * 列表转成树形结构
 * 方法五
 */
let arr5 = [
        { id: 1, name: '部门1', pid: 0 },
        { id: 2, name: '部门2', pid: 1 },
        { id: 3, name: '部门3', pid: 1 },
        { id: 4, name: '部门4', pid: 3 },
        { id: 5, name: '部门5', pid: 4 },
        { id: 6, name: '部门6', pid: 0 },
    ]
    function ListTree(arr) {
        let root = null;
        const map = new Map();
        arr.forEach((item) => {
            item.children = [];
            map.set(item.id, item);
        })
        arr.forEach((item) => {
            const p = map.get(item.pid);
            if (!p) root = item;
            p?.children.push(item);
        })
        return root;
    }

    const treeNode = ListTree(arr5)
console.log('treeNode', treeNode)
    

/**
 * O(n)复杂度实现
 * 方法六
 */
function transform(arr) {
    arr.sort((a, b) => a.id - b.id); // 对原数组id值进行升序排序
    const result = [];
    let hashMap = new Map();
    for (let i = 0; i < arr.length; i++) {
        let id = arr[i].pid;
        if(!hashMap.has(id)) result.push(arr[i]);
        else {
            let obj = hashMap.get(id);
            if(!obj.children) obj.children = []; // 动态添加children元素，也可以用# Object.defineProperty()
            obj.children.push(arr[i]);
        }
        hashMap.set(arr[i].id, arr[i]);
    }
    return result;
}
console.log(transform(arr5));



/**
 * O(n)复杂度实现
 * 方法七
 */
function listToTree7(list) {
  const map = {};
  const roots = [];
  for (const item of list) {
    const id = item.id;
    const parent_id = item.parent_id;
    map[id] = { ...item, children: [] };
    if (parent_id === null) {
      roots.push(map[id]);
    } else {
      map[parent_id].children.push(map[id]);
    }
  }
  return roots;
}
console.log(listToTree7(arr5));