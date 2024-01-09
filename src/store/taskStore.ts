import { makeAutoObservable } from 'mobx';
import { TaskStoreModel } from '../types/task.types';

export class TaskStore implements TaskStoreModel {
  input: string = '';
  tasks: string[] = [];
  checkedTasks: number[] = [];
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor() {
    makeAutoObservable(this);
  }

  setInput(value: string): void {
    this.input = value;
  }

  setTasks(newTasks: string[]): void {
    this.tasks = newTasks;
  }

  setCheckedTasks(newCheckedTasks: number[]): void {
    this.checkedTasks = newCheckedTasks;
  }

  setSortOrder(order: 'asc' | 'desc'): void {
    this.sortOrder = order;
  }

  addTask(): void {
    if (this.input.trim() !== '') {
      this.tasks = [...this.tasks, this.input];
      this.input = '';
    }
  }

  allClear(): void {
    if (window.confirm('Вы действительно хотите очистить все?')) {
      this.tasks = [];
      this.checkedTasks = [];
    }
  }

  onDelete(index: number): void {
    if (window.confirm('Вы действительно хотите удалить задачу?')) {
      this.tasks = this.tasks.filter((_, i) => i !== index);
      this.checkedTasks = this.checkedTasks.filter((taskIndex) => taskIndex !== index);
    }
  }

  onDeleteSelected(): void {
    if (window.confirm('Вы действительно хотите удалить выбранные задачи?')) {
      this.tasks = this.tasks.filter((_, index) => !this.checkedTasks.includes(index));
      this.checkedTasks = [];
    }
  }

  onChecked(index: number): void {
    const isChecked = this.checkedTasks.includes(index)
      ? this.checkedTasks.filter((taskIndex) => taskIndex !== index)
      : [...this.checkedTasks, index];

    this.checkedTasks = isChecked;
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }
}

const taskStore = new TaskStore();
export default taskStore;
