export type TaskStoreModel = {
  input: string;
  tasks: string[];
  checkedTasks: number[];
  sortOrder: 'asc' | 'desc';

  setInput: (value: string) => void;
  setTasks: (newTasks: string[]) => void;
  setCheckedTasks: (newCheckedTasks: number[]) => void;
  setSortOrder: (order: 'asc' | 'desc') => void;

  addTask: () => void;
  allClear: () => void;
  onDelete: (index: number) => void;
  onDeleteSelected: () => void;
  onChecked: (index: number) => void;
  toggleSortOrder: () => void;
};
