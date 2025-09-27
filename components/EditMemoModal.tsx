import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TextInput,
} from 'react-native';

type TTEditMemoModal = {
  isEditModalShown: boolean;
  onClose: () => void;
  onSave: () => void;
  memoEditText: string;
  setMemoEditText: (newText: string) => void;
};

// Very simple components that has styles for the edit modal.
// Logic is back in MemoList
export const EditMemoModal = ({
  isEditModalShown,
  onClose,
  onSave,
  memoEditText,
  setMemoEditText,
}: TTEditMemoModal) => {
  return (
    <Modal
      transparent
      animationType="fade"
      statusBarTranslucent
      navigationBarTranslucent
      visible={isEditModalShown}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.modalOuter}
      >
        <View style={styles.modalInner}>
          <View style={styles.modalHorizontal}>
            <Text style={styles.modalTitle}>Edit memo</Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.modalCloseTouchable}
            >
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            onChangeText={(newText) => setMemoEditText(newText)}
            autoFocus
            style={styles.modalInput}
            value={memoEditText}
          />
          <TouchableOpacity
            style={[styles.modalSaveButton, !memoEditText && { opacity: 0.5 }]}
            disabled={!memoEditText}
            onPress={onSave}
          >
            <Text style={styles.modalButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOuter: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInner: {
    backgroundColor: 'mintcream',
    alignSelf: 'stretch',
    marginHorizontal: 20,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  modalTitle: {
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: '200',
  },
  modalCloseTouchable: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseText: { fontSize: 20 },
  modalInput: {
    fontSize: 20,
    alignSelf: 'stretch',
    height: 60,
    borderWidth: 1,
    borderColor: '#0b0a0f',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontWeight: '200',
  },
  modalHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 25,
  },
  modalSaveButton: {
    backgroundColor: 'seagreen',
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    width: 180,
    borderRadius: 10,
    marginTop: 25,
    marginBottom: 15,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: '200',
  },
});
