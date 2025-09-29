import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
import { dummyMemos, MemoList } from '../components/MemoList';

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

describe('Memos', () => {
  test('dummy data loads onto the list', async () => {
    const { getByTestId, findByText } = render(<MemoList />);
    getByTestId('memoFlatList');

    findByText(dummyMemos[0].text);
  });

  test('adding a memo works', async () => {
    const { getByTestId, getByText } = render(<MemoList />);

    const addButton = getByTestId('addButton');
    await act(async () => {
      fireEvent.press(addButton);
    });

    const textInput = getByTestId('memoTextInput');
    await act(async () => {
      fireEvent.changeText(textInput, 'testing saving memos');
    });

    const saveButton = getByTestId('memoEditSave');
    await act(async () => {
      fireEvent.press(saveButton);
    });

    getByText('testing saving memos');
  });

  test('deleting a memo works', async () => {
    const { findAllByTestId, queryByText } = render(<MemoList />);

    waitFor(() => {
      expect(queryByText(dummyMemos[0].text).length).toBe(1);
    });

    const memoDels = await findAllByTestId('memoDel');
    await act(async () => {
      fireEvent.press(memoDels[0]);
    });

    waitFor(() => {
      expect(queryByText(dummyMemos[0].text).length).toBe(0);
    });
  });
});
