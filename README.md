# PAIDY MEMO APP
This is an implementation of the React Native task for Paidy, a To-Do list app.

I tried to keep the app as lightweight as possible, using *blank-typescript* expo template and minimal libraries to make the grading and reading of the code as easy as possible.

![preview](https://i.imgur.com/We2N9GT.gif "preview")

*Captured on a simulator, so no biometrics*

# Structure
Since I used the *blank-typescript* expo template the whole codebase isn't scattered too much, which would be a problem for such a small app.

![structure](https://i.imgur.com/MnlpU4R.png "structure")

# Libraries
Here are all the libraries I used:

- **expo-local-authentication** as specified by the task
- **@react-native-async-storage/async-storage** to keep info in the storage (more about this choice below).
- **react-native-reanimated** to allow smooth transition between auth and the main list, and animation for adding/deleting memos
- **react-native-safe-area-context** for avoiding unusable areas of the screen

# Potential hairy moments
- **Safety of data**
  
  I used async-storage to save the list between sessions. Conceptually, the app seems to be quite concerned with privacy, but async-storage is unecrypted.
  
- **Unit tests**
  
  Unit tests are my big weakness, I never worked with them in professional capacity, unfortunately. I would love to learn, though!
- **No global state**
  
  The assignment reads:
  >Clean and Robust state management
  
  I assume this would mean some implementation of global state: useContext, mobx, etc. My app was not complex enough for that kind of thing to be needed.
