/**
 * 树形结构转列表形式，下面提供五种方法供参考
 *  方法一
 */
//树形结构
const data = [
    {
        id: 1,
        text: '节点1',
        parentId: 0,
        children: [
            {
                id: 2,
                text: '节点1_1',
                parentId: 1
            }
        ]
    }
]
//方法
function treeToList(data) {
    let res = [];
    const dfs = (tree) => {
        tree.forEach((item) => {
            if (item.children) {
                dfs(item.children);
                delete item.children;
            }
            res.push(item);
        });
    };
    dfs(data);
    return res;
}
console.log(treeToList(data));


/**
 * 树形结构转列表形式 
 * 方法二
 */
const dataTree = [
  {
    id: '1',
    name: '父节点1',
    children: [
      {
        id: '1-1',
        name: '子节点1-1',
        children: [
          {
            id: '1-1-1',
            name: '子节点1-1-1'
          },
          {
            id: '1-1-2',
            name: '子节点1-1-2'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: '父节点2',
    children: [
      {
        id: '2-1',
        name: '子节点2-1'
      }
    ]
  }
]
const result = dataTree.reduce(function (acc, cur) {
  acc.push({
    id: cur.id,
    name: cur.name,
    parentId: cur.parentId
  });
  cur.children && cur.children.forEach(child => {
    child.parentId = cur.id;
    arguments.callee(acc, child);
  })
  return acc;
}, []);
console.log(treeToList(result));


/**
 * 树形结构转列表形式 
 * 方法三
 */
const treeList = [
    {
        id: '1',
        name: '父节点1',
        children: [
            {
                id: '1-1',
                name: '子节点1-1',
                children: [
                    {
                        id: '1-1-1',
                        name: '子节点1-1-1'
                    },
                    {
                        id: '1-1-2',
                        name: '子节点1-1-2'
                    }
                ]
            }
        ]
    },
    {
        id: '2',
        name: '父节点2',
        children: [
            {
                id: '2-1',
                name: '子节点2-1'
            }
        ]
    }
]

function tree2list(treeList) {
    const list = []
    const traverse = (treeNode, callback) => {
        const queue = [treeNode]
        while (queue.length > 0) {
            let node = queue.shift()
            let newNode = {
                id: node.id,
                name: node.name
            }
            callback && callback(newNode)
            if (node.children) {
                queue.push(...node.children)
            }
        }
    }
    treeList.forEach(rootNode => {
        traverse(rootNode, (node) => {
            list.push(node)
        })
    })
    return list
}

const list = tree2list(treeList)
console.log('list', list)



/**
 * 树形结构转列表形式 
 * 方法四
 */
const trees = [
  {
    id: '1',
    name: '父节点1',
    children: [
      {
        id: '1-1',
        name: '子节点1-1',
        children: [
          {
            id: '1-1-1',
            name: '子节点1-1-1'
          },
          {
            id: '1-1-2',
            name: '子节点1-1-2'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: '父节点2',
    children: [
      {
        id: '2-1',
        name: '子节点2-1'
      }
    ]
  }
]

function treeToList_1(data) {
  let result = []
  data.forEach(item => {
    result.push(item)
    if (item.children) {
      result = result.concat(treeToList(item.children))
      delete item.children
    }
  })
  return result
}
console.log(treeToList_1(trees));

// 无副作用
function treeToList_2(data) {
  let result = []
  data.forEach(item => {
    let obj = {
      id: item.id,
      name: item.name
    }
    result.push(obj)
    if (item.children) {
      result = result.concat(treeToList_2(item.children))
    }
  })
  return result
}
console.log(treeToList_2(trees));



/**
 * 树形结构转列表形式 
 * 方法五
 */
function flattenTree(tree, result = []) {
        for (const node of tree) {
          const { children, ...rest } = node;
          console.log(rest);
          result.push(rest);
          if (children && children.length > 0) {
            flattenTree(children, result);
          }
        }
        return result;
      }

      const myTree = [
        {
          id: 1,
          text: "节点1",
          parentId: 0,
          children: [
            {
              id: 2,
              text: "节点1_1",
              parentId: 1,
            },
          ],
        },
      ];

      const flatData = flattenTree(myTree);
      console.log(flatData);