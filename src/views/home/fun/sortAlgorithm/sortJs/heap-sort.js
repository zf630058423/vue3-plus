/**
 *
 * 堆排序
 *
 */
//nums为要排序的数组
function heapify(heap, i, len) {
  let max = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  if (left < len && heap[left] > heap[max]) {
    max = left;
  }
  if (right < len && heap[right] > heap[max]) {
    max = right;
  }
  if (max !== i) {
    [heap[i], heap[max]] = [heap[max], heap[i]];
    heapify(heap, max, len);
  }
}

let nums = [3, 56, 43, 2, 5, 12, 76, 87, 15, 43];
//第一步 建立最大堆（升序）从最后一个非叶子节点开始
for (let i = Math.floor(nums.length / 2) - 1; i >= 0; i--) {
  heapify(nums, i, nums.length);
}
//第二步 排序
for (let i = nums.length - 1; i >= 0; i--) {
  [nums[0], nums[i]] = [nums[i], nums[0]];
  heapify(nums, 0, i);
}
