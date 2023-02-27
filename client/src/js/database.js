let db;

const initdb = async (dbName, storeName) => {
  const request = indexedDB.open(dbName);
  request.onupgradeneeded = () =>
    request.result.createObjectStore(storeName, {
      keyPath: "id",
      autoIncrement: true,
    });
  request.onsuccess = () => (db = request.result);
  request.onerror = () => console.error(`Error opening ${dbName} database`);
};

export const putDb = async (content, storeName) => {
  const tx = db
    .transaction(storeName, "readwrite")
    .objectStore(storeName)
    .add({ value: content });
  tx.onsuccess = () => console.log(":)data saved to the database:)");
  tx.onerror = (event) =>
    console.error(
      `    :(    Error saving data to the database:(      ) ${event.target.error}`
    );
};

export const getDb = async (storeName) => {
  const tx = db
    .transaction(storeName, "readonly")
    .objectStore(storeName)
    .getAll();
  tx.onsuccess = () => console.log(":)data read from database:)", tx.result);
  tx.onerror = (event) =>
    console.error(
      `:(Error reading data from the database:(   ) ${event.target.error}`
    );
  return tx.result;
};

initdb("mydatabase", "mystore");
