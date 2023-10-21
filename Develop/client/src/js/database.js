import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const database = await openDB('jate', 1);
    const transaction = database.transaction('jate', 'readwrite');
    const objectStore = transaction.objectStore('jate');
    const putRequest = objectStore.put({ id: 1, value: content });
    
    const result = await putRequest;
    
    console.log('Data has been successfully saved to the database:', result.value);
  } catch (error) {
    console.error('Error saving data to the database:', error);
  }
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Retrieving data from the database...');

  try {
    const database = await openDB('jate', 1);
    const transaction = database.transaction('jate', 'readonly');
    const objectStore = transaction.objectStore('jate');
    const getRequest = objectStore.get(1);

    const result = await getRequest;

    if (result) {
      console.log('Data has been successfully retrieved from the database:', result.value);
      return result.value;
    } else {
      console.log('Data not found in the database');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving data from the database:', error);
    return null;
  }
}


initdb();
