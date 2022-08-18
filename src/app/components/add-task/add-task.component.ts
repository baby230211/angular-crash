import { Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Task } from '../../Task';

import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit, OnDestroy {
  text: string = '';
  day: string = '';
  reminder: boolean = false;
  showAddTask: boolean = false;
  subscription: Subscription = new Subscription();
  @Output() onAddTask = new EventEmitter<Task>();

  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    this.subscription = this.uiService.onToggle().subscribe((showAddTask) => {
      this.showAddTask = showAddTask;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    if (!this.text) {
      alert('Please add a task!');
      return;
    }

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };

    this.onAddTask.emit(newTask);

    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}
