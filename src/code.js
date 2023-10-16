function search(x,arr){
    for(var i =0 ; i<=arr.length;i++){
        if(arr[i] === x){
            return 1
        }else{
            return -1
        }
    }
    
}

search(67,[23,44,56,67,88,99])



binarySearch(67,[56,77,55,37,67,99,0,26])
function binarySearch(arr, element) {
    let l = 0;
    let r = arr.length - 1;
  
    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
  
      if (arr[mid] === element) {
        return mid
      } else if (arr[mid] < element) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  
    return -1
  }
  
 
  
  