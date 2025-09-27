import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlashList, FlashListRef } from '@shopify/flash-list';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Alert,
  LayoutAnimation,
  TouchableWithoutFeedback,
} from 'react-native';
import { EditMemoModal } from './EditMemoModal';
import { Header } from './Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { SlideInRight } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

type TMemo = {
  done: boolean; // whether there will be a check sign on the memo
  text: string; // text of the memo
  date: Date; // date of creation - used as a key
};

// some dummy data for a good first impression
const dummyMemos: TMemo[] = [
  { done: false, date: new Date('01-01-2025'), text: 'Feed the dog' },
  { done: true, date: new Date('02-01-2025'), text: 'Play videogames' },
  { done: true, date: new Date('06-01-2025'), text: 'Go to a gallery' },
  { done: true, date: new Date('07-01-2025'), text: 'Buy a piano' },
  { done: true, date: new Date('08-01-2025'), text: 'Play on a piano' },
  { done: false, date: new Date('09-01-2025'), text: 'Sell the piano' },
];

// Main component for the list - creating, editing, showing the memos.
export const MemoList = () => {
  const insets = useSafeAreaInsets();
  // list Ref - used for pretty deletion animation
  const list = useRef<FlashListRef<TMemo> | null>(null);

  // local copy of the memo list
  const [memos, setMemos] = useState<TMemo[]>([]);

  const [isEditModalShown, setIsEditModalShown] = useState(false);
  // Index of specific memo we're changing in the edit modal. Otherwise null.
  const [memoBeingEdited, setMemoBeingEdited] = useState<number | null>(null);
  // value of the textInput in the edit modal
  const [memoEditText, setMemoEditText] = useState('');

  // initial loading - we get memos from storage and save them in our local copy
  useEffect(() => {
    const fetchMemosData = async () => {
      try {
        const value = await AsyncStorage.getItem('paidyMemos');
        if (value !== null) {
          setMemos(JSON.parse(value) || []);
        } else {
          // if local storage was never used - we're using the dummy data
          await AsyncStorage.setItem('paidyMemos', JSON.stringify(dummyMemos));
          setMemos([...dummyMemos]);
        }
      } catch (err: any) {
        Alert.alert('Something went wrong!', err?.message);
      }
    };
    fetchMemosData();
  }, []);

  // saving any changes to memos
  // This function gets a new version of the list and saves it both to local state and async storage
  const setNewMemosAndSave = useCallback(async (newMemos: TMemo[]) => {
    setMemos(newMemos);
    try {
      await AsyncStorage.setItem('paidyMemos', JSON.stringify(newMemos));
    } catch (err: any) {
      Alert.alert('Something went wrong!', err?.message);
    }
  }, []);

  // removes an items - used in a way suggested by FlashList so that there would be a pretty animation
  const removeItem = (memo: TMemo) => {
    setNewMemosAndSave(
      memos.filter((dataItem) => {
        return dataItem !== memo;
      }),
    );
    // animation logic
    list.current?.prepareForLayoutAnimationRender();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  // creates a new memo or edits an old one
  // called when "save" button in the modal is pressed
  // memoBeingEdited - index of what we're currently editing (null if new memo)
  // memoEditText - value of the textInput in the modal
  const onSaveEdit = () => {
    // if it's an old memo that we are editing
    if (memoBeingEdited !== null && memoEditText) {
      const newMemos = [...memos];
      // make a new copy of memos and change the one memo we care about
      newMemos[memoBeingEdited] = {
        ...newMemos[memoBeingEdited],
        text: memoEditText,
      };
      setNewMemosAndSave(newMemos);
    } else if (memoEditText) {
      // if it's new - add to the end of the list
      const newMemos: TMemo[] = [
        ...memos,
        { done: false, date: new Date(), text: memoEditText },
      ];
      setNewMemosAndSave(newMemos);
    }
    setMemoBeingEdited(null);
    setMemoEditText('');
    setIsEditModalShown(false);
  };

  // Adds or removes the little tick next to the memo.
  const onCheck = (index: number) => {
    const newMemos = [...memos];
    newMemos[index] = { ...newMemos[index], done: !newMemos[index].done };
    setNewMemosAndSave(newMemos);
  };

  return (
    <Animated.View
      entering={SlideInRight.duration(300)}
      style={styles.container}
    >
      <StatusBar style={isEditModalShown ? 'light' : 'dark'} />
      <Header onButton={() => setIsEditModalShown(true)} />
      <FlashList
        ref={list}
        keyExtractor={(item) => {
          return item.date.toString();
        }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.memoContainer}
              onPress={() => {
                setMemoBeingEdited(index);
                setMemoEditText(item?.text);
                setIsEditModalShown(true);
              }}
            >
              <TouchableWithoutFeedback onPress={() => onCheck(index)}>
                <View style={styles.memoDoneTouchable}>
                  {item?.done && <Text style={styles.memoDoneText}>✔</Text>}
                </View>
              </TouchableWithoutFeedback>
              <Text numberOfLines={1} style={styles.memoText}>
                {item?.text}
              </Text>
              <TouchableOpacity
                onPress={() => removeItem(item)}
                style={styles.memoDelTouchable}
              >
                <Text style={styles.memoDelText}>❌</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 10 || 20 }}
        data={memos}
      />
      <EditMemoModal
        isEditModalShown={isEditModalShown}
        onClose={() => {
          setMemoBeingEdited(null);
          setMemoEditText('');
          setIsEditModalShown(false);
        }}
        onSave={onSaveEdit}
        memoEditText={memoEditText}
        setMemoEditText={setMemoEditText}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  memoContainer: {
    alignSelf: 'stretch',
    marginHorizontal: 30,
    backgroundColor: 'mintcream',
    borderRadius: 10,
    height: 70,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  memoDoneTouchable: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  memoDoneText: {
    fontSize: 14,
  },
  memoText: {
    flex: 1,
    marginVertical: 10,
    fontSize: 18,
    fontWeight: '200',
  },
  memoDelTouchable: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  memoDelText: {
    fontSize: 14,
  },
});
