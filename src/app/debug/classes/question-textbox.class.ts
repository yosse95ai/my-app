import { QuestionBase } from "./question-base.class";

export class TextboxQuestion extends QuestionBase<string>{
    controlType = 'textbox';
}