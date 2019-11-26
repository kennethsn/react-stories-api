export function classList(...classes) {
  return classes
    .filter(item => !!item)
    .join(' ');
}

export function chunk(array, chunkSize, callback){
  for (let i=0,j=array.length; i<j; i+=chunkSize) {
      callback(array.slice(i,i+chunkSize));
  }
}
