export default function strToArr(str, unique = true) {
    let arr = str.replaceAll(', ', ',').split(',');
    if (unique) {
        arr = [...new Set(arr)];
    }
    return arr;
}