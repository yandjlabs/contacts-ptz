function generateId() {
    const idArray = Array.from({length: 4}, () => Math.floor(Math.random() * 10));
    const id = idArray.join('')
    return id;
}

export default generateId;