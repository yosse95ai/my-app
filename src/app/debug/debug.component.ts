import { Component} from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionBase } from './classes/question-base.class';
import { QuestionService } from './question.service';


@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss']
})
export class DebugComponent{
  questions$: Observable<QuestionBase<any>[]>;

  constructor(private service: QuestionService) {
    this.questions$ = service.getQuestions();
  }
}
