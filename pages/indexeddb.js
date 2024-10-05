const request = indexedDB.open("MyDatabase", 1);

request.onupgradeneeded = (event) => {
    const db = event.target.result;
    const objectStore = db.createObjectStore("MyObjectStore", { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("name", "name", { unique: false });
};

request.onsuccess = (event) => {
    console.log("Database opened successfully");
};

request.onerror = (event) => {
    console.error("Database error: ", event.target.errorCode);
};

function addData(name) {
    const db = request.result;
    const transaction = db.transaction(["MyObjectStore"], "readwrite");
    const objectStore = transaction.objectStore("MyObjectStore");
    const data = { name: name };
    const addRequest = objectStore.add(data);

    addRequest.onsuccess = () => {
        console.log("Data added successfully");
    };

    addRequest.onerror = (event) => {
        console.error("Add error: ", event.target.errorCode);
    };
}

function readData() {
    const db = request.result;
    const transaction = db.transaction(["MyObjectStore"], "readonly");
    const objectStore = transaction.objectStore("MyObjectStore");
    const getAllRequest = objectStore.getAll();

    getAllRequest.onsuccess = (event) => {
        console.log("Data retrieved: ", event.target.result);
    };

    getAllRequest.onerror = (event) => {
        console.error("Read error: ", event.target.errorCode);
    };
}

function updateData(id, newName) {
    const db = request.result;
    const transaction = db.transaction(["MyObjectStore"], "readwrite");
    const objectStore = transaction.objectStore("MyObjectStore");
    const getRequest = objectStore.get(id);

    getRequest.onsuccess = (event) => {
        const data = event.target.result;
        data.name = newName;
        const updateRequest = objectStore.put(data);

        updateRequest.onsuccess = () => {
            console.log("Data updated successfully");
        };

        updateRequest.onerror = (event) => {
            console.error("Update error: ", event.target.errorCode);
        };
    };

    getRequest.onerror = (event) => {
        console.error("Get error: ", event.target.errorCode);
    };
}

function deleteData(id) {
    const db = request.result;
    const transaction = db.transaction(["MyObjectStore"], "readwrite");
    const objectStore = transaction.objectStore("MyObjectStore");
    const deleteRequest = objectStore.delete(id);

    deleteRequest.onsuccess = () => {
        console.log("Data deleted successfully");
    };

    deleteRequest.onerror = (event) => {
        console.error("Delete error: ", event.target.errorCode);
    };
}
