import { getDatabase, connectDatabaseEmulator, ref, push, onValue, set } from 'firebase/database';

const db = getDatabase();
if (location.hostname === 'localhost') {
  // Point to the RTDB emulator running on localhost.
  connectDatabaseEmulator(db, 'localhost', 9000);
}

set(ref(db), null);

function writeUserData(userId, filmID) {
  push(ref(db, `users/${userId}/watched`), filmID);
}

const starCountRef = ref(db, `users/345/watched`);
onValue(starCountRef, snapshot => {
  const data = snapshot.val();
  console.log(data);
});

writeUserData('123', '123123');

writeUserData('123', '234234');

writeUserData('345', '567567');

console.log(onValue());
