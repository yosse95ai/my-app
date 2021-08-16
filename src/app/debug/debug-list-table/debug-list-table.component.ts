import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../classes/question-base.class';

@Component({
  selector: 'app-debug-list-table',
  templateUrl: './debug-list-table.component.html',
  styleUrls: ['./debug-list-table.component.scss']
})
export class DebugListTableComponent {
  @Input() question!: QuestionBase<string>;
  @Input() form!: FormGroup;

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }

}
