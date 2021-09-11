import { QuestionBase } from "./question-base.class";

export class DropdownQuestion extends QuestionBase<string>{
    controlType = 'dropdown';
}