import { IComponent } from '../component';

export interface ITranslateComponent extends IComponent {
  translate: string;
  with?: string[];
}
